#!/bin/bash

# 🧪 Serenity Spa API Testing Script
# This script tests all backend API endpoints

echo "🌸 SERENITY SPA API TESTING"
echo "================================"

BASE_URL="http://localhost:3001"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to make API call and display result
test_endpoint() {
    echo -e "\n${BLUE}🔍 Testing: $1${NC}"
    echo -e "${YELLOW}$2${NC}"
    echo "Response:"
    
    if [[ $3 == "POST" ]]; then
        curl -s -X POST "$BASE_URL$4" \
            -H "Content-Type: application/json" \
            -d "$5" | jq '.' 2>/dev/null || curl -s -X POST "$BASE_URL$4" -H "Content-Type: application/json" -d "$5"
    else
        curl -s "$BASE_URL$4" | jq '.' 2>/dev/null || curl -s "$BASE_URL$4"
    fi
    
    echo -e "\n${GREEN}✓ Complete${NC}"
    echo "--------------------------------"
}

# Check if server is running
echo -e "${BLUE}🏥 Health Check${NC}"
response=$(curl -s "$BASE_URL/api/health")
if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ Server is running${NC}"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
else
    echo -e "${RED}❌ Server is not running. Start it with: npm run dev:server${NC}"
    exit 1
fi

echo -e "\n${YELLOW}🚀 Starting API Tests...${NC}"

# 1. CONTACT API TESTS
echo -e "\n\n${BLUE}📞 CONTACT API TESTS${NC}"
echo "================================"

test_endpoint "Get Contact Subjects" \
    "GET /api/contact/subjects - Returns predefined inquiry categories" \
    "GET" \
    "/api/contact/subjects"

test_endpoint "Get Business Hours" \
    "GET /api/contact/hours - Returns business hours and contact info" \
    "GET" \
    "/api/contact/hours"

test_endpoint "Submit Contact Form" \
    "POST /api/contact - Submit a customer inquiry" \
    "POST" \
    "/api/contact" \
    '{"firstName":"John","lastName":"Doe","email":"john@example.com","phone":"555-1234","subject":"general-inquiry","message":"I would like to know more about your relaxation packages and pricing."}'

# 2. BOOKING API TESTS  
echo -e "\n\n${BLUE}📅 BOOKING API TESTS${NC}"
echo "================================"

test_endpoint "Check Availability" \
    "GET /api/booking/availability/:date - Check available time slots" \
    "GET" \
    "/api/booking/availability/2025-12-25"

test_endpoint "Create Booking" \
    "POST /api/booking - Create a new spa appointment" \
    "POST" \
    "/api/booking" \
    '{"selectedService":{"title":"Hot Stone Massage","duration":"90 minutes","price":"$150"},"selectedDate":"2025-12-25","selectedTime":"14:00","personalInfo":{"firstName":"Jane","lastName":"Smith","email":"jane@example.com","phone":"555-5678"}}'

test_endpoint "Invalid Date Availability" \
    "GET /api/booking/availability/:date - Test past date validation" \
    "GET" \
    "/api/booking/availability/2020-01-01"

# 3. NEWSLETTER API TESTS
echo -e "\n\n${BLUE}📧 NEWSLETTER API TESTS${NC}"
echo "================================"

test_endpoint "Newsletter Preferences" \
    "GET /api/newsletter/preferences - Get subscription options" \
    "GET" \
    "/api/newsletter/preferences"

test_endpoint "Subscribe to Newsletter" \
    "POST /api/newsletter/subscribe - Add email to newsletter" \
    "POST" \
    "/api/newsletter/subscribe" \
    '{"email":"subscriber@example.com","firstName":"Sarah","lastName":"Johnson"}'

test_endpoint "Check Subscription Status" \
    "GET /api/newsletter/status/:email - Check if email is subscribed" \
    "GET" \
    "/api/newsletter/status/subscriber@example.com"

test_endpoint "Newsletter Feedback" \
    "POST /api/newsletter/feedback - Submit newsletter feedback" \
    "POST" \
    "/api/newsletter/feedback" \
    '{"email":"subscriber@example.com","rating":5,"feedback":"Love the wellness tips!","suggestions":"More content about meditation please"}'

# 4. ERROR HANDLING TESTS
echo -e "\n\n${BLUE}🚨 ERROR HANDLING TESTS${NC}"
echo "================================"

test_endpoint "Invalid Contact Data" \
    "POST /api/contact - Test validation with missing fields" \
    "POST" \
    "/api/contact" \
    '{"firstName":"John"}'

test_endpoint "Invalid Email Format" \
    "POST /api/newsletter/subscribe - Test with invalid email" \
    "POST" \
    "/api/newsletter/subscribe" \
    '{"email":"invalid-email","firstName":"Test"}'

test_endpoint "404 Endpoint" \
    "GET /api/nonexistent - Test 404 handling" \
    "GET" \
    "/api/nonexistent"

echo -e "\n\n${GREEN}🎉 ALL TESTS COMPLETED!${NC}"
echo "================================"
echo -e "${YELLOW}💡 To test with email functionality:${NC}"
echo "1. Set up your Gmail app password (see GMAIL_SETUP.md)"
echo "2. Create .env file with your email credentials"
echo "3. Restart the server and run tests again"
echo ""
echo -e "${YELLOW}📱 Frontend Testing:${NC}"
echo "Visit http://localhost:5173 to test the full user interface"
echo ""
echo -e "${YELLOW}📊 Monitor Server Logs:${NC}"
echo "Check the terminal running 'npm run dev:server' to see detailed logs" 