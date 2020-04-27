const Project = require("../../../models/Projects");

module.exports.getAllProjects = (req, res, next) => {
	Project.find()
		.then(projects => res.status(200).json(projects))
		.catch(error => res.status(500).json({ message: error }));
};

module.exports.getOneProject = (req, res, next) => {
	const { id } = req.params;
	Project.findById(id)
		.then(project => res.status(200).json(project))
		.catch(error => res.status(500).json({ message: error }));
};

module.exports.uploadImg = (req, res, next) => {
	return res.status(200).json({ imageUrl: req.file.location });
};

module.exports.addNewProject = async (req, res, next) => {
	const { imageUrl, name, sourceCodeUrl, linkDemoUrl } = req.body;
	const newProject = new Project({
		name,
		imageUrl,
		sourceCodeUrl,
		linkDemoUrl
	});
	const project = await newProject.save();
	return res.status(201).json({ project });
};
