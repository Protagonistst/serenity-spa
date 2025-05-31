import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter based on environment configuration
const createTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE || 'gmail';
  
  const config = {
    service: emailService,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  };

  // For custom SMTP (like for production)
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  return nodemailer.createTransporter(config);
};

// Email templates
const emailTemplates = {
  bookingConfirmation: (bookingData) => ({
    subject: 'Booking Confirmation - Serenity Spa',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #5a8a5a; font-size: 28px; margin: 0;">Serenity Spa</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Luxury & Wellness</p>
          </div>
          
          <h2 style="color: #333; border-bottom: 2px solid #5a8a5a; padding-bottom: 10px;">Booking Confirmation</h2>
          
          <p>Dear ${bookingData.personalInfo.firstName},</p>
          
          <p>Thank you for choosing Serenity Spa! We're delighted to confirm your booking.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #5a8a5a; margin-top: 0;">Booking Details:</h3>
            <p><strong>Service:</strong> ${bookingData.selectedService.title}</p>
            <p><strong>Date:</strong> ${bookingData.selectedDate}</p>
            <p><strong>Time:</strong> ${bookingData.selectedTime}</p>
            <p><strong>Duration:</strong> ${bookingData.selectedService.duration}</p>
            <p><strong>Price:</strong> ${bookingData.selectedService.price}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #5a8a5a; margin-top: 0;">Contact Information:</h3>
            <p><strong>Name:</strong> ${bookingData.personalInfo.firstName} ${bookingData.personalInfo.lastName}</p>
            <p><strong>Email:</strong> ${bookingData.personalInfo.email}</p>
            <p><strong>Phone:</strong> ${bookingData.personalInfo.phone}</p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #666;">We look forward to welcoming you to our sanctuary of wellness.</p>
            <p style="color: #666; font-size: 14px;">
              If you need to modify or cancel your appointment, please contact us at least 24 hours in advance.
            </p>
            <p style="color: #5a8a5a; font-weight: bold;">📞 (555) 123-SPA | 📧 hello@serenityspa.com</p>
          </div>
        </div>
      </div>
    `
  }),

  contactFormSubmission: (contactData) => ({
    subject: `New Contact Form Submission - ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5a8a5a;">New Contact Form Submission</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-left: 4px solid #5a8a5a; margin-top: 10px;">
            ${contactData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          Submitted on: ${new Date().toLocaleString()}
        </p>
      </div>
    `
  }),

  newsletterWelcome: (subscriberData) => ({
    subject: 'Welcome to Serenity Spa Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #5a8a5a; font-size: 28px; margin: 0;">Welcome to Serenity</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Your Journey to Wellness Begins</p>
          </div>
          
          <p>Hello ${subscriberData.name || 'Friend'},</p>
          
          <p>Thank you for joining our wellness community! You're now part of an exclusive group that receives:</p>
          
          <ul style="color: #666; line-height: 1.6;">
            <li>🌸 Weekly wellness tips and self-care inspiration</li>
            <li>🎁 Exclusive offers and early access to new treatments</li>
            <li>📅 Priority booking for special events and workshops</li>
            <li>💆‍♀️ Personalized treatment recommendations</li>
          </ul>
          
          <div style="background: linear-gradient(135deg, #5a8a5a, #d57873); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: white; margin: 0 0 10px 0;">Special Welcome Offer</h3>
            <p style="color: white; margin: 0; font-size: 18px;">Enjoy 15% off your first treatment</p>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Use code: WELCOME15</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/booking" 
               style="background: #5a8a5a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
              Book Your Experience
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Follow us for daily wellness inspiration:</p>
            <p>📧 hello@serenityspa.com | 📞 (555) 123-SPA</p>
          </div>
        </div>
      </div>
    `
  }),

  contactAutoReply: (contactData) => ({
    subject: 'Thank you for contacting Serenity Spa',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #5a8a5a; font-size: 28px; margin: 0;">Serenity Spa</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Luxury & Wellness</p>
          </div>
          
          <h2 style="color: #333; border-bottom: 2px solid #5a8a5a; padding-bottom: 10px;">Thank You for Reaching Out</h2>
          
          <p>Dear ${contactData.firstName},</p>
          
          <p>Thank you for contacting Serenity Spa. We've received your message and will respond within 24 hours.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5a8a5a;">
            <h3 style="color: #5a8a5a; margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Submitted:</strong> ${new Date(contactData.submittedAt).toLocaleString()}</p>
            <p><strong>Reference:</strong> MSG-${Date.now().toString().slice(-6)}</p>
          </div>
          
          <div style="background: #f0f8f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #5a8a5a; margin-top: 0;">Need Immediate Assistance?</h3>
            <p style="margin-bottom: 10px;">For urgent matters, please contact us directly:</p>
            <p><strong>📞 Phone:</strong> (555) 123-SPA</p>
            <p><strong>📧 Email:</strong> hello@serenityspa.com</p>
            <p><strong>🕐 Hours:</strong> Mon-Thu: 9 AM - 8 PM | Fri-Sat: 9 AM - 9 PM | Sun: 8 AM - 7 PM</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/booking" 
               style="background: #5a8a5a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; margin-right: 10px;">
              Book Appointment
            </a>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/services" 
               style="background: #d57873; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
              View Services
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>We appreciate your interest in Serenity Spa and look forward to serving you.</p>
            <p style="color: #5a8a5a; font-weight: bold;">Experience tranquility. Embrace wellness.</p>
          </div>
        </div>
      </div>
    `
  })
};

// Send email function
export const sendEmail = async (to, emailType, data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[emailType](data);
    
    const mailOptions = {
      from: `"Serenity Spa" <${process.env.EMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject: template.subject,
      html: template.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send notification to admin
export const sendAdminNotification = async (emailType, data) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  if (!adminEmail) {
    console.warn('No admin email configured');
    return { success: false, error: 'No admin email configured' };
  }
  
  return await sendEmail(adminEmail, emailType, data);
};

export default { sendEmail, sendAdminNotification }; 