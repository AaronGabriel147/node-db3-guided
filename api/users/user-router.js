const express = require("express");

const { validateUserBody, validateUserExists } = require('./user-middleware');
// The knex reference that used to be here (through db-config) is replaced by a
// reference to our data model object: user-model.
const User = require('./user-model.js');

const router = express.Router();

//----------------------------------------------------------------------------//
// Each of these middleware route handlers have been refactored to use our
// model db functions from user-model.js.
//
// This helps us keep our source files single-purpose, simplifying testing and
// troubleshooting, etc.
//
// The name "model" is really just a reference to the role of that "layer or
// logic" in the design - it's where our database methods are.
//
// This follows the typical MVC pattern. You can read about it here:
// https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
//
//----------------------------------------------------------------------------//
router.get('/', (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => next(err));
});

router.get('/:id', validateUserExists, (req, res) => {
  res.json(req.user);
});

router.get('/:id/posts', validateUserExists, (req, res, next) => {
  const { id } = req.params;

  User.findPosts(id)
    .then(posts => res.json(posts))
    .catch(err => next(err));
})

router.post('/', validateUserBody, (req, res, next) => {
  const { username } = req.body;

  User.add({ username })
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
});

router.put('/:id', validateUserBody, validateUserExists, (req, res, next) => {
  const { id } = req.params;
  const { username } = req.body;

  User.update(id, { username })
    .then(user => res.json(user))
    .catch(err => next(err));
});

router.delete('/:id', validateUserExists, (req, res, next) => {
  const { id } = req.params;

  User.remove(id)
    .then(user => res.json(user))
    .catch(err => next(err));
});

module.exports = router;
