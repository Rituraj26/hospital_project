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

	var noMatch = null;
	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Medical.find({title: regex}, function(err, medical){
			if(err){
				console.log(err);
			} else {
				if(medical.length < 1) {
					noMatch = "No campgrounds match that query, please try again.";
				}
				res.render("medical/query", {medical: medical, noMatch: noMatch});
			}
		});

	} else {
		
		Medical.find({}, (err, medical) => {
			if(err) {
				console.log(err);
			} else {
				res.render('medical/query', {medical: medical, noMatch: noMatch});
			}
		});
	}
});

// Upload Routes

router.get('/upload', ensureAuthenticated, (req, res) => {
	res.render('medical/upload');
});

router.post('/upload', ensureAuthenticated, (req, res) => {
	// let errors = [];

	// if(!req.body.title) {
	// 	errors.push({text: 'Please add a title'});
	// }

	// if(!req.body.firstname) {
	// 	errors.push({text: 'Please add the firstname'});
	// }

	// if(!req.body.lastname) {
	// 	errors.push({text: 'Please add the lastname'});
	// }

	// if(errors.length > 0) {
	// 	res.render('/upload', {
	// 		errors: errors,
	// 		title: req.body.title,
	// 		author: {
	// 			firstname: req.body.firstname,
	// 			lastname: req.body.lastname
	// 		}
			
	// 	});
	// } else {
	// 	const newUser = {
	// 		title: req.body.title,
	// 		author: {
	// 			firstname: req.body.firstname,
	// 			lastname: req.body.lastname
	// 		},
	// 		user: {
	// 			id: req.user._id,
	// 			username: req.user.username
	// 		}
	// 	}
	// 	new Medical(req.body.medical)
	// 		.save()
	// 		.then(medical => {
	// 			req.flash('success__msg', 'New data added');
	// 			res.redirect('/query');
	// 		});
		
	// }
	Medical.create(req.body.medical, (err, medical) => {
		if(err) {
			req.flash('error_msg', err.message);
			return res.redirect('back');
		}
		req.flash('success__msg', 'New data added');
		res.redirect('/query');
	});
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;