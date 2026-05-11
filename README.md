# AI Local Job Finder (Startup MVP) 🚀

A hyper-local job marketplace designed for the unorganized labor sector (drivers, electricians, helpers). Powered by AI-driven web scraping and a simplified mobile-first interface.

## 📱 Features
- **AI Job Scraper:** Automatically fetches and cleans job listings from the web using GPT-4o.
- **Nearby Discovery:** Geospatial map-view for finding jobs within a 2-5km radius.
- **One-Tap Apply:** Direct contact via WhatsApp or Phone Call (No resume required).
- **Voice-First Search:** AI-powered voice assistant for non-technical users.
- **Multilingual:** Support for English, Hindi, and Tamil.

## 🛠️ Tech Stack
- **Mobile:** React Native (Expo)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Geospatial Indexing)
- **AI Engine:** OpenAI GPT-4o, Python (BeautifulSoup)
- **Auth:** Firebase (Mobile OTP)

## 🏗️ Project Structure
- `/ai-job-finder-mobile`: The Expo mobile application.
- `/ai-job-finder-backend`: The Express server and API logic.
- `/ai-job-finder-backend/scripts`: The AI scraper engine.

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd ai-job-finder-backend
npm install
# Add MONGODB_URI and OPENAI_API_KEY to .env
npm run dev
```

### 2. Mobile App Setup
```bash
cd ai-job-finder-mobile
npm install
npx expo start
```

## 📍 Deployment Strategy
- **Frontend:** Build with `eas build` for Android/iOS.
- **Backend:** Deploy to Render.com or AWS App Runner.
- **Database:** Hosted on MongoDB Atlas (Free Tier).

---
*Built with ❤️ for the unorganized workforce.*
