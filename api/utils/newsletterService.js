import Mailchimp from 'mailchimp-api-v3';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Mailchimp client
let mailchimp = null;

if (process.env.MAILCHIMP_API_KEY) {
  mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
} else {
  console.warn('Mailchimp API key not configured');
}

/**
 * Subscribe user to newsletter
 * @param {Object} subscriberData - User data
 * @param {string} subscriberData.email - User email
 * @param {string} subscriberData.firstName - User first name (optional)
 * @param {string} subscriberData.lastName - User last name (optional)
 * @returns {Object} Subscription result
 */
export const subscribeToNewsletter = async (subscriberData) => {
  try {
    if (!mailchimp) {
      console.warn('Mailchimp not configured - storing subscription locally');
      // In development or when Mailchimp is not configured,
      // you could store this in a local database or file
      return {
        success: true,
        development: true,
        message: 'Subscription recorded (development mode)'
      };
    }

    const listId = process.env.MAILCHIMP_LIST_ID;
    if (!listId) {
      throw new Error('Mailchimp list ID not configured');
    }

    // Prepare member data for Mailchimp
    const memberData = {
      email_address: subscriberData.email,
      status: 'subscribed',
      merge_fields: {}
    };

    // Add first name if provided
    if (subscriberData.firstName) {
      memberData.merge_fields.FNAME = subscriberData.firstName;
    }

    // Add last name if provided
    if (subscriberData.lastName) {
      memberData.merge_fields.LNAME = subscriberData.lastName;
    }

    // Add tags for spa newsletter
    memberData.tags = ['Spa Newsletter', 'Website Signup'];

    // Add to Mailchimp list
    const response = await mailchimp.post(`/lists/${listId}/members`, memberData);

    return {
      success: true,
      subscriberId: response.id,
      email: response.email_address,
      status: response.status,
      message: 'Successfully subscribed to newsletter'
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error.message);

    // Handle specific Mailchimp errors
    if (error.status === 400 && error.title === 'Member Exists') {
      return {
        success: false,
        error: 'already_subscribed',
        message: 'This email is already subscribed to our newsletter'
      };
    }

    if (error.status === 400 && error.title === 'Invalid Resource') {
      return {
        success: false,
        error: 'invalid_email',
        message: 'Please provide a valid email address'
      };
    }

    return {
      success: false,
      error: 'subscription_failed',
      message: 'Unable to subscribe to newsletter. Please try again later.'
    };
  }
};

/**
 * Unsubscribe user from newsletter
 * @param {string} email - User email
 * @returns {Object} Unsubscription result
 */
export const unsubscribeFromNewsletter = async (email) => {
  try {
    if (!mailchimp) {
      return {
        success: true,
        development: true,
        message: 'Unsubscription recorded (development mode)'
      };
    }

    const listId = process.env.MAILCHIMP_LIST_ID;
    if (!listId) {
      throw new Error('Mailchimp list ID not configured');
    }

    // Create subscriber hash (required by Mailchimp API)
    const crypto = await import('crypto');
    const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

    // Update member status to unsubscribed
    const response = await mailchimp.patch(`/lists/${listId}/members/${subscriberHash}`, {
      status: 'unsubscribed'
    });

    return {
      success: true,
      email: response.email_address,
      status: response.status,
      message: 'Successfully unsubscribed from newsletter'
    };

  } catch (error) {
    console.error('Newsletter unsubscription error:', error.message);

    if (error.status === 404) {
      return {
        success: false,
        error: 'not_found',
        message: 'Email address not found in our newsletter list'
      };
    }

    return {
      success: false,
      error: 'unsubscription_failed',
      message: 'Unable to unsubscribe. Please try again later.'
    };
  }
};

/**
 * Get subscriber information
 * @param {string} email - User email
 * @returns {Object} Subscriber information
 */
export const getSubscriberInfo = async (email) => {
  try {
    if (!mailchimp) {
      return {
        success: false,
        error: 'service_not_configured',
        message: 'Newsletter service not configured'
      };
    }

    const listId = process.env.MAILCHIMP_LIST_ID;
    if (!listId) {
      throw new Error('Mailchimp list ID not configured');
    }

    // Create subscriber hash
    const crypto = await import('crypto');
    const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

    const response = await mailchimp.get(`/lists/${listId}/members/${subscriberHash}`);

    return {
      success: true,
      subscriber: {
        email: response.email_address,
        status: response.status,
        firstName: response.merge_fields.FNAME || '',
        lastName: response.merge_fields.LNAME || '',
        subscribeDate: response.timestamp_signup,
        tags: response.tags || []
      }
    };

  } catch (error) {
    if (error.status === 404) {
      return {
        success: false,
        error: 'not_found',
        message: 'Subscriber not found'
      };
    }

    return {
      success: false,
      error: 'lookup_failed',
      message: 'Unable to retrieve subscriber information'
    };
  }
};

/**
 * Alternative service for SendinBlue (Brevo)
 * Note: The old SendinBlue API package is deprecated
 * For new implementations, use Brevo's REST API directly or their new SDK
 * Documentation: https://developers.brevo.com/
 */

export default {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getSubscriberInfo
}; 