const express = require("express");
const User = require('./user-model');

const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;

  User.findPosts(id)
    .then(posts => res.json(posts))
    .catch(err => {
      res.status(500).json({ message: "Failed to fetch posts" });
    });    
});

router.post("/", (req, res) => {
  const userData = req.body;

  User.add(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  User.update(id, changes)
    .then(user => {
      if (user) {
        res.json(user);
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

  User.remove(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
