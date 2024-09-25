const User = require("../models/user.schema");

const checkIfUserExists = async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (user) res.user = (user);
	next();

}

module.exports = checkIfUserExists
