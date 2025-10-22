import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SchemeCard from '../components/SchemeCard';
import { apiService } from '../services/api';
import { MessageCircle, Sparkles, Zap, Shield, Target } from 'lucide-react';

const Home = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await apiService.submitQuery(query);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to process your query. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-glow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">Empower Citizens with</span><br/>
            <span className="neon-text">Smart Policy Insights</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover the schemes, rights, and benefits that matter to you.
            AI-powered recommendations in simple language.
          </p>

          <div className="mb-16">
            <button 
              onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4 animate-pulse"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div id="search-section" className="relative pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </div>

      {/* Results Section */}
      {searchResults && (
        <div className="relative max-w-7xl mx-auto px-6 pb-20">
          {/* AI Explanation */}
          {searchResults.explanation && (
            <div className="card-glow mb-12">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-3 text-lg">AI Assistant Response</h3>
                  <p className="text-white/90 leading-relaxed">{searchResults.explanation}</p>
                  <div className="mt-4 text-sm text-white/60">
                    Found {searchResults.total_found} relevant schemes • Response time: {searchResults.response_time}ms
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Schemes Grid */}
          {searchResults.schemes && searchResults.schemes.length > 0 ? (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                <span className="neon-text">Recommended Schemes</span> for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.schemes.map((scheme) => (
                  <SchemeCard key={scheme._id} scheme={scheme} />
                ))}
              </div>
            </div>
          ) : searchResults && (
            <div className="text-center py-16">
              <div className="card-glow max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-white mb-3">
                  No schemes found
                </h3>
                <p className="text-white/70">
                  Try rephrasing your query or use different keywords.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="relative max-w-4xl mx-auto px-6 pb-16">
          <div className="card-glow border-red-500/30 text-center">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Features Section (shown when no search results) */}
      {!searchResults && !loading && (
        <div className="relative max-w-7xl mx-auto px-6 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="neon-text">Civisight</span>?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Cutting-edge AI technology meets civic empowerment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glow text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Natural Language Queries</h3>
              <p className="text-white/70 leading-relaxed">
                Ask in plain English about your needs and get relevant government schemes instantly.
              </p>
            </div>
            
            <div className="card-glow text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">AI-Powered Summaries</h3>
              <p className="text-white/70 leading-relaxed">
                Complex policies explained in simple, easy-to-understand language with AI assistance.
              </p>
            </div>
            
            <div className="card-glow text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Personalized Recommendations</h3>
              <p className="text-white/70 leading-relaxed">
                Receive scheme suggestions tailored to your specific situation and needs.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8"></div>
          <p className="text-white/60">
            © 2024 Civisight. Empowering citizens through AI-driven policy insights.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;