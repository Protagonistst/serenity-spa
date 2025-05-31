import express from 'express';
import { sendEmail, sendAdminNotification } from '../utils/emailService.js';
import { optionalRecaptchaMiddleware } from '../utils/recaptchaService.js';

const router = express.Router();

// Validation middleware for contact form data
const validateContactData = (req, res, next) => {
  const { firstName, lastName, email, subject, message } = req.body;

  // Check required fields
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Please fill in all required fields'
    });
  }

  // Validate name lengths
  if (firstName.trim().length < 2) {
    return res.status(400).json({
      error: 'Invalid first name',
      message: 'First name must be at least 2 characters long'
    });
  }

  if (lastName.trim().length < 2) {
    return res.status(400).json({
      error: 'Invalid last name',
      message: 'Last name must be at least 2 characters long'
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

  // Validate message length
  if (message.trim().length < 10) {
    return res.status(400).json({
      error: 'Message too short',
      message: 'Please provide a message with at least 10 characters'
    });
  }

  if (message.trim().length > 2000) {
    return res.status(400).json({
      error: 'Message too long',
      message: 'Message must be less than 2000 characters'
    });
  }

  next();
};

// POST /api/contact - Submit contact form
router.post('/', optionalRecaptchaMiddleware, validateContactData, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    
    const contactData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      ipAddress: req.ip
    };

    console.log('Processing contact form submission:', {
      name: `${contactData.firstName} ${contactData.lastName}`,
      email: contactData.email,
      subject: contactData.subject,
      hasPhone: !!contactData.phone
    });

    // Send auto-reply email to customer
    const autoReplyResult = await sendEmail(
      contactData.email,
      'contactAutoReply',
      contactData
    );

    // Send notification email to admin
    const adminNotificationResult = await sendAdminNotification(
      'contactFormSubmission',
      contactData
    );

    // Log email results
    if (autoReplyResult.success) {
      console.log('Auto-reply email sent to customer');
    } else {
      console.error('Failed to send auto-reply email:', autoReplyResult.error);
    }

    if (adminNotificationResult.success) {
      console.log('Notification email sent to admin');
    } else {
      console.error('Failed to send admin notification:', adminNotificationResult.error);
    }

    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        name: `${contactData.firstName} ${contactData.lastName}`,
        email: contactData.email,
        subject: contactData.subject,
        submittedAt: contactData.submittedAt,
        autoReplySent: autoReplyResult.success,
        responseTime: 'We typically respond within 24 hours'
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      error: 'Submission failed',
      message: 'Unable to send your message. Please try again or contact us directly.'
    });
  }
});

// GET /api/contact/subjects - Get predefined contact subjects
router.get('/subjects', (req, res) => {
  const subjects = [
    {
      value: 'general-inquiry',
      label: 'General Inquiry',
      description: 'General questions about our services'
    },
    {
      value: 'booking-assistance',
      label: 'Booking Assistance',
      description: 'Help with booking or scheduling'
    },
    {
      value: 'treatment-info',
      label: 'Treatment Information',
      description: 'Questions about specific treatments'
    },
    {
      value: 'pricing-packages',
      label: 'Pricing & Packages',
      description: 'Information about pricing and packages'
    },
    {
      value: 'group-bookings',
      label: 'Group Bookings',
      description: 'Corporate or group spa packages'
    },
    {
      value: 'gift-certificates',
      label: 'Gift Certificates',
      description: 'Information about spa gift certificates'
    },
    {
      value: 'membership',
      label: 'Membership',
      description: 'Spa membership and loyalty programs'
    },
    {
      value: 'special-events',
      label: 'Special Events',
      description: 'Spa parties and special occasions'
    },
    {
      value: 'feedback',
      label: 'Feedback',
      description: 'Share your experience with us'
    },
    {
      value: 'complaint',
      label: 'Complaint',
      description: 'Report an issue or concern'
    },
    {
      value: 'partnership',
      label: 'Partnership',
      description: 'Business partnerships and collaborations'
    },
    {
      value: 'other',
      label: 'Other',
      description: 'Other inquiries not listed above'
    }
  ];

  res.json({
    success: true,
    data: subjects
  });
});

// GET /api/contact/hours - Get contact information and business hours
router.get('/hours', (req, res) => {
  const contactInfo = {
    businessHours: {
      monday: { open: '09:00', close: '20:00', isOpen: true },
      tuesday: { open: '09:00', close: '20:00', isOpen: true },
      wednesday: { open: '09:00', close: '20:00', isOpen: true },
      thursday: { open: '09:00', close: '20:00', isOpen: true },
      friday: { open: '09:00', close: '21:00', isOpen: true },
      saturday: { open: '08:00', close: '21:00', isOpen: true },
      sunday: { open: '08:00', close: '19:00', isOpen: true }
    },
    contact: {
      phone: '(555) 123-SPA',
      email: 'hello@serenityspa.com',
      address: {
        street: '123 Wellness Boulevard',
        city: 'Serenity Valley',
        state: 'CA',
        zipCode: '90210',
        country: 'United States'
      }
    },
    responseTime: {
      email: 'Within 24 hours',
      phone: 'Immediate during business hours',
      emergency: 'For urgent matters, please call directly'
    },
    socialMedia: {
      instagram: '@serenityspa',
      facebook: 'SerenitySpaRetreat',
      twitter: '@serenityspa'
    },
    policies: {
      cancellation: '24 hours advance notice required',
      lateness: '15-minute grace period',
      rescheduling: 'Free rescheduling up to 24 hours before appointment'
    }
  };

  // Calculate if currently open
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toTimeString().slice(0, 5);
  
  const todaysHours = contactInfo.businessHours[currentDay];
  const isCurrentlyOpen = todaysHours?.isOpen && 
    currentTime >= todaysHours.open && 
    currentTime <= todaysHours.close;

  res.json({
    success: true,
    data: {
      ...contactInfo,
      currentStatus: {
        isOpen: isCurrentlyOpen,
        message: isCurrentlyOpen ? 'We are currently open' : 'We are currently closed',
        nextOpenTime: !isCurrentlyOpen ? 'Check our business hours below' : null
      }
    }
  });
});

export default router; 