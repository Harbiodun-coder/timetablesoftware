const express = require('express');
const userSchema = require('../models/user.schema');
const checkIfUserExists = require('../middlewares/checkIfUserExists');
const authRouter = express.Router()
const { v4: uuidv4 } = require('uuid');

const app = express();
//Post Method

authRouter.post('/login', checkIfUserExists, async (req, res) => {
	console.log(res.user)
	if (res.user) {
		res.json(res.user)
	} else {
		res.status(401).json({
			error: "UnAuthorized"
		})
	}
})
//Get all Method
authRouter.post('/signup', checkIfUserExists, (req, res) => {
	console.log(res.user)
	if (!res.user) {
		const user = userSchema.create({ userId: uuidv4(), ...req.body })
		res.json(user)
	} else {

		res.status(409).json({
			error: { status: 409, msg: "user with that email already exists" }
		})
	}
})
module.exports = app.use('/auth', authRouter);
