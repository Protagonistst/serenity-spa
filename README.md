# 🌸 Luxury Spa Retreat Website

A premium, production-ready spa website built with React 18, TypeScript, and Express.js backend. This is a portfolio-quality demonstration of modern full-stack web development with sophisticated animations, responsive design, and complete backend integration.

![Spa Website Preview](https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&q=80&w=1200&h=600&fit=crop)

## ✨ Features

### Frontend
- 🎨 **Modern UI/UX** - Sophisticated design with Tailwind CSS
- 🌙 **Dark/Light Mode** - System preference detection with manual toggle
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **Fast Performance** - Vite build system with code splitting
- 🎬 **Smooth Animations** - Framer Motion with scroll-triggered effects
- 🖼️ **Interactive Gallery** - Lightbox modal with category filtering
- 📝 **Multi-step Forms** - Booking process with validation
- 🔒 **Type Safety** - Full TypeScript implementation

### Backend
- 🚀 **Express.js API** - RESTful endpoints with proper error handling
- 📧 **Email Integration** - Nodemailer with beautiful HTML templates
- 🤖 **Spam Protection** - Google reCAPTCHA v2/v3 integration
- 📬 **Newsletter Service** - Mailchimp integration with auto-responses
- 🛡️ **Security** - Helmet, CORS, rate limiting
- 📊 **Monitoring** - Comprehensive logging and health checks

## 🛠️ Tech Stack

### Frontend
- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router v6** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zustand** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Nodemailer** - Email sending service
- **Mailchimp API** - Newsletter management
- **Google reCAPTCHA** - Bot protection
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Request rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Gmail account (for email service)
- Google reCAPTCHA account (optional for development)
- Mailchimp account (optional for newsletter)

### 1. Clone and Install
```bash
git clone <repository-url>
cd luxury-spa-retreat
npm install
```

### 2. Environment Setup
```bash
# Copy the environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Basic Development Setup
For quick testing, you only need to configure email:

```env
# Minimal .env for development
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

# Gmail configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
ADMIN_EMAIL=your-email@gmail.com

# Optional services (will work without these in development)
# RECAPTCHA_SITE_KEY=your-site-key
# RECAPTCHA_SECRET_KEY=your-secret-key
# MAILCHIMP_API_KEY=your-api-key
# MAILCHIMP_LIST_ID=your-list-id
```

### 4. Run Development Servers
```bash
# Option 1: Run both frontend and backend together
npm run dev:full

# Option 2: Run separately
npm run dev          # Frontend only (http://localhost:5173)
npm run dev:server   # Backend only (http://localhost:3001)
```

### 5. Test the Application
- 📱 **Frontend**: http://localhost:5173
- 🔧 **Backend Health**: http://localhost:3001/api/health
- 📝 **Booking Form**: Complete a test booking
- 📧 **Contact Form**: Send a test message
- 📬 **Newsletter**: Subscribe to test email flow

## 🔧 Detailed Configuration

### Email Service Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Configure .env**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=generated-app-password
   ```

### Google reCAPTCHA Setup

1. **Create reCAPTCHA Site**:
   - Visit: https://www.google.com/recaptcha/admin
   - Add new site
   - Choose reCAPTCHA v2 "I'm not a robot"
   - Add domains: `localhost`, `127.0.0.1`, your-domain.com

2. **Configure Frontend**:
   ```env
   RECAPTCHA_SITE_KEY=your-site-key
   ```

3. **Configure Backend**:
   ```env
   RECAPTCHA_SECRET_KEY=your-secret-key
   ```

### Mailchimp Integration

1. **Create Mailchimp Account** and audience
2. **Get API Key**:
   - Account → Extras → API keys
   - Create new key
3. **Get List ID**:
   - Audience → Settings → Audience name and campaign defaults
   - Copy Audience ID
4. **Configure .env**:
   ```env
   MAILCHIMP_API_KEY=your-api-key
   MAILCHIMP_LIST_ID=your-list-id
   ```

### Production SMTP (Optional)

For production, consider using a dedicated SMTP service:

```env
# Instead of Gmail, use custom SMTP
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=your-smtp-password
```

## 📦 API Endpoints

### Booking API
```
POST   /api/booking              # Create new booking
GET    /api/booking/:reference   # Get booking details
GET    /api/booking/availability/:date  # Check availability
```

### Contact API
```
POST   /api/contact              # Submit contact form
GET    /api/contact/subjects     # Get contact subjects
GET    /api/contact/hours        # Get contact information
```

### Newsletter API
```
POST   /api/newsletter/subscribe    # Subscribe to newsletter
POST   /api/newsletter/unsubscribe  # Unsubscribe from newsletter
GET    /api/newsletter/status/:email  # Check subscription status
GET    /api/newsletter/preferences   # Get newsletter options
POST   /api/newsletter/feedback     # Submit feedback
```

### Health Check
```
GET    /api/health               # Server health status
```

## 🌐 Deployment

### Netlify Deployment

1. **Build Settings**:
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   dist
   ```

2. **Environment Variables**:
   - Set all production env vars in Netlify dashboard
   - Update `FRONTEND_URL` to your Netlify domain
   - Update `CORS_ORIGIN` to match

3. **Netlify Functions** (Alternative):
   ```bash
   # Create netlify/functions directory
   mkdir -p netlify/functions
   
   # Move API routes to Netlify Functions format
   # Each route becomes a separate function file
   ```

### Vercel Deployment

1. **Vercel Config** (`vercel.json`):
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "package.json", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/api/(.*)", "dest": "/api/server.js" },
       { "src": "/(.*)", "dest": "/" }
     ]
   }
   ```

2. **Environment Variables**:
   - Configure in Vercel dashboard
   - Update URLs for production

### Traditional Hosting (VPS/AWS)

1. **Install Dependencies**:
   ```bash
   npm install --production
   npm run build
   ```

2. **Process Manager** (PM2):
   ```bash
   npm install -g pm2
   pm2 start api/server.js --name spa-backend
   pm2 startup
   pm2 save
   ```

3. **Nginx Configuration**:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       # Frontend (React build)
       location / {
           root /path/to/luxury-spa-retreat/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## 📧 Email Templates

The system includes professional email templates:

- **Booking Confirmation** - Sent to customers after booking
- **Contact Auto-Reply** - Immediate response to contact form
- **Newsletter Welcome** - Welcome email for new subscribers
- **Admin Notifications** - Internal notifications for new submissions

## 🔒 Security Features

- **Input Validation** - Server-side validation for all forms
- **Rate Limiting** - Prevents spam and abuse
- **CORS Protection** - Controlled cross-origin requests
- **Helmet Security** - Security headers and CSP
- **reCAPTCHA** - Bot protection for forms
- **Email Sanitization** - Prevents XSS in emails

## 🧪 Testing

### Manual Testing Checklist
- [ ] Booking form submission and email confirmation
- [ ] Contact form with auto-reply
- [ ] Newsletter subscription with welcome email
- [ ] Dark/light mode toggle
- [ ] Mobile responsiveness
- [ ] Form validation errors
- [ ] API error handling

### API Testing
```bash
# Health check
curl http://localhost:3001/api/health

# Test booking (replace with valid data)
curl -X POST http://localhost:3001/api/booking \
  -H "Content-Type: application/json" \
  -d '{"selectedService":{"title":"Test Service","duration":"60 min","price":"$100"},"selectedDate":"2024-01-15","selectedTime":"10:00","personalInfo":{"firstName":"John","lastName":"Doe","email":"test@example.com","phone":"555-1234"}}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Email not sending?**
- Check Gmail app password is correct
- Verify 2FA is enabled on Gmail
- Check console for error messages

**reCAPTCHA not working?**
- Verify site key matches your domain
- Check if localhost is added to allowed domains
- Ensure secret key is correct in backend

**Newsletter subscription failing?**
- Verify Mailchimp API key and List ID
- Check Mailchimp audience settings
- Review console logs for specific errors

### Getting Help
- 📧 Email: support@example.com
- 💬 Issues: Create a GitHub issue
- 📖 Documentation: Check this README

---

**Built with ❤️ for spa businesses and developers learning modern web development**
