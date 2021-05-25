const db = require("../../data/db-config.js");

//----------------------------------------------------------------------------//
// find()
//----------------------------------------------------------------------------//
// method to return all users.
//----------------------------------------------------------------------------//
const find = () => {
  return db("users");
}

//----------------------------------------------------------------------------//
// findById()
//----------------------------------------------------------------------------//
// The .first() method provides a simple way to detect empty results. .where()
// returns an array, but it could be an empty array. Using .first() returns the
// first object in the array, and if the array is empty, the first object is
// "undefined", which can be an easy test for "not the data I was looking for".
//----------------------------------------------------------------------------//
const findById = (id) => {
  return db("users").where({ id }).first();
}

//----------------------------------------------------------------------------//
// findPosts()
//----------------------------------------------------------------------------//
// Good example of using joins in knex.
//----------------------------------------------------------------------------//
const findPosts = (id) => {
  return db("users")
    .join("posts", "users.id", "posts.user_id")
    .select("posts.id", "users.username", "posts.contents")
    .where({ user_id: id });
}

//----------------------------------------------------------------------------//
// add()
//----------------------------------------------------------------------------//
// Create a new user.
//----------------------------------------------------------------------------//
const add = (data) => {
  return db("users").insert(data).then(ids => ids[0]);
}

//----------------------------------------------------------------------------//
// update()
//----------------------------------------------------------------------------//
// Update an existing user.
//----------------------------------------------------------------------------//
const update = (id, data) => {
  return db("users").where({ id }).update(data);
}

//----------------------------------------------------------------------------//
// remove()
//----------------------------------------------------------------------------//
// Delete a user.
//----------------------------------------------------------------------------//
const remove = (id) => {
  return db("users").where({ id }).del();
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findPosts,
}
