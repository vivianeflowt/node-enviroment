// const mongoose = require('mongoose');
// const { Schema } = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');
// const uniqueValidator = require('mongoose-unique-validator');
// // const { objectToUpperCase } = require('../helpers/helpers');

// const UserSchema = new Schema({
//   uid: {
//     type: String,
//     trim: true,
//     unique: true,
//     uppercase: true,
//     required: true,
//     index: true,
//     select: true,
//     immutable: true
//   },
//   username: {
//     type: String,
//     index: true,
//     select: true,
//     immutable: true,
//     required: [true, 'email required'],
//     maxlength: [80, 'username too long']
//   },
//   email: {
//     type: String,
//     index: true,
//     trim: true,
//     lowercase: true,
//     unique: true,
//     select: true,
//     required: [true, 'email required'],
//     validate: [isEmail, 'invalid email'],
//     maxlength: [120, 'email too long']
//   },
//   password: {
//     type: String,
//     trim: true,
//     select: true,
//     required: [true, 'password required']
//   },
//   firstname: {
//     type: String,
//     default: '',
//     maxlength: [120, 'first name too long']
//   },
//   lastname: {
//     type: String,
//     default: '',
//     maxlength: [120, 'last name too long']
//   },
//   active: {
//     type: Boolean,
//     default: true
//   },
//   subscription: {
//     verified: {
//       type: Boolean,
//       default: false
//     },
//     code: {
//       type: String,
//       require: true
//     }
//   },
//   credentials: {
//     type: Object,
//     default: {}
//   },
//   privileges: {
//     type: Object,
//     default: {}
//   },
//   roles: {
//     type: Array,
//     default: ['USER']
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// UserSchema.plugin(uniqueValidator);

// // Password Hash
// UserSchema.pre('save', (next) => {
//   const user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();

//   const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
//   user.password = hash;
//   next();
// });

// // Password Check
// UserSchema.methods.validatePassword = function (data) {
//   return bcrypt.compareSync(data, this.password);
// };

// // Roles
// // UserSchema.pre('save', function (next) {
// //   const user = this;

// //   if (!user.isModified('roles')) return next();

// //   const roles = arrClear(user.roles);
// //   roles.forEach((role) => {
// //     role = role.toUpperCase().trim().split(' ').join('');
// //   });
// //   user.roles = roles;
// //   next();
// // });

// // privileges
// // UserSchema.pre('save', function (next) {
// //   const user = this;
// //   if (!user.isModified('privileges')) return next();
// //   const privileges = objectToUpperCase(user.privileges);
// //   user.privileges = privileges;
// //   next();
// // });

// // credentials
// // UserSchema.pre('save', function (next) {
// //   const user = this;
// //   if (!user.isModified('credentials')) return next();
// //   const credentials = objectToUpperCase(user.credentials);
// //   user.credentials = credentials;
// //   next();
// // });

// const UserModel = mongoose.model('User', UserSchema);

// module.exports.UserModel = UserModel;
