// import mongoose module
const mongoose = require("mongoose");
//player schema
const playerSchema = mongoose.Schema({
  age: Number,
  number: Number,
  name: String,
  position: String,
  tId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});
//affect PlayerSchema to Player Model Name
const player = mongoose.model("Player", playerSchema);
//export Player
module.exports = player;