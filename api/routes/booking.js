import express from 'express';
import { sendEmail, sendAdminNotification } from '../utils/emailService.js';
import { optionalRecaptchaMiddleware } from '../utils/recaptchaService.js';

const router = express.Router();

// Validation middleware for booking data
const validateBookingData = (req, res, next) => {
  const { selectedService, selectedDate, selectedTime, personalInfo } = req.body;

  // Check required fields
  if (!selectedService || !selectedDate || !selectedTime || !personalInfo) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Please complete all booking steps'
    });
  }

  // Validate service data
  if (!selectedService.title || !selectedService.duration || !selectedService.price) {
    return res.status(400).json({
      error: 'Invalid service data',
      message: 'Selected service is invalid'
    });
  }

  // Validate personal information
  const { firstName, lastName, email, phone } = personalInfo;
  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({
      error: 'Incomplete personal information',
      message: 'Please provide all required personal details'
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

  // Validate date is not in the past
  const bookingDate = new Date(selectedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    return res.status(400).json({
      error: 'Invalid date',
      message: 'Booking date cannot be in the past'
    });
  }

  next();
};

// POST /api/booking - Create new booking
router.post('/', optionalRecaptchaMiddleware, validateBookingData, async (req, res) => {
  try {
    const bookingData = req.body;
    const { personalInfo } = bookingData;

    // Generate a unique booking reference
    const bookingRef = `SPA-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    // Add booking reference to the data
    const completeBookingData = {
      ...bookingData,
      bookingReference: bookingRef,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    console.log('Processing booking:', {
      reference: bookingRef,
      service: bookingData.selectedService.title,
      date: bookingData.selectedDate,
      time: bookingData.selectedTime,
      customer: `${personalInfo.firstName} ${personalInfo.lastName}`
    });

    // Send confirmation email to customer
    const customerEmailResult = await sendEmail(
      personalInfo.email,
      'bookingConfirmation',
      completeBookingData
    );

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotification(
      'bookingConfirmation',
      completeBookingData
    );

    // Log email results
    if (customerEmailResult.success) {
      console.log('Confirmation email sent to customer');
    } else {
      console.error('Failed to send customer email:', customerEmailResult.error);
    }

    if (adminEmailResult.success) {
      console.log('Notification email sent to admin');
    } else {
      console.error('Failed to send admin email:', adminEmailResult.error);
    }

    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    
    res.status(201).json({
      success: true,
      message: 'Booking submitted successfully',
      bookingReference: bookingRef,
      data: {
        reference: bookingRef,
        service: bookingData.selectedService.title,
        date: bookingData.selectedDate,
        time: bookingData.selectedTime,
        status: 'pending',
        emailSent: customerEmailResult.success
      }
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({
      error: 'Booking failed',
      message: 'Unable to process your booking. Please try again or contact us directly.'
    });
  }
});

// GET /api/booking/:reference - Get booking details (for future use)
router.get('/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    
    // In a real application, you would query your database here
    // For now, return a placeholder response
    
    res.json({
      success: true,
      message: 'Booking lookup functionality will be available soon',
      reference
    });

  } catch (error) {
    console.error('Booking lookup error:', error);
    res.status(500).json({
      error: 'Lookup failed',
      message: 'Unable to retrieve booking information'
    });
  }
});

// GET /api/booking/availability/:date - Check availability for a specific date
router.get('/availability/:date', async (req, res) => {
  try {
    const { date } = req.params;
    
    // Validate date format
    const requestedDate = new Date(date);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid date format',
        message: 'Please provide a valid date in YYYY-MM-DD format'
      });
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (requestedDate < today) {
      return res.status(400).json({
        error: 'Invalid date',
        message: 'Cannot check availability for past dates'
      });
    }

    // In a real application, you would check your booking database
    // For now, return mock availability data
    const availableSlots = [
      '09:00', '10:00', '11:00', '12:00', 
      '14:00', '15:00', '16:00', '17:00'
    ];

    // Simulate some booked slots for demo purposes
    const dayOfWeek = requestedDate.getDay();
    const bookedSlots = dayOfWeek === 6 || dayOfWeek === 0 
      ? ['10:00', '15:00'] // Weekend - fewer slots available
      : ['12:00']; // Weekday - lunch time booked

    const available = availableSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({
      success: true,
      date: date,
      availableSlots: available,
      bookedSlots: bookedSlots,
      message: available.length > 0 
        ? `${available.length} time slots available` 
        : 'No slots available for this date'
    });

  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({
      error: 'Availability check failed',
      message: 'Unable to check availability'
    });
  }
});

export default router; 