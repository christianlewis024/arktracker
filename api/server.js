const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

// const itemsRouter = require("../items/items-router.js");
// const dinosRouter = require("../dinos/dinos-router.js");
const authRouter = require("../auth/authRouter");

const server = express();

const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60, // one hour in milliseconds
    secure: process.env.SECURE_COOKIE || false, // send the cookie only over https, true in production
    httpOnly: true, // true means client JS cannot access the cookie
  },
  resave: false,
  saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
  name: "monster",
  secret: process.env.COOKIE_SECRET || "keepitsecret,keepitsafe!",
};

// create a session and send a cookie back (the cookie will store the session id)
server.use(session(sessionConfig)); // turn on sessions for the API

server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use("/api/items", itemsRouter);
// server.use("/api/dinos", dinosRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "Server is up and running. This is the root url." });
});

module.exports = server;
