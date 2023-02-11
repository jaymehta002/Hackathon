const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const passport = require('passport');

require("dotenv").config();
require("./config/database").connect();




const baseRoute = require('./routes/baseRoute');
const authRoute = require('./routes/authRoute')
const doctorRoute = require('./routes/doctorRoute');
const reportRoute = require('./routes/reportRoute');
const app = express();
app.use(express.json({ limit: "50mb" }));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use('/doctor',doctorRoute);
app.use(authRoute);
app.use(reportRoute);
app.use(baseRoute);

app.listen(3000, () =>{
	console.log(`Server is running at port 3000`);
});