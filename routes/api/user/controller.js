const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { promisify } = require("util");
const config = require("../../../config");
const User = require("../../../models/User");
const comparePassword = promisify(bcrypt.compare);
const jwtSign = promisify(jwt.sign);

const createToken = user => {
	const payload = _.pick(user, ["_id", "email", "userType"]);
	return jwtSign(payload, config.secretKey, { expiresIn: "12h" });
};
module.exports.createUser = (req, res, next) => {
	const { email, password } = req.body;
	const newUser = new User({
		email,
		password
	});
	newUser
		.save()
		.then(user => createToken(user))
		.then(token => res.status(201).json({ token }))
		.catch(error => res.status(500).json({ message: error }));
};

module.exports.signin = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return res.status(500).json({ message: "Email does not exist" });
	const isMatch = await comparePassword(password, user.password);
	if (!isMatch) return res.status(500).json({ message: "Wrong password" });
	const token = await createToken(user);
	const userRes = _.pick(user, ["_id", "email", "userType"]);
	return res.status(200).json({ token, user: userRes });
};
