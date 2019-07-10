const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MedicalSchema = new Schema({
	// title: {
	// 	type: String,
	// 	required: true
	// },
	// author: {
	// 	firstname: {
	// 		type: String,
	// 		required: true
	// 	},
	// 	lastname: {
	// 		type: String,
	// 		require: true
	// 	}
	// },
	// user: {
	// 	id: {
	// 	   type: mongoose.Schema.Types.ObjectId,
	// 	   ref: "User"
	// 	},
	// 	username: String
	// 	}

	definition: {
		type: String,
		required: true
	},
	keyword: {
		type: String,
		requried: true
	},
	source: {
		type: String,
		requried: true
	},
	organisation: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	journal: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	patient_code: {
		type: String,
		required: true
	},
	patient_sex: {
		type: String,
		required: true
	},
	patient_age: {
		type: String,
		required: true
	},
	cd4_count: {
		type: String,
		required: true
	},
	sample_city: {
		type: String,
		required: true
	},
	sample_tissue: {
		type: String,
		required: true
	},
	risk_factor: {
		type: String,
		required: true
	},
	patient_health_status: {
		type: String,
		required: true
	},
	amplification_strategy: {
		type: String,
		required: true
	},
	drug_naive: {
		type: String,
		required: true
	},
	patient_comment: {
		type: String,
		required: true
	},
	institute_name: {
		type: String,
		required: true
	},
	institute_area: {
		type: String,
		required: true
	},
	institute_city: {
		type: String,
		required: true
	}

	// definition: String,
	// keyword: String,
	// source: String,
	// organisation: String,
	// author: String,
	// journal: String,
	// comment: String,
	// patient_code: String,
	// patient_sex: String,
	// patient_age: String,
	// cd4_count: String,
	// sample_city: String,
	// sample_tissue: String,
	// risk_factor: String,
	// patient_health_status: String,
	// amplification_strategy: String,
	// drug_naive: String,
	// patient_comment: String,
	// institute_name: String,
	// institute_area: String,
	// institute_city: String
});

mongoose.model('medicals', MedicalSchema);