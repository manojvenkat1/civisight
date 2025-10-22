import React from 'react';
import { ExternalLink, Users, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

const SchemeCard = ({ scheme }) => {
  const formatBudget = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      housing: 'from-blue-500 to-blue-600',
      business: 'from-green-500 to-green-600',
      healthcare: 'from-red-500 to-red-600',
      education: 'from-purple-500 to-purple-600',
      employment: 'from-orange-500 to-orange-600',
      agriculture: 'from-yellow-500 to-yellow-600',
      social_welfare: 'from-gray-500 to-gray-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="card-glow group hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white flex-1 leading-tight">
          {scheme.scheme_name}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(scheme.category)} shadow-glow`}>
          {scheme.category.replace('_', ' ')}
        </span>
      </div>

      {scheme.ai_summary && (
        <div className="bg-primary/20 border-l-4 border-primary p-4 mb-4 rounded-r-lg backdrop-blur-sm">
          <div className="flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-white/90 italic">
              <strong className="text-primary">AI Summary:</strong> {scheme.ai_summary}
            </p>
          </div>
        </div>
      )}

      <p className="text-white/80 mb-6 leading-relaxed">{scheme.benefit_summary}</p>

      <div className="mb-6">
        <h4 className="font-medium text-white mb-3 flex items-center">
          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
          Eligibility:
        </h4>
        <ul className="text-sm text-white/70 space-y-2">
          {scheme.eligibility.slice(0, 3).map((criteria, index) => (
            <li key={index} className="flex items-start">
              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {criteria}
            </li>
          ))}
          {scheme.eligibility.length > 3 && (
            <li className="text-primary text-xs ml-5">
              +{scheme.eligibility.length - 3} more criteria
            </li>
          )}
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/5 p-3 rounded-xl text-center backdrop-blur-sm border border-white/10">
          <DollarSign className="w-5 h-5 mx-auto text-green-400 mb-2" />
          <div className="text-xs text-white/60 mb-1">Budget</div>
          <div className="text-sm font-medium text-white">{formatBudget(scheme.budget_allocated)}</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl text-center backdrop-blur-sm border border-white/10">
          <Users className="w-5 h-5 mx-auto text-blue-400 mb-2" />
          <div className="text-xs text-white/60 mb-1">Applications</div>
          <div className="text-sm font-medium text-white">{(scheme.applications_count / 1000).toFixed(0)}K</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl text-center backdrop-blur-sm border border-white/10">
          <TrendingUp className="w-5 h-5 mx-auto text-purple-400 mb-2" />
          <div className="text-xs text-white/60 mb-1">Success Rate</div>
          <div className="text-sm font-medium text-white">{scheme.success_rate}%</div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-white/60">Region: {scheme.region}</span>
        <a
          href={scheme.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-primary hover:bg-primary/80 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-glow hover:shadow-glow-lg group-hover:scale-105"
        >
          Apply Now
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default SchemeCard;