const config = require("../config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtVerify = promisify(jwt.verify);

module.exports.authenticate = (req, res, next) => {
	const token = req.header("token");
	if (!token) return res.status(500).json({ message: "You must provide token" });
	jwtVerify(token, config.secretKey)
		.then(decoded => {
			if (decoded) {
				req.user = decoded;
				return next();
			}
			return res.status(500).json({ message: "Token is invalid" });
		})
		.catch(err => res.status(500).json(err));
};

module.exports.authorize = userTypeArray => (req, res, next) => {
	const { userType } = req.user;
	const index = userTypeArray.findIndex(e => e === userType);
	if (index > -1) return next();

	return res.status(403).json({ message: "You are not allowed to access" });
};
