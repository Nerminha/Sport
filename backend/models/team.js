// import mongoose module
const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
  name: String,
  foundation: String,
  stadium: String,
  owner: String,
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    }
  ],
});
//affect teamSchema to team Model Name
const team = mongoose.model("Team", teamSchema);
//export team
module.exports = team;
