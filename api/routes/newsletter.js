import express from 'express';
import { subscribeToNewsletter, unsubscribeFromNewsletter, getSubscriberInfo } from '../utils/newsletterService.js';
import { sendEmail } from '../utils/emailService.js';
import { optionalRecaptchaMiddleware } from '../utils/recaptchaService.js';

const router = express.Router();

// Validation middleware for newsletter subscription
const validateSubscriptionData = (req, res, next) => {
  const { email, firstName, lastName } = req.body;

  // Email is required
  if (!email) {
    return res.status(400).json({
      error: 'Email required',
      message: 'Please provide an email address'
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email',
      message: 'Please provide a valid email address'
    });
  }

  // Validate names if provided
  if (firstName && firstName.length < 2) {
    return res.status(400).json({
      error: 'Invalid first name',
      message: 'First name must be at least 2 characters long'
    });
  }

  if (lastName && lastName.length < 2) {
    return res.status(400).json({
      error: 'Invalid last name',
      message: 'Last name must be at least 2 characters long'
    });
  }

  next();
};

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', optionalRecaptchaMiddleware, validateSubscriptionData, async (req, res) => {
  try {
    const { email, firstName, lastName, source } = req.body;
    
    const subscriberData = {
      email: email.toLowerCase().trim(),
      firstName: firstName?.trim() || '',
      lastName: lastName?.trim() || '',
      source: source || 'website',
      subscribedAt: new Date().toISOString()
    };

    console.log('Processing newsletter subscription:', {
      email: subscriberData.email,
      name: `${subscriberData.firstName} ${subscriberData.lastName}`.trim(),
      source: subscriberData.source
    });

    // Subscribe to newsletter service (Mailchimp)
    const subscriptionResult = await subscribeToNewsletter(subscriberData);

    if (!subscriptionResult.success) {
      // Handle specific errors
      if (subscriptionResult.error === 'already_subscribed') {
        return res.status(409).json({
          error: 'Already subscribed',
          message: subscriptionResult.message,
          suggestion: 'Check your email for our latest newsletters, or contact us if you\'re not receiving them.'
        });
      }

      if (subscriptionResult.error === 'invalid_email') {
        return res.status(400).json({
          error: 'Invalid email',
          message: subscriptionResult.message
        });
      }

      throw new Error(subscriptionResult.message);
    }

    // Send welcome email
    const welcomeEmailResult = await sendEmail(
      subscriberData.email,
      'newsletterWelcome',
      subscriberData
    );

    if (welcomeEmailResult.success) {
      console.log('Welcome email sent to new subscriber');
    } else {
      console.error('Failed to send welcome email:', welcomeEmailResult.error);
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        email: subscriberData.email,
        status: 'subscribed',
        welcomeEmailSent: welcomeEmailResult.success,
        benefits: [
          'Weekly wellness tips and inspiration',
          'Exclusive offers and discounts',
          'Early access to new treatments',
          'Priority booking for events'
        ]
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      error: 'Subscription failed',
      message: 'Unable to complete your newsletter subscription. Please try again later.'
    });
  }
});

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email required',
        message: 'Please provide an email address to unsubscribe'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address'
      });
    }

    console.log('Processing newsletter unsubscription:', email);

    const unsubscribeResult = await unsubscribeFromNewsletter(email.toLowerCase().trim());

    if (!unsubscribeResult.success) {
      if (unsubscribeResult.error === 'not_found') {
        return res.status(404).json({
          error: 'Email not found',
          message: unsubscribeResult.message,
          suggestion: 'The email address may not be subscribed to our newsletter.'
        });
      }

      throw new Error(unsubscribeResult.message);
    }

    res.json({
      success: true,
      message: 'Successfully unsubscribed from our newsletter',
      data: {
        email: email.toLowerCase().trim(),
        status: 'unsubscribed',
        note: 'We\'re sorry to see you go! You can always resubscribe if you change your mind.'
      }
    });

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({
      error: 'Unsubscription failed',
      message: 'Unable to process your unsubscription request. Please contact us directly.'
    });
  }
});

// GET /api/newsletter/status/:email - Check subscription status
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        error: 'Email required',
        message: 'Please provide an email address'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address'
      });
    }

    const subscriberInfo = await getSubscriberInfo(email.toLowerCase().trim());

    if (!subscriberInfo.success) {
      if (subscriberInfo.error === 'not_found') {
        return res.json({
          success: true,
          subscribed: false,
          message: 'Email address is not subscribed to our newsletter'
        });
      }

      throw new Error(subscriberInfo.message);
    }

    res.json({
      success: true,
      subscribed: true,
      data: {
        email: subscriberInfo.subscriber.email,
        status: subscriberInfo.subscriber.status,
        firstName: subscriberInfo.subscriber.firstName,
        lastName: subscriberInfo.subscriber.lastName,
        subscribeDate: subscriberInfo.subscriber.subscribeDate,
        tags: subscriberInfo.subscriber.tags
      }
    });

  } catch (error) {
    console.error('Newsletter status check error:', error);
    res.status(500).json({
      error: 'Status check failed',
      message: 'Unable to check subscription status'
    });
  }
});

// GET /api/newsletter/preferences - Get newsletter preferences and options
router.get('/preferences', (req, res) => {
  const preferences = {
    frequency: [
      { value: 'weekly', label: 'Weekly', description: 'Receive our newsletter every week with the latest wellness tips' },
      { value: 'bi-weekly', label: 'Bi-weekly', description: 'Receive our newsletter every two weeks' },
      { value: 'monthly', label: 'Monthly', description: 'Receive our newsletter once a month with curated content' }
    ],
    content: [
      { value: 'wellness-tips', label: 'Wellness Tips', description: 'Self-care and wellness advice from our experts' },
      { value: 'new-services', label: 'New Services', description: 'Be the first to know about our latest treatments' },
      { value: 'special-offers', label: 'Special Offers', description: 'Exclusive discounts and promotional offers' },
      { value: 'events', label: 'Events & Workshops', description: 'Information about spa events and wellness workshops' },
      { value: 'seasonal', label: 'Seasonal Content', description: 'Seasonal wellness tips and treatment recommendations' }
    ],
    benefits: [
      'Exclusive member-only discounts up to 20%',
      'Early access to new treatment bookings',
      'Free wellness consultations',
      'Birthday month special offers',
      'Priority customer support',
      'Invitation to exclusive spa events'
    ]
  };

  res.json({
    success: true,
    data: preferences
  });
});

// POST /api/newsletter/feedback - Submit newsletter feedback
router.post('/feedback', async (req, res) => {
  try {
    const { email, rating, feedback, suggestions } = req.body;

    if (!email || !rating) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide email and rating'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Invalid rating',
        message: 'Rating must be between 1 and 5'
      });
    }

    const feedbackData = {
      email: email.toLowerCase().trim(),
      rating: parseInt(rating),
      feedback: feedback || '',
      suggestions: suggestions || '',
      submittedAt: new Date().toISOString()
    };

    console.log('Newsletter feedback received:', {
      email: feedbackData.email,
      rating: feedbackData.rating,
      hasFeedback: !!feedback,
      hasSuggestions: !!suggestions
    });

    // In a real application, you would save this feedback to a database
    // For now, we'll just log it and return success

    res.json({
      success: true,
      message: 'Thank you for your feedback!',
      data: {
        rating: feedbackData.rating,
        message: 'Your feedback helps us improve our newsletter content and frequency.'
      }
    });

  } catch (error) {
    console.error('Newsletter feedback error:', error);
    res.status(500).json({
      error: 'Feedback submission failed',
      message: 'Unable to submit your feedback. Please try again later.'
    });
  }
});

export default router; 