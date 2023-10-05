// import express module
const express = require('express');
// import match Model
const Match = require("../models/match");
const router=express.Router();
// Business Logic service matches
// Business Logic : Get All Matches
router.get("/", (req, res) => {
    console.log("Here into BL: Get All matches");
    Match.find().then((docs) => {
        res.json({ matches: docs });
    });
});

// Business Logic : Get Match By ID
router.get("/:id", (req, res) => {
    console.log("Here into BL : Get Match By ID");
    let id = req.params.id;
    Match.findOne({ _id: id }).then((doc) => {
        res.json({ match: doc });
    });
});

// Business Logic : Delete Match By ID
router.delete("/:id", (req, res) => {
    console.log("Here into BL: Delete Match By ID");
    let id = req.params.id;
    Match.deleteOne({ _id: id }).then((deleteResponse) => {
        deleteResponse.deletedCount ?
            res.json({ isDeleted: true }) :
            res.json({ isDeleted: false });
    });
});

// Business Logic : Add Match
router.post("/", (req, res) => {
    console.log("Here into BL: Add Match", req.body);
    let match = new Match(req.body);
    match.save();
    res.json({ isAdded: true });
});

// Business Logic : Update Match
router.put("/", (req, res) => {
    console.log("Here into BL: Update Match", req.body);
    Match.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
        console.log("Here response after update", updateResponse);
        updateResponse.nModified ?
            res.json({ isUpdated: true }) :
            res.json({ isUpdated: false });
    });
});
module.exports=router;