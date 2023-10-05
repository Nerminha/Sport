// import express module
const express = require('express');
// import body-parser module
const bodyParser = require('body-parser');
// import mongoose module
const mongoose = require('mongoose');
//iport bcrypt module
const bcrypt = require('bcrypt');
//import jsonwebtoken module
const jwt = require('jsonwebtoken');
//import express-session module
const session = require('express-session');
//import multer module
const multer = require('multer');
// import path module (interne)
const path = require('path')
// import axios
const axios = require('axios')
// connect app to DB
mongoose.connect("mongodb://127.0.0.1:27017/la7thaDB");
// create express application
const app = express();
// import weather
const weatherRouter=require("./routes/weather-router");
// import weather
const matchesRouter=require("./routes/matches-router");
// Configuration
//send json response
app.use(bodyParser.json());
//get object from req
app.use(bodyParser.urlencoded({ extended: true }));
// config files
app.use('/avatars', express.static(path.join('backend/images')));
// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});
//Session Configuration
const secretKey = 'croco23';
app.use(
    session({
        secret: secretKey,
    }));
// Security(To filter files)
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
// Multer confi : FileName and Destination
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        //cb:: callback
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
// Models Importation
// const Match = require("./models/match");
const Player = require("./models/player");
const Team = require("./models/team");
const User = require("./models/user");

// Business Logic : Update player
app.put("/api/players", (req, res) => {
    Player.updateOne({ _id: req.body._id }, req.body).then((updateResult) => {
        updateResult.nModified
            ? res.json({ PlayerIsUpdated: true })
            : res.json({ PlayerIsUpdated: false });
    });
});

// Business Logic : Add Player
app.post("/api/players", (req, res) => {
    try {
        Team.findById(req.body.tId).then((team) => {
            if (!team) {
                return res.json({ message: "Team not found" });
            }
            const player = new Player({
                name: req.body.name,
                number: req.body.number,
                position: req.body.position,
                age: req.body.age,
                tId: team._id,
            });
            player.save((err, doc) => {
                team.players.push(player);
                team.save();
                res.json({ message: " Player is Saved" });
            });
        });
    } catch (error) {
        res.json({ message: `Catched error :  ${error}` })
    }


});
//Business Logic service team
// Business Logic : Add Team
app.post("/teams", (req, res) => {
    console.log("Here into BL: Add Team", req.body);
    let team = new Team(req.body);
    team.save((err, doc) => {
        if (err) {
            res.json({ isAdded: false });
        }
        else {
            res.json({ isAdded: true });
        }
    });

});
//// Business Logic : get all teams
app.get("/teams", (req, res) => {
    console.log("Here into BL ");
    Team.find().then((docs) => {
        res.json({ team: docs });
    });
});
app.get("/api/players/teams/:id", (req, res) => {
    console.log("here into BL : Get All Players By Team Id", req.params.id);
    // find team by ID
    Team.findById(req.params.id)
        //find all players in this team
        .populate("players")
        // team is not found
        .then((team) => {
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            res.json({ teamPlayers: team.players });
        });
});
// Business Logic : Login
//Response 0 => Check Your Email 
//Response 1 => Check Your Pwd 
//Response 2 => welcome 

app.post("/users/login", (req, res) => {
    console.log("Here into BL: login", req.body);
    let user;
    // search User by email
    User.findOne({ email: req.body.email }).then((doc) => {
        // user email is not found
        if (!doc) {
            //send response1 : Check Your Pwd
            res.json({ msg: "0" })
        }
        else {
            user = doc;
            // compare Crypted pwd with Req.body.pwd
            return bcrypt.compare(req.body.pwd, doc.pwd);
        }
    })
        // Get the result of bcrypt.compare
        .then((pwdResult) => {
            console.log("here pw result", pwdResult);
            // Pwd and Cryoted Pwd are not equals
            if (!pwdResult) {
                //send response2 : Check Your Pwd
                res.json({ msg: "1" })
            } else {
                //send response3 : Welcome

                let userToSend = {
                    fName: user.firstName,
                    lName: user.lastName,
                    id: user._id,
                    role: user.role
                }
                const token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' });
                res.json({
                    msg: "2",
                    token: token,
                });
            }
        });
});
//  Business Logic service users
// Business Logic: Signup
app.post("/users/signup", multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log("Here into BL: Signup", req.body);
    User.findOne({ email: req.body.email }).then((doc) => {

        bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
            req.body.pwd = cryptedPwd;
            req.body.avatar = `http://localhost:3000/avatars/${req.file.filename}`;
            let user = new User(req.body);
            user.save((err, doc) => {
                if (err) {
                    if (err.errors.email) {
                        res.json({ msg: 0 })
                    }
                }
                else {
                    res.json({ msg: 1 });
                }


            }
            );

        })
    })
});
// Business Logic:Get all users
app.get("/users", (req, res) => {
    console.log("Here into BL: Get All matches");
    User.find().then((docs) => {
        res.json({ users: docs });
    });
});
// Business Logic: IMC
app.post("/imc", (req, res) => {
    console.log("Here into BL : IMC", req.body);
    let imc = req.body.weight / (req.body.height * req.body.height * 0.0001);
    let msg;
    if (imc < 16.5) {
        msg = "Maigreur extreme";
    } else if (imc >= 16.5 && imc < 18.5) {
        msg = "Maigreur";
    } else if (imc >= 18.5 && imc < 25) {
        msg = "Normale";
    } else {
        msg = "Obésité";
    }
    res.json({ msg: msg, imc: imc });
});

app.use("/weather",weatherRouter);
app.use("/matches",matchesRouter);
// make app importable from another files
module.exports = app;