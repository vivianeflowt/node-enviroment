/* eslint-disable */
'use strict';

require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_MYSQL_URI,
    dialect: 'mysql'
    // logging: false
  },
  test: {
    url: process.env.DATABASE_MYSQL_URI,
    dialect: 'mysql'
    // logging: false
  },
  production: {
    url: process.env.DATABASE_MYSQL_URI,
    dialect: 'mysql'
    // logging: false
  }
};
/* eslint-enable */
