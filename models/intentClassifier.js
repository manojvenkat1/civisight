// Simple intent classification model using keyword matching
// In production, this could be replaced with a more sophisticated ML model

class IntentClassifier {
  constructor() {
    this.intentKeywords = {
      housing: [
        'house', 'home', 'property', 'apartment', 'flat', 'residence',
        'mortgage', 'loan', 'buy', 'purchase', 'first time buyer',
        'housing scheme', 'awas', 'pmay'
      ],
      business: [
        'business', 'startup', 'entrepreneur', 'company', 'enterprise',
        'loan', 'funding', 'mudra', 'msme', 'small business',
        'self employed', 'shop', 'trade'
      ],
      healthcare: [
        'health', 'medical', 'insurance', 'hospital', 'treatment',
        'ayushman', 'medicine', 'doctor', 'surgery', 'disease',
        'healthcare', 'wellness'
      ],
      education: [
        'education', 'study', 'school', 'college', 'university',
        'scholarship', 'student', 'learning', 'course', 'degree',
        'skill development', 'training'
      ],
      employment: [
        'job', 'employment', 'work', 'career', 'skill', 'training',
        'placement', 'unemployment', 'rozgar', 'nrega', 'mgnrega'
      ],
      agriculture: [
        'farmer', 'agriculture', 'farming', 'crop', 'kisan',
        'agricultural', 'rural', 'land', 'irrigation', 'seeds',
        'fertilizer', 'pm kisan'
      ],
      social_welfare: [
        'pension', 'widow', 'disability', 'elderly', 'welfare',
        'social security', 'ration', 'food', 'subsidy', 'bpl'
      ]
    };
  }

  classify(query) {
    const lowerQuery = query.toLowerCase();
    const scores = {};

    // Calculate scores for each intent
    Object.keys(this.intentKeywords).forEach(intent => {
      scores[intent] = 0;
      this.intentKeywords[intent].forEach(keyword => {
        if (lowerQuery.includes(keyword)) {
          scores[intent] += 1;
        }
      });
    });

    // Find the intent with highest score
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore === 0) {
      return 'social_welfare'; // Default intent
    }

    return Object.keys(scores).find(intent => scores[intent] === maxScore);
  }

  getConfidence(query, intent) {
    const lowerQuery = query.toLowerCase();
    const keywords = this.intentKeywords[intent] || [];
    const matches = keywords.filter(keyword => lowerQuery.includes(keyword));
    return matches.length / keywords.length;
  }
}

module.exports = IntentClassifier;