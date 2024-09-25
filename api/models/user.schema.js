
const mongoose = require('mongoose');
const user = new mongoose.Schema({
	email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
	userId: { type: String, required: true },
	name: { required: true, type: String },
	dept: String,
	gender: String,
	role: String,
	office: String,
	joinedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', user)
