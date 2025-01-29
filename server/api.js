/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server. 
|
*/

const express = require("express");

// Import models
const Project = require("./models/project");
const User = require("./models/user");
const auth = require("./auth");

// API endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
});

// Get a specific project by ID
router.get("/project/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project" });
  }
});

// Create a new project
router.post("/project", auth.ensureLoggedIn, async (req, res) => {
  try {
    const newProject = new Project({
      creator_id: req.user._id,
      creator_name: req.user.name,
      title: req.body.title,
      content: req.body.content || "", // Ensure content is initialized
    });

    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (error) {
    res.status(500).json({ error: "Error creating project" });
  }
});

// Update an existing project (edit content)
router.post("/project/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    // Append new content to the existing content, adding a newline
    project.content = project.content + "\n" + req.body.content;

    const updatedProject = await project.save(); // Save the updated project

    res.send(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


// Get user by ID
router.get("/user", async (req, res) => {
  try {
    const user = await User.findById(req.query.userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Authentication routes
router.post("/login", auth.login);
router.post("/logout", auth.logout);

// Get currently logged-in user
router.get("/whoami", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({});
  }
});


const multer = require("multer");
const path = require("path");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
  },
});

// Initialize multer upload with file filter to only accept MP3s
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(new Error("Only MP3 files are allowed"), false);
    }
  },
});

// POST route to upload an audio file
router.post("/upload-audio", upload.single("audio"), async (req, res) => {
  if (req.file) {
    const audioUrl = `/uploads/${req.file.filename}`; // Path to the uploaded file
    res.send({ audioUrl });
  } else {
    res.status(400).send({ message: "Failed to upload audio" });
  }
});


// Handle unknown API routes
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).json({ msg: "API route not found" });
});

module.exports = router;
