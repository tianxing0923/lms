'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
 * Category Schema
 */
const CategorySchema = new Schema({
  name: { type: String, default: '' },
  type: { type: String, default: '' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Category', CategorySchema);