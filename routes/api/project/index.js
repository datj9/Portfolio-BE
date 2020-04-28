const express = require("express");
const router = express.Router();
const projectController = require("./controller");
const { authenticate, authorize } = require("../../../middleware/auth");
const { uploadImage } = require('../../../middleware/upload')

router.get("/", projectController.getAllProjects);
router.post("/", authenticate, authorize(["admin"]), projectController.addNewProject);

router.post(
	"/upload",
	authenticate,
	authorize(["admin"]),
	uploadImage("projectImage"),
	projectController.uploadImg
);

module.exports = router;
