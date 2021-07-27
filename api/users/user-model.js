const db = require("../../data/db-config.js");

const find = () => {
  return db("users");
};

const findById = (id) => {
  return db("users").where({ id }).first();
};

module.exports = {
  find,
  findById,
};