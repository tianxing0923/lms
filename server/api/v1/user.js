'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
// const { respond } = require('../utils');
const userModel = require('../../models/user');
const ExtendError = require('../../utils/extend_error');
const User = mongoose.model('User');

/**
 * Load
 */

exports.load = async (_id) => {
  try {
    var userInfo = await User.findById(_id);
    if (!userInfo) {
      throw new ExtendError(404, '用户不存在');
    }
  } catch (e) {
    throw new ExtendError(500, e);
  }
};

/**
 * Create user
 */
exports.create = async (data) => {
  const user = new User(data);
  try {
    await user.save();
  } catch (e) {
    const errors = Object.keys(e.errors)
      .map(field => e.errors[field].message);
    throw new ExtendError(500, errors);
  }
};

/**
 * Update user
 */
exports.update = async (_id, data) => {
  try {
    User.findById(_id, function (err, model) {
      Object.assign(model, data);
      model.save();
    });
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * Delete user
 */
exports.delete = async (_id) => {
  try {
    User.findByIdAndRemove(_id, function (err, model) {
      Object.assign(model, data);
      model.save();
    });
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};

/**
 *  Show profile
 */

// exports.show = function (req, res) {
//   const user = req.profile;
//   respond(res, 'users/show', {
//     title: user.name,
//     user: user
//   });
// };

exports.signin = function () {

};

/**
 * Auth callback
 */

exports.authCallback = login;

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login'
  });
};

/**
 * Show sign up form
 */

// exports.signup = function (req, res) {
//   res.render('users/signup', {
//     title: 'Sign up',
//     user: new User()
//   });
// };

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  const redirectTo = req.session.returnTo
    ? req.session.returnTo
    : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}
