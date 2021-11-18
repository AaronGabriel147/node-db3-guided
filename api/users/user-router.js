const express = require("express");
const router = express.Router();

const db = require("../../data/db-config");


// Middleware
// const { checkCarId,
//     checkCarPayload } = require('./cars-middleware')

// Models
const User = require('../../api/users/user-model')
// getAll



// grabs all SQL/Knex data 
router.get("/", (req, res, next) => {
  User.getAll()
    .then(users => {
      res.json(users);
      // throw new Error("Something went wrong"); // just checking the catch
    })
    .catch(next);
});


















router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .then(users => {
      const user = users[0]; // get first user
      if (user) {
        res.json(user);
      } else next();
    })
    .catch(next);
});

router.post("/", (req, res) => {
  const userData = req.body;

  db("users")
    .insert(userData, "id")
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

// select
//     p.id as post_id,    -- rename
//     p.contents,         -- selecting
//     u.username as user  -- renameing
// from posts as p         -- selecting and renaming
// left join users as u on u.id = p.user_id -- renaming and joining
// where u.id = 3;         -- filtering
// -- Output is all of Seneca's quotes with the is and user renamed.



router.get("/:id/posts", async (req, res, next) => {
  try {


  } catch (err) {
    // res.status(500).json({ message: "Failed to get posts" });
    next(err)
  }
});




router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
