/* eslint-disable */
'use strict';
/* eslint-enable */

const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const PluginUnique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const SALT_WORK_FACTOR = 10;

const usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 50],
    message: 'username should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'username should contain alpha-numeric characters only'
  })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 140],
    message: 'email should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isEmail',
    message: 'needs a valid email'
  })
];

const AccountSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    index: true,
    lowercase: true,
    // select: true,
    // unique: true,
    immutable: true,
    required: [true, 'username required'],
    validate: usernameValidator
  },
  email: {
    type: String,
    index: true,
    trim: true,
    lowercase: true,
    // unique: true,
    required: [true, 'email required'],
    // maxlength: [140, 'email too long']
    validate: emailValidator
  },
  password: {
    type: String,
    // select: false,
    trim: true,
    required: [true, 'password required']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  roles: {
    type: [],
    uppercase: true,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

AccountSchema.plugin(PluginUnique);

AccountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

AccountSchema.pre('save', async function (next) {
  if (!this.isModified('roles')) return next();
  try {
    const roles = this.roles.sort();
    this.roles = [];
    roles.forEach((role) => {
      this.roles.push(role.toUpperCase().trim());
    });
    return next();
  } catch (error) {
    return next(error);
  }
});

AccountSchema.pre('save', async function (next) {
  if (!this.isModified('email')) return next();
  try {
    this.isVerified = false;
    return next();
  } catch (error) {
    return next(error);
  }
});

/* eslint-disable */
AccountSchema.set('toJSON', {
  transform(doc, ret, opt) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});
/* eslint-enable */

AccountSchema.pre('save', async function (next) {
  try {
    this.updateAt = Date.now();
    return next();
  } catch (error) {
    return next(error);
  }
});

AccountSchema.methods.verifyPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch {
    return false;
  }
};

const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel;
