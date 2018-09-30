'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  salt: { type: String, default: '' },
  name: { type: String, default: '' },
  avatar: { type: String, default: '' },
  department: { type: String, default: '' },
  position: { type: String, default: '' },
  role: { type: String, default: 'user' },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */
// UserSchema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

/**
 * 字段校验
 */
UserSchema.path('username').validate(function (username) {
  return username.length;
}, '用户名不能为空');

UserSchema.path('password').validate(function (password) {
  return password.length;
}, '密码不能为空');
UserSchema.path('name').validate(function (name) {
  return name.length;
}, '姓名不能为空');

UserSchema.path('department').validate(function (department) {
  return department.length;
}, '部门不能为空');

UserSchema.path('position').validate(function (position) {
  return position.length;
}, '职位不能为空');

UserSchema.path('role').validate(function (role) {
  return role.length;
}, '角色不能为空');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password)) {
    next(new Error('Invalid password'));
  } else {
    this.salt = this.makeSalt();
    this.password = this.encryptPassword(this.password);
    next();
  }
});

/**
 * Methods
 */
UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha256', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};

// /**
//  * Statics
//  */
// UserSchema.statics = {

//   /**
//    * Load
//    *
//    * @param {Object} options
//    * @param {Function} cb
//    * @api private
//    */
//   load: function (options, cb) {
//     options.select = options.select || 'name username';
//     return this.findOne(options.criteria)
//       .select(options.select)
//       .exec(cb);
//   }
// };

mongoose.model('User', UserSchema);