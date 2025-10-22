import React, { useState } from 'react';
import { Search, Loader, Sparkles } from 'lucide-react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const exampleQueries = [
    "I am buying my first home",
    "I want to start a small business",
    "I need health insurance",
    "Looking for job training programs"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative mb-8">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., I'm planning to buy my first home..."
            className="input-field pl-14 pr-32 py-5 text-lg placeholder:text-white/50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-white/60 mb-4 text-sm">Try these examples:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              onClick={() => setQuery(example)}
              className="text-sm bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-primary/50"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;