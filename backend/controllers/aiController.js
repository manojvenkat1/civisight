const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const IntentClassifier = require('../../models/intentClassifier');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const intentClassifier = new IntentClassifier();

class AIController {
  // Classify user intent using improved classifier
  static classifyIntent(query) {
    return intentClassifier.classify(query);
  }

  // Summarize scheme using Gemini API
  static async summarizeScheme(scheme) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Summarize this government scheme in simple, citizen-friendly language:
      
      Scheme: ${scheme.scheme_name}
      Category: ${scheme.category}
      Benefits: ${scheme.benefit_summary}
      Eligibility: ${scheme.eligibility.join(', ')}
      
      Provide a 2-3 sentence summary that explains who can apply and what benefits they'll get.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback summary
      return `${scheme.scheme_name} is a ${scheme.category} scheme offering ${scheme.benefit_summary}. Eligible applicants include: ${scheme.eligibility.slice(0, 2).join(', ')}.`;
    }
  }

  // Generate conversational explanation
  static async generateExplanation(query, schemes) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const schemeList = schemes.map(s => `- ${s.scheme_name}: ${s.benefit_summary}`).join('\n');
      
      const prompt = `A citizen asked: "${query}"
      
      Based on their query, here are relevant government schemes:
      ${schemeList}
      
      Provide a helpful, conversational response explaining how these schemes can help them. Keep it under 100 words.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return `Based on your query "${query}", I found ${schemes.length} relevant government schemes that might help you. Check the details below to see which ones match your needs.`;
    }
  }
}

module.exports = AIController;