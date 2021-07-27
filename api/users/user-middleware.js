const User = require('./user-model');

const validateUserBody = (req, res, next) => {
  const userData = req.body;

  if (!userData || !userData.username) {
    res.status(400).json({ message: 'username is required' });
  } else {
    next();
  }
}

const validateUserExists = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => {
      if (user) {
        req.user = user;

        next();
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
}

module.exports = {
  validateUserBody,
  validateUserExists,
}