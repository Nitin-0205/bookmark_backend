require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var cors = require('cors');
app.use(cors());

//change db name to bookmark
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected To DataBase");
    })
    .catch((err) => {
        console.log("Coudn't Connect to database", err);
    }
    )



require('./models/users');
require('./models/bookmark');

const authrouter = require('./routes/authRoute');
const bookmarkrouter = require('./routes/bookmarkRoute');

app.use(bodyParser.json());

app.use(authrouter);
app.use(bookmarkrouter);

app.get("/", (req, res) => {
    console.log("ROOT")
})


app.listen(port, () => {
    console.log(`server Connected Sucessfully  on Port ${port}!!!`)
})


