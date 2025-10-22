const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');
const Query = require('../models/Query');
const AIController = require('../controllers/aiController');

// POST /api/query - Process citizen query and return relevant schemes
router.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    const startTime = Date.now();

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Classify intent
    const intent = AIController.classifyIntent(query);

    // Find relevant schemes
    const schemes = await Scheme.find({
      $or: [
        { category: intent },
        { keywords: { $regex: query, $options: 'i' } },
        { scheme_name: { $regex: query, $options: 'i' } },
        { benefit_summary: { $regex: query, $options: 'i' } }
      ]
    }).limit(5);

    // Generate AI summaries for each scheme
    const schemesWithSummaries = await Promise.all(
      schemes.map(async (scheme) => {
        const aiSummary = await AIController.summarizeScheme(scheme);
        return {
          ...scheme.toObject(),
          ai_summary: aiSummary
        };
      })
    );

    // Generate conversational explanation
    const explanation = await AIController.generateExplanation(query, schemes);

    const responseTime = Date.now() - startTime;

    // Save query for analytics
    const queryRecord = new Query({
      user_query: query,
      intent,
      matched_schemes: schemes.map(s => s._id),
      response_time: responseTime
    });
    await queryRecord.save();

    res.json({
      query,
      intent,
      explanation,
      schemes: schemesWithSummaries,
      total_found: schemes.length,
      response_time: responseTime
    });

  } catch (error) {
    console.error('Query processing error:', error);
    res.status(500).json({ error: 'Failed to process query' });
  }
});

module.exports = router;