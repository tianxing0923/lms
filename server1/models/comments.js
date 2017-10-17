'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
 * Comment Schema
 */
const CommentSchema = new Schema({
  content: { type: String, default: '', trim: true },
  user: { type: Schema.ObjectId, ref: 'User' },
  reference: { type: Schema.ObjectId },
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Comment', CommentSchema);