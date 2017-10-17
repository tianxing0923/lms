'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
 * Role Schema
 */
const RoleSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Role', RoleSchema);