const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectId: String,
  content: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
