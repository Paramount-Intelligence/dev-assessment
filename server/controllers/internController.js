const Intern = require('../models/Intern');

// POST /api/interns
const createIntern = async (req, res, next) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// GET /api/interns
const getInterns = async (req, res, next) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { name: { $regex: escapedSearch, $options: 'i' } },
        { email: { $regex: escapedSearch, $options: 'i' } },
      ];
    }

    if (role) filter.role = role;
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Intern.countDocuments(filter);
    const interns = await Intern.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: interns,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/interns/:id
const getIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }
    res.json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/interns/:id
const updateIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }
    res.json({ success: true, data: intern });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/interns/:id
const deleteIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) {
      return res.status(404).json({ success: false, message: 'Intern not found' });
    }
    res.json({ success: true, message: 'Intern deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createIntern, getInterns, getIntern, updateIntern, deleteIntern };
