const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');
const Query = require('../models/Query');

// GET /api/dashboard - Get dashboard analytics data
router.get('/', async (req, res) => {
  try {
    // Scheme statistics by category
    const schemesByCategory = await Scheme.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalBudget: { $sum: '$budget_allocated' },
          avgSuccessRate: { $avg: '$success_rate' }
        }
      }
    ]);

    // Query statistics
    const totalQueries = await Query.countDocuments();
    const avgResponseTime = await Query.aggregate([
      {
        $group: {
          _id: null,
          avgTime: { $avg: '$response_time' }
        }
      }
    ]);

    // Popular intents
    const popularIntents = await Query.aggregate([
      {
        $group: {
          _id: '$intent',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Recent queries
    const recentQueries = await Query.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('user_query intent createdAt response_time');

    // Budget allocation by region
    const budgetByRegion = await Scheme.aggregate([
      {
        $group: {
          _id: '$region',
          totalBudget: { $sum: '$budget_allocated' },
          schemeCount: { $sum: 1 }
        }
      },
      { $sort: { totalBudget: -1 } }
    ]);

    res.json({
      overview: {
        totalSchemes: await Scheme.countDocuments(),
        totalQueries,
        avgResponseTime: avgResponseTime[0]?.avgTime || 0,
        totalBudget: await Scheme.aggregate([
          { $group: { _id: null, total: { $sum: '$budget_allocated' } } }
        ]).then(result => result[0]?.total || 0)
      },
      schemesByCategory,
      popularIntents,
      recentQueries,
      budgetByRegion
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;