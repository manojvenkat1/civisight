# 🌟 Civisight - AI-Powered Civic Policy Assistant

> **Hackathon-Ready CivicTech Application** | Empowering citizens through intelligent policy recommendations

![Civisight Banner](https://img.shields.io/badge/Civisight-AI%20Civic%20Assistant-7C3AED?style=for-the-badge&logo=sparkles)

## 🚀 Live Demo
- **Frontend**: [Deploy on Vercel](https://vercel.com)
- **Backend**: [Deploy on Render](https://render.com)

## ✨ Features

### 🤖 AI-Powered Intelligence
- **Natural Language Queries** - Ask in plain English: "I'm buying my first home"
- **Smart Intent Classification** - Automatically categorizes user needs
- **AI Summarization** - Complex policies explained simply using Gemini API
- **Personalized Recommendations** - Tailored scheme suggestions

### 📊 Interactive Dashboard
- Real-time analytics and visualizations
- Budget allocation tracking across regions
- Query pattern analysis
- Scheme performance metrics

### 🎨 Modern UI/UX
- **Hunt AI-Inspired Design** - Dark gradients with neon accents
- **Glassmorphism Effects** - Floating cards with backdrop blur
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Hover effects and transitions

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern component-based architecture
- **Tailwind CSS** - Utility-first styling with custom theme
- **Chart.js** - Interactive data visualizations
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js + Express.js** - RESTful API server
- **MongoDB Atlas** - Cloud database (free tier)
- **Mongoose** - Object modeling for MongoDB

### AI Integration
- **Google Gemini API** - Natural language processing
- **Custom Intent Classifier** - Keyword-based categorization
- **Policy Summarization** - AI-generated explanations

### Deployment
- **Vercel** - Frontend hosting (free tier)
- **Render/Vercel** - Backend hosting options
- **MongoDB Atlas** - Database hosting (free tier)

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Gemini API key

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/civisight.git
cd civisight
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Seed database and start server:
```bash
node seed.js
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start development server:
```bash
npm start
```

### 4. Access Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

## 📡 API Endpoints

### Query Processing
```http
POST /api/query
Content-Type: application/json

{
  "query": "I am buying my first home"
}
```

### Scheme Management
```http
GET /api/schemes?category=housing&region=Delhi
GET /api/schemes/categories
POST /api/schemes
```

### Analytics Dashboard
```http
GET /api/dashboard
```

## 🎯 Sample Queries

Try these example queries to see Civisight in action:

- **Housing**: "I am buying my first home"
- **Business**: "I want to start a small business"
- **Healthcare**: "I need health insurance for my family"
- **Education**: "Looking for scholarship opportunities"
- **Employment**: "I need job training programs"

## 🏗️ Project Structure

```
civisight/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # AI processing logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── seed.js          # Sample data seeder
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── services/    # API integration
│   └── public/
├── models/              # AI classification models
├── utils/               # Testing utilities
└── docs/                # Documentation
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Environment Variables for Production
```env
# Backend
MONGODB_URI=your_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production

# Frontend
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

## 🧪 Testing

### Run API Tests
```bash
cd utils
node testQueries.js
```

### Manual Testing
```bash
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "I need health insurance"}'
```

## 📊 Sample Data

The application includes 5 real government schemes:
- **Pradhan Mantri Awas Yojana** (Housing)
- **Mudra Yojana** (Business)
- **Ayushman Bharat** (Healthcare)
- **Skill India Mission** (Employment)
- **PM Kisan Samman Nidhi** (Agriculture)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Ready

### ✅ Complete Features
- AI-powered search and recommendations
- Interactive dashboard with real-time analytics
- Mobile-responsive modern UI
- Government scheme database
- Free-tier deployment configuration

### ✅ Technical Excellence
- Clean, modular codebase
- RESTful API design
- Modern React architecture
- AI/ML integration
- Production-ready deployment

### ✅ Innovation
- Natural language policy queries
- AI-generated summaries
- Personalized civic recommendations
- Real-time analytics dashboard

## 🎨 Design Credits

UI/UX inspired by modern AI applications with:
- Dark gradient backgrounds
- Glassmorphism effects
- Neon accent colors
- Smooth animations

## 📞 Support

For questions or support:
- Create an [Issue](https://github.com/yourusername/civisight/issues)
- Email: your.email@example.com

---

<div align="center">

**Built with ❤️ for empowering citizens through technology**

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Powered by AI](https://img.shields.io/badge/Powered%20by-AI-7C3AED?style=flat&logo=openai)](https://ai.google.dev/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-000000?style=flat&logo=vercel)](https://vercel.com)

</div>