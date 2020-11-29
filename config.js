"use strict";

require("dotenv").config();

module.exports = {
  mongo: {
    uri: process.env.MONGO_URI || "",
    host: process.env.MONGO_HOST || "",
    port: process.env.MONGO_PORT || "",
    user: process.env.MONGO_USER || "",
    password: process.env.MONGO_PASSWORD || "",
    database: process.env.MONGO_DB || "",
  },
};
