const db = require("../../data/db-config.js");

const find = () => {
  return db("users");
};

const findById = (id) => {
  return db("users").where({ id }).first();
};

const add = async (data) => {
  const [id] = await db("users").insert(data);

  return findById(id);
};

const findPosts = (id) => {
  return db("users")
    .join("posts", "users.id", "posts.user_id")
    .select("posts.id", "users.username", "posts.contents")
    .where({ user_id: id });
};

const update = async (id, data) => {
  await db("users").where({ id }).update(data);

  return findById(id);
};

const remove = async (id) => {
  const deletedUser = await findById(id);

  await db("users").where({ id }).del();

  return deletedUser;
};

module.exports = {
  find,
  findById,
  add,
  findPosts,
  update,
  remove,
};