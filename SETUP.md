# Civisight Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier)
- Gemini API key (free tier)
- Git

## Quick Setup

### 1. Clone and Install Dependencies

```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### 2. Environment Configuration

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/civisight
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Database Setup

```bash
cd backend
node seed.js
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Test the Application

Visit `http://localhost:3000` and try these sample queries:
- "I am buying my first home"
- "I want to start a small business"
- "I need health insurance"

## API Keys Setup

### MongoDB Atlas (Free Tier)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster (M0 Sandbox - FREE)
4. Get connection string
5. Add to MONGODB_URI in backend/.env

### Gemini API (Free Tier)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to GEMINI_API_KEY in backend/.env

## Deployment

### Vercel (Frontend + Backend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production
Add these in Vercel dashboard:
- MONGODB_URI
- GEMINI_API_KEY
- NODE_ENV=production

## Testing

```bash
# Test API endpoints
cd utils
node testQueries.js

# Test individual query
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "I am buying a house"}'
```

## Troubleshooting

### Common Issues:
1. **MongoDB Connection Error**: Check connection string and network access
2. **Gemini API Error**: Verify API key and quota
3. **CORS Error**: Ensure backend is running on port 5000
4. **Build Error**: Check Node.js version (use v16+)

### Logs:
- Backend logs: Check terminal running `npm run dev`
- Frontend logs: Check browser console (F12)

## Features Included

✅ AI-powered query processing  
✅ Government scheme database  
✅ Interactive dashboard  
✅ Mobile-responsive design  
✅ Real-time search  
✅ Analytics tracking  
✅ Free-tier deployment ready  

## Next Steps

1. Add more government schemes to database
2. Integrate with official government APIs
3. Add user authentication
4. Implement feedback system
5. Add multi-language support