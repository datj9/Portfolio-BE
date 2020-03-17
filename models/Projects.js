const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	imgUrl: {
		type: String,
		required: true
	},
	sourceCode: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Project", ProjectSchema);
