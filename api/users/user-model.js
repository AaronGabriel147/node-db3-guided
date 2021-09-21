const db = require("../../data/db-config.js");

const find = () => {
  return db("users");
};

const findById = (id) => {
  return db("users")
    .leftJoin('posts', 'users.id', 'posts.user_id')
    .select("users.id", "users.username")
    .count("posts.id AS posts_count")
    .where('users.id', id)
    .first();
};

const findPosts = (id) => {
  return db("users")
    .join("posts", "users.id", "posts.user_id")
    .select("posts.id", "posts.contents", "users.username")
    .where("users.id", id);
};

const add = (data) => {
  return db("users").insert(data, "id");
};

const update = (id, data) => {
  return db("users").where({ id }).update(data);
};

const remove = (id) => {
  return db("users").where({ id }).del();
};

module.exports = {
  find,
  findById,
  findPosts,
  add,
  update,
  remove,
}