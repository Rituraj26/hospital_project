const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MedicalSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		firstname: {
			type: String,
			required: true
		},
		lastname: {
			type: String,
			require: true
		}
	},
	user: {
		id: {
		   type: mongoose.Schema.Types.ObjectId,
		   ref: "User"
		},
		username: String
		}
	});

mongoose.model('medicals', MedicalSchema);