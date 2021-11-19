const express = require("express");
const router = express.Router();
// const db = require("../../data/db-config");

// waiting for a reply about both errorhandlers showing up in the console.


// Middleware
// const { checkCarId,
//     checkCarPayload } = require('./cars-middleware')

// Models
const User = require('../../api/users/user-model')
// getAll


// works but errors may be weird.
// grabs all SQL/Knex data 
router.get("/", (req, res, next) => {
  User.getAll()
    .then(users => {
      res.status(200).json(users);
      // throw new Error("Something went wrong"); // just checking the catch
    })
    .catch(next);
});


// // async version*
// router.get("/:id", async (req, res, next) => {
//   User.findById(req.params.id)
//   try {
//     const user = await User.findById(req.params.id)
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   } 
// });


// Find by ID. 
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        console.log('------> ', user)
        res.status(200).json(user);
      } else next()
    })
    .catch(next);
});




















// router.post("/", (req, res) => {
//   const userData = req.body;

//   db("users")
//     .insert(userData, "id")
//     .then(ids => {
//       res.status(201).json({ created: ids[0] });
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to create new user" });
//     });
// });

// // select
// //     p.id as post_id,    -- rename
// //     p.contents,         -- selecting
// //     u.username as user  -- renameing
// // from posts as p         -- selecting and renaming
// // left join users as u on u.id = p.user_id -- renaming and joining
// // where u.id = 3;         -- filtering
// // -- Output is all of Seneca's quotes with the is and user renamed.



// router.get("/:id/posts", async (req, res, next) => {
//   try {


//   } catch (err) {
//     // res.status(500).json({ message: "Failed to get posts" });
//     next(err)
//   }
// });




// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   db("users")
//     .where({ id })
//     .update(changes)
//     .then(count => {
//       if (count) {
//         res.json({ update: count });
//       } else {
//         res.status(404).json({ message: "Could not find user with given id" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to update user" });
//     });
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   db("users")
//     .where({ id })
//     .del()
//     .then(count => {
//       if (count) {
//         res.json({ removed: count });
//       } else {
//         res.status(404).json({ message: "Could not find user with given id" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to delete user" });
//     });
// });

module.exports = router;
