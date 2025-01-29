/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server. 
|
*/

const express = require("express");

// import models so we can interact with the database
const Project = require("./models/project");
const User = require("./models/user");
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/projects", (req, res) => {
  // empty selector means get all documents
  Project.find({}).then((projects) => res.send(projects));
});

router.post("/project", (req, res) => {
  const newProject = new Project({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newProject.save().then((project) => res.send(project));
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});


router.post("/login", auth.login);
router.post("/logout", auth.logout);

router.get("/whoami", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    // user is not logged in
    res.send({});
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
Project.deleteMany({})
