const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const genSaltPromise = promisify(bcrypt.genSalt);
const hashPromise = promisify(bcrypt.hash);

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	userType: {
		type: String,
		default: "client"
	}
});

UserSchema.pre("save", function(next) {
	const user = this;
	if (!user.isModified("password")) return next();
	genSaltPromise(10)
		.then(salt => hashPromise(user.password, salt))
		.then(hash => {
			user.password = hash;
			next();
		})
		.catch(error => {
			throw Error(error);
		});
});

module.exports = mongoose.model("User", UserSchema);
