const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require('../models/User');
const User = mongoose.model('users');

router.get('/query', (req, res) => {
	res.render('medical/query');
});

router.get('/upload', (req, res) => {
	res.render('medical/upload');
});

module.exports = router;