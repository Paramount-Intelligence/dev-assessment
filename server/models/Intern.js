const mongoose = require('mongoose');

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['Frontend', 'Backend', 'Fullstack'],
        message: 'Role must be one of: Frontend, Backend, Fullstack',
      },
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
        message: 'Status must be one of: Applied, Interviewing, Hired, Rejected',
      },
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: [0, 'Score must be at least 0'],
      max: [100, 'Score must be at most 100'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Intern', internSchema);
