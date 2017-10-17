'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const userApi = require('../api/v1/user');
const userModel = require('../models/user');
const User = mongoose.model('User');

/**
 * Load
 */

exports.load = async (_id) => {
  var userInfo = await userApi.load(_id);
  return userInfo;
  // const criteria = { _id };
  // try {
  //   req.profile = await User.load({ criteria });
  //   if (!req.profile) return next(new Error('User not found'));
  // } catch (err) {
  //   return next(err);
  // }
  // next();
};

/**
 * Create user
 */
exports.create = async (data) => {
  var result = await userApi.create(data);
  return result;
};

/**
 * Update user
 */
exports.update = async (_id, data) => {
  var result = await userApi.update(_id, data);
  return result;
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

exports.signin = function () {};

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

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

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
