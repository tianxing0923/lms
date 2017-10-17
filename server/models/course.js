'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
 * Course Schema
 */
const CourseSchema = new Schema({
  title: { type: String, default: '', trim: true },
  lecturer: { type: String, default: '', trim: true },
  lecturerIntroduction: { type: String, default: '', trim: true },
  category: { type: Schema.ObjectId, ref: 'Category' },
  content: { type: String, default: '', trim: true },
  user: { type: Schema.ObjectId, ref: 'User' },
  readCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Course', CourseSchema);