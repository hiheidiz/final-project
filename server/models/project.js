const mongoose = require("mongoose");

//define a story schema for the database
const ProjSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  other: String,
});

// compile model from schema
module.exports = mongoose.model("project", ProjSchema);
