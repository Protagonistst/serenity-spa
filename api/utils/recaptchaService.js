import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Verify reCAPTCHA token with Google's API
 * @param {string} token - The reCAPTCHA token to verify
 * @param {string} remoteip - The user's IP address (optional)
 * @returns {Object} Verification result
 */
export const verifyRecaptcha = async (token, remoteip = null) => {
  try {
    if (!token) {
      return {
        success: false,
        error: 'No reCAPTCHA token provided'
      };
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.warn('reCAPTCHA secret key not configured');
      // In development, if no secret key is configured, allow through
      if (process.env.NODE_ENV === 'development') {
        return { success: true, development: true };
      }
      return {
        success: false,
        error: 'reCAPTCHA not configured'
      };
    }

    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token
    });

    if (remoteip) {
      params.append('remoteip', remoteip);
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000 // 10 second timeout
      }
    );

    const data = response.data;

    if (data.success) {
      return {
        success: true,
        score: data.score, // For reCAPTCHA v3
        action: data.action, // For reCAPTCHA v3
        hostname: data.hostname
      };
    } else {
      return {
        success: false,
        error: 'reCAPTCHA verification failed',
        errorCodes: data['error-codes'] || []
      };
    }

  } catch (error) {
    console.error('reCAPTCHA verification error:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: 'reCAPTCHA verification timeout'
      };
    }

    return {
      success: false,
      error: 'reCAPTCHA verification service unavailable'
    };
  }
};

/**
 * Middleware to verify reCAPTCHA token in request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const recaptchaMiddleware = async (req, res, next) => {
  try {
    const token = req.body.recaptchaToken || req.headers['recaptcha-token'];
    const remoteip = req.ip || req.connection.remoteAddress;

    const result = await verifyRecaptcha(token, remoteip);

    if (!result.success) {
      return res.status(400).json({
        error: 'reCAPTCHA verification failed',
        message: result.error || 'Please complete the reCAPTCHA verification'
      });
    }

    // For reCAPTCHA v3, check score threshold
    if (result.score !== undefined && result.score < 0.5) {
      return res.status(400).json({
        error: 'reCAPTCHA score too low',
        message: 'Please try again or contact support if you continue to have issues'
      });
    }

    // Add verification result to request for use in route handlers
    req.recaptchaResult = result;
    next();

  } catch (error) {
    console.error('reCAPTCHA middleware error:', error);
    res.status(500).json({
      error: 'reCAPTCHA verification error',
      message: 'Unable to verify reCAPTCHA. Please try again.'
    });
  }
};

/**
 * Optional middleware that allows requests through if reCAPTCHA is not configured
 * Useful for development environments
 */
export const optionalRecaptchaMiddleware = async (req, res, next) => {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.log('reCAPTCHA not configured - allowing request through');
    req.recaptchaResult = { success: true, development: true };
    return next();
  }

  return recaptchaMiddleware(req, res, next);
};

export default { verifyRecaptcha, recaptchaMiddleware, optionalRecaptchaMiddleware }; 