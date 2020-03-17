const validator = require("validator");
const _ = require("lodash");
const User = require("../../models/User");

module.exports.validateCreateUser = async (req, res, next) => {
	let errors = {};

	const email = _.get(req, "body.email", "");
	const password = _.get(req, "body.password", "");
	const confirmPassword = _.get(req, "body.password2", "");

	if (validator.isEmpty(email)) {
		errors.email = "Email is required";
	} else {
		const user = await User.findOne({ email });
		if (user) errors.email = "Email already exists";
		else if (!validator.isEmail(email)) errors.email = "Email is invalid";
	}

	if (validator.isEmpty(password)) {
		errors.password = "Password is required";
	} else if (!validator.isLength(password, { min: 8 })) {
		errors.password = "Password must have at least 8 characters";
	}

	if (validator.isEmpty(confirmPassword)) errors.confirmPassword = "Confirm password is required";
	else if (!_.isEqual(password, confirmPassword)) errors.confirmPassword = "Password must match";

	const isValid = _.isEmpty(errors);
	if (isValid) return next();
	res.status(400).json(errors);
};
