/* eslint-disable */
'use strict';
/* eslint-enable */

const mongoose = require('mongoose');
const { Schema } = require('mongoose');
// const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const RoleSchema = new Schema({
  role: {
    type: String,
    trim: true,
    immutable: true,
    // unique: true,
    uppercase: true,
    require: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  privileges: {
    type: Object,
    default: {}
  }
});

/* eslint-disable */
RoleSchema.set('toJSON', {
  transform(doc, ret, opt) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
/* eslint-enable */

RoleSchema.plugin(uniqueValidator);

const RoleModel = mongoose.model('Role', RoleSchema);

module.exports = RoleModel;
