const express = require('express');
const router = express();
const mongoose = require('mongoose');;
const bookmark = mongoose.model("Bookmark")
const bodyParser = require("body-parser");

const authenticateToken = require('../middleware/validtoken')

router.use(authenticateToken)
router.use(bodyParser.json());

router.get("/catagory/name", (req, res) => {
    const { userId } = req.query;
    bookmark.find({ user: new mongoose.Types.ObjectId(userId) })
        .then((result) => {
            //find the distinct catagory field from the result not tags
            const catagory = result.map(item => item.category);
            let distinctNames = [...new Set(catagory)];
            return res.send(distinctNames)
        })
        .catch((err) => {
            return res.status(400).send({ error: "failed to fetch" })
        })
})


router.get("/bookmark", (req, res) => {
    const { userId } = req.query;
    bookmark.find({ user: new mongoose.Types.ObjectId('66087837757dbba513ad9f24') })
        .then((result) => {
            console.log(result)
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
        user: req.user._id,
        category: body.category
    })


    const newBookmark = new bookmark({
        title: body.title,
        url: body.url,
        tags: body.tags,
        user: req.user._id,
        category: body.category
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