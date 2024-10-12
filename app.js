require("dotenv").config();
const express = require("express");
const path = require("node:path");

// Routers
const indexRouter = require('./routes/indexRouter')
const newRouter = require('./routes/newRouter');
const userRouter = require('./routes/userRouter');

const app = express();
const assetsPath = path.join(__dirname, "public");

app.use(express.urlencoded({extended:true}));
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/new', newRouter);
app.use('/user', userRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`My first express app - listening on port ${PORT}!`))