const Project = require("../../../models/Projects");

module.exports.getAllProjects = (req, res, next) => {
	Project.find()
		.then(projects => res.status(200).json(projects))
		.catch(error => res.status(500).json({ message: error }));
};

module.exports.getOneProject = (req, res, next) => {
	const { id } = req.params;
	Project.findOne({ id })
		.then(project => res.status(200).json(project))
		.catch(error => res.status(500).json({ message: error }));
};

module.exports.uploadImg = (req, res, next) => {
	return res.status(200).json({ imgUrl: req.file.location });
};

module.exports.addNewProject = async (req, res, next) => {
	const { imgUrl, name, sourceCode, link } = req.body;
	const newProject = new Project({
		name,
		imgUrl,
		sourceCode,
		link
	});
	const project = await newProject.save();
	return res.status(201).json({ project });
};
