const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require('connect-flash');

const app = express();

// Load Routes
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");

// Passport config
require('./config/passport')(passport);

// DB config
const db = require("./config/database");

// Mongodb connection

mongoose.connect(db.mongoURI, {
	useNewUrlParser: true
})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// app.use(methodOverride("_method"));

// Express Session Middleware
app.use(expressSession({
    secret: "Medical secret key",
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash Middleware
app.use(flash());

// Global Variables

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// Use Routes

app.use('/', indexRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});