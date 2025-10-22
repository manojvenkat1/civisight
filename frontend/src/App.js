import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Schemes from './pages/Schemes';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App bg-gradient-dark min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/dashboard" element={
            <div className="min-h-screen bg-gradient-dark pt-20">
              <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12 text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    <span className="neon-text">Analytics</span> Dashboard
                  </h1>
                  <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Monitor scheme performance, user queries, and budget allocation with real-time insights.
                  </p>
                </div>
                <Dashboard />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;