const express = require('express');
const router = express();
const mongoose = require('mongoose');;
const bookmark = mongoose.model("Bookmark")
const bodyParser = require("body-parser");

const authenticateToken = require('../middleware/validtoken')

router.use(authenticateToken)
router.use(bodyParser.json());

router.get("/bookmark", (req, res) => {
    const { userId } = req.query;
    bookmark.find({ user: userId })
        .then((result) => {
            return res.send(result)
        })
        .catch((err) => {
            return res.status(400).send({ error: "failed to fetch" })
            console.log(err)
        })
})

router.post("/bookmark/save", (req, res) => {
    const body = req.body;
    console.log({
        title: body.title,
        url: body.url,
        tags: body.tags,
        user: req.user._id
    })


    const newBookmark = new bookmark({
        title: body.title,
        url: body.url,
        tags: body.tags,
        user: req.user._id
    })

    try {
        newBookmark.save()
            .then((result) => {
                res.status(201).send(result)
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (err) {
        res.status(400).send({ error: "failed to save" })
    }


})

module.exports = router;