/* eslint-disable */
'use strict';
/* eslint-enable */

const mongoose = require('mongoose');
const { Schema } = require('mongoose');
// const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const CredencialSchema = new Schema({
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
CredencialSchema.set('toJSON', {
  transform(doc, ret, opt) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
/* eslint-enable */

CredencialSchema.plugin(uniqueValidator);

const CredencialModel = mongoose.model('Credencial', CredencialSchema);

module.exports = CredencialModel;
