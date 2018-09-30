'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Course Schema
 */
const CourseSchema = new Schema({
  title: { type: String, default: '', trim: true },
  lecturer: { type: String, default: '', trim: true },
  lecturerIntroduction: { type: String, default: '', trim: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  summary: { type: String, default: '', trim: true },
  content: { type: String, default: '', trim: true },
  readCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Course', CourseSchema);