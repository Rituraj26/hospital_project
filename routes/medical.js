const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const {ensureAuthenticated} = require('../helpers/auth');

//create modelDB

require('../models/User');
const User = mongoose.model('users');

require('../models/Medical');
const Medical = mongoose.model('medicals');

// Query Routes

router.get('/query', ensureAuthenticated, (req, res) => {
	if(req.query.search) {

	} else {
		Medical.find({}, (err, medical) => {
			if(err) {
				console.log(err);
			} else {
				res.render('medical/query', {medical: medical});
			}
		});
	}
});

// Upload Routes

router.get('/upload', ensureAuthenticated, (req, res) => {
	res.render('medical/upload');
});

router.post('/upload', ensureAuthenticated, (req, res) => {
	let errors = [];

	if(!req.body.title) {
		errors.push({text: 'Please add a title'});
	}

	if(!req.body.firstname) {
		errors.push({text: 'Please add the firstname'});
	}

	if(!req.body.lastname) {
		errors.push({text: 'Please add the lastname'});
	}

	if(errors.length > 0) {
		res.render('/upload', {
			errors: errors,
			title: req.body.title,
			author: {
				firstname: req.body.firstname,
				lastname: req.body.lastname
			}
		});
	} else {
		const newUser = {
			title: req.body.title,
			author: {
				firstname: req.body.firstname,
				lastname: req.body.lastname
			},
			user: {
				id: req.user._id,
				username: req.user.username
			}
		}
		new Medical(newUser)
			.save()
			.then(medical => {
				req.flash('success__msg', 'New data added');
				res.redirect('/query');
			});
	}
});

// More Info Routes

router.get('/query/:id', ensureAuthenticated, (req, res) => {
	Medical.findById(req.params.id, (err, details) => {
		if(err) {
			console.log(err);
		} else {
			res.render('medical/show', {details: details});
		}
	});
});

module.exports = router;