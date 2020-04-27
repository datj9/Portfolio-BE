const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	sourceCodeUrl: {
		type: String,
		required: true
	},
	linkDemoUrl: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Project", ProjectSchema);
