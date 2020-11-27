/* eslint-disable */
'use strict';
/* eslint-enable */

/* eslint-disable */
//const logger = require('@logger');
//const config = require('@config');
/* eslint-enable */

const sequelize = require('./sequelize/sequelize');
const mongoose = require('./mongoose/mongoose');

module.exports = {
  sequelize,
  mongoose
};
