const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../users/usersModel.js");
const { isValid } = require("../users/users-service.js");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash the password
    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then((user) => {
        req.session.loggedIn === true;

        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "ERROR:400 - Please provide a username and password",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcrypt.compare(password, user.password)) {
          // we can save information about the client inside the session (req.session)
          req.session.loggedIn = true;
          req.session.user = user;
          const token = createToken(user);

          res.status(200).json({
            message: "You have successfully logged in to Ark Tracker",
            token,
            user_id: `${user.id}`,
          });
        } else {
          res
            .status(401)
            .json({ message: "ERROR:400 - Invalid log in credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "ERROR:400 - please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({
          message: "ERROR:500 - could not be logged out server error",
        });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(204).end();
  }
});
function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
