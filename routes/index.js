const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require('../models/User');
const User = mongoose.model('users');

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/about', (req, res) => {
	res.render('about');
});

router.get('/contact', (req, res) => {
	res.render('contact');
});

module.exports = router;