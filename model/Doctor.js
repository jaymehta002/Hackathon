const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
	fullName: String,
	hospitalName: String,
	phone: Number,
	email: String,
	password: String,
	token: { type: String },
},
{
	timestamps: true
});

module.exports = mongoose.model("Doctor", doctorSchema);