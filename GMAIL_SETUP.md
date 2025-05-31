# 📧 Gmail Setup for Spa Email Service

## Why We Need This
The spa website sends professional emails for:
- ✅ **Booking confirmations** to customers
- ✅ **Contact form auto-replies** 
- ✅ **Admin notifications** for new submissions
- ✅ **Newsletter welcome emails**

## Step-by-Step Setup

### 1. Enable 2-Factor Authentication
- Go to [Google Account Settings](https://myaccount.google.com/)
- Navigate to **Security** → **2-Step Verification**
- Click **Get Started** and follow the setup

### 2. Generate App-Specific Password
- Go back to **Security** → **2-Step Verification**
- Scroll down to **App passwords**
- Select app: **Mail**
- Select device: **Other (custom name)** → Type "Spa Website"
- Click **Generate**
- **Copy the 16-character password** (format: `abcd efgh ijkl mnop`)

### 3. Configure Environment
Create `.env` file in the project root:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd-efgh-ijkl-mnop  # The 16-character app password
ADMIN_EMAIL=your-email@gmail.com
```

### 4. Test Email Functionality

#### Option A: Test via API
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "your-email@gmail.com",
    "subject": "test",
    "message": "Testing email functionality"
  }'
```

#### Option B: Test via Website
1. Go to http://localhost:5173/contact
2. Fill out the contact form
3. Submit and check your email

### 5. What Emails Are Sent

#### Customer Receives:
- **Auto-reply** confirmation email
- Professional spa branding
- Contact information and next steps

#### Admin (You) Receives:
- **Notification** with customer details
- Full message content
- Easy to respond to

### 6. Production Alternatives

For production, consider these services:
- **SendGrid** - Reliable email delivery
- **Mailgun** - Developer-friendly
- **AWS SES** - Cost-effective for high volume
- **Custom SMTP** - Your hosting provider

## Troubleshooting

### Common Issues:

**"Authentication failed"**
- ✅ Verify 2FA is enabled
- ✅ Use app password, not regular password
- ✅ Check email address is correct

**"Connection timeout"**
- ✅ Check internet connection
- ✅ Gmail may be temporarily blocked in some regions
- ✅ Try different network

**"App password not working"**
- ✅ Generate a new app password
- ✅ Remove spaces from the password in .env
- ✅ Restart the server after changing .env

### Test Without Email
During development, the system will work without email configured:
- Forms will still validate and respond
- Console will show "Email not configured" warnings
- All other functionality remains working 