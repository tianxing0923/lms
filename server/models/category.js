'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Category Schema
 */
const CategorySchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Category', CategorySchema);