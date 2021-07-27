const db = require("../../data/db-config.js");

const find = () => {
  return db("users");
};

export default {
  find,
};