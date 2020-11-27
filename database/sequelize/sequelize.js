/* eslint-disable */
"use strict";
/* eslint-enable */

/* eslint-disable */
const logger = require("../../bundles/server/node_modules/@logger");
const config = require("../../widgets/auth/node_modules/@config");
/* eslint-enable */

const Sequelize = require("sequelize");
const PostModel = require("./models/post.js");

const { uri } = config.database.mysql;
//
// const sequelize = new Sequelize(uri);
const sequelize = new Sequelize(uri, { logging: false });
// Models
const Post = PostModel(sequelize, Sequelize);

module.exports.connect = async (force = true) => {
  await sequelize
    .sync({ force })
    .then(() => {
      logger.log("app", "Sequelize Connected...");
    })
    .catch((error) => {
      logger.log("error", error);
      console.log(error);
      process.exit(1);
    });
};

module.exports.db = sequelize;

module.exports.model = {
  Post,
};
