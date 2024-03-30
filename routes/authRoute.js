const express = require('express');
const router = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post("/signup", (req, res) => {
    const {
        username,
        email,
        password } = req.body;

    if (!email || !password) {
        res.status(422).send({ error: "invalid Credential" })
    } else {
        // res.status(200).send({error:"valid"})
        User.findOne({ email: email })
            .then(async (savedUser) => {
                if (savedUser) {
                    return res.send({ error: "User Already Exist !!!" })
                }
                var user = new User({
                    email,
                    username,
                    password
                });
                try {
                    await user.save();
                    console.log("after save")
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_secret_key);
                    res.send(token);
                } catch (err) {
                    console.log(err);
                    res.send({ error: "failed to save :" });
                }

            })
    }
})


router.post("/login", (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        console.log(email, password);
        return res.status(401).send({ err: "Invalid Cridential !!!" })
    }
    const user = new User({ email, password });
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(201).send({ err: "User Not Found !!!" })
            }
            try {
                if (password === savedUser.password) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_secret_key);
                    console.log(savedUser)
                    return res.status(200).send({
                        message: "SUCCESS",
                        username: savedUser.username,
                        email: savedUser.email,
                        id: savedUser._id,
                        token: token
                    })
                    // return res.status(200).send({token : token,userId:savedUser_id,msg: "Login Sucessful"});

                } else {
                    console.log("Password Doesn't Match");
                    return res.status(201).send({ error: "Invalid Credentials" });

                }

            } catch (er) {

            }

        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;