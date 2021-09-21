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
// In this method, we went one step further than usual, and added the
// posts_count property to the user object.
//----------------------------------------------------------------------------//
const findById = async (id) => {
  const user = await db("users")
    .leftJoin('posts', 'users.id', 'posts.user_id')
    .select("users.id", "users.username")
    .count("posts.id AS posts_count")
    .where('users.id', id)
    .first();

  // If the provided id does not match to a user, SQL will still give us
  // one row back because we included the COUNT.
  return user.id ? user : undefined;
};

//----------------------------------------------------------------------------//
// findPosts()
//----------------------------------------------------------------------------//
// Good example of using joins in knex.
//----------------------------------------------------------------------------//
const findPosts = (id) => {
  return db("users")
    .join("posts", "users.id", "posts.user_id")
    .select("posts.id", "posts.contents", "users.username")
    .where("users.id", id);
};

//----------------------------------------------------------------------------//
// add()
//----------------------------------------------------------------------------//
// Create a new user.
//----------------------------------------------------------------------------//
const add = async (data) => {
  const [id] = await db("users").insert(data);

  return findById(id);
};

//----------------------------------------------------------------------------//
// update()
//----------------------------------------------------------------------------//
// Update an existing user.
//----------------------------------------------------------------------------//
const update = async (id, data) => {
  await db("users").where({ id }).update(data);

  return findById(id);
};

//----------------------------------------------------------------------------//
// remove()
//----------------------------------------------------------------------------//
// Delete a user.
//----------------------------------------------------------------------------//
const remove = async (id) => {
  const deletedUser = await findById(id);

  await db("users").where({ id }).del();

  return deletedUser;
};

module.exports = {
  find,
  findById,
  findPosts,
  add,
  update,
  remove,
}