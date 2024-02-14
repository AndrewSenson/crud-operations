const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("../backend/database/database")

const app = express();

const port = process.env.PORT || 3001;

connectDb().then( () => {app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})
});
