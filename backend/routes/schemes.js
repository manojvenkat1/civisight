const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

// GET /api/schemes - Get all schemes with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, region, limit = 10, page = 1 } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (region) filter.region = { $regex: region, $options: 'i' };

    const schemes = await Scheme.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Scheme.countDocuments(filter);

    res.json({
      schemes,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Schemes fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch schemes' });
  }
});

// GET /api/schemes/categories - Get all available categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Scheme.distinct('category');
    res.json({ categories });
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/schemes - Add new scheme (for admin)
router.post('/', async (req, res) => {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    res.status(201).json(scheme);
  } catch (error) {
    console.error('Scheme creation error:', error);
    res.status(400).json({ error: 'Failed to create scheme' });
  }
});

module.exports = router;