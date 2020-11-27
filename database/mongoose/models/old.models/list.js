// const mongoose = require('mongoose');
// const { Schema } = require('mongoose');
// const arrClear = require('array-unique');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');
// const slugify = require('slugify');
// const uniqueValidator = require('mongoose-unique-validator');

// const ListSchema = new Schema({
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
//   owner: {
//     type: String,
//     trim: true,
//     index: true,
//     default: '',
//     // unique: true,
//     // required: [true, 'owner required'],
//     maxlength: [120, 'owner too long']
//   },
//   email: {
//     type: String,
//     index: true,
//     trim: true,
//     lowercase: true,
//     select: true,
//     immutable: true,
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
//   title: {
//     type: String,
//     trim: true,
//     select: true,
//     index: true,
//     // unique: true,
//     required: [true, 'title required'],
//     maxlength: [120, 'title too long']
//   },
//   subtitle: {
//     type: String,
//     trim: true,
//     default: '',
//     maxlength: [120, 'subtitle too long']
//   },
//   slug: {
//     type: String,
//     trim: true,
//     uppercase: true,
//     default: '',
//     maxlength: [120, 'slug too long']
//   },
//   description: {
//     type: String,
//     default: '',
//     maxlength: [500, 'description too long']
//   },
//   keywords: {
//     type: [
//       {
//         type: String,
//         trim: true,
//         uppercase: true,
//         maxlength: [20, 'keyword too long']
//       }
//     ],
//     default: []
//   },
//   active: {
//     type: Boolean,
//     default: false
//   },
//   geo: {
//     type: Schema.Types.Mixed,
//     default: {}
//   },
//   address: {
//     district: {
//       type: String,
//       uppercase: true,
//       trim: true,
//       maxlength: [100, 'district too long']
//     },
//     city: {
//       type: String,
//       uppercase: true,
//       trim: true,
//       maxlength: [100, 'city too long']
//     },
//     state: {
//       type: String,
//       uppercase: true,
//       trim: true,
//       maxlength: [100, 'state too long']
//     },
//     country: {
//       type: String,
//       uppercase: true,
//       trim: true,
//       maxlength: [100, 'country too long']
//     }
//   },
//   public: {
//     type: Boolean,
//     default: true
//   },
//   members: {
//     type: [Object],
//     default: []
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// ListSchema.plugin(uniqueValidator);

// ListSchema.methods.keyword = {
//   add(keyword = '') {
//     if (keyword !== '') {
//       this.keywords.push(keyword.toLowerCase().trim().split(' ').join(''));
//     }
//   },
//   rem(keyword = '') {
//     if (keyword !== '') {
//       const index = this.keywords.indexOf(keyword);
//       if (index > -1) {
//         this.keywords.splice(index, 1);
//       }
//     }
//   },
//   clear() {
//     this.keywords = [];
//   }
// };

// // Password Hash
// ListSchema.pre('save', function (next) {
//   const list = this;

//   // only hash the password if it has been modified (or is new)
//   if (!list.isModified('password')) return next();

//   const hash = bcrypt.hashSync(list.password, bcrypt.genSaltSync(8), null);
//   list.password = hash;
//   next();
// });

// // Password Check
// ListSchema.methods.checkPassword = function (password) {
//   const list = this;
//   return bcrypt.compareSync(password, list.password);
// };

// // Slug
// ListSchema.pre('save', function (next) {
//   const list = this;
//   if (!list.isModified('title')) return next();
//   const slug = slugify(list.title).trim().toUpperCase();
//   list.slug = slug;
//   next();
// });

// // // Keywords
// // ListSchema.pre('save', function (next) {
// //     const list = this

// //     if (!list.isModified('keywords')) return next()

// //     const keywords = arrClear(list.keywords)
// //     keywords.forEach((keyword) => {
// //         keyword = keyword.toLowerCase().trim().split(' ').join('')
// //     })
// //     list.keywords = keywords
// //     next()
// // })

// // Keywords
// ListSchema.pre('save', function (next) {
//   const list = this;
//   if (!list.isModified('keywords')) return next();
//   // console.log('aaa')
//   const keywords = arrClear(list.keywords);
//   list.keywords.forEach((keyword) => {
//     keyword = keyword.toUpperCase().trim().split(' ').join('');
//   });
//   list.keywords = keywords;
//   next();
// });

// const ListModel = mongoose.model('List', ListSchema);

// module.exports.ListModel = ListModel;
