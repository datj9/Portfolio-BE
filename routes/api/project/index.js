const express = require("express");
const router = express.Router();
const projectController = require("./controller");
const { authenticate, authorize } = require("../../../middleware/auth");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const BUCKET_NAME = "portfolio-dn";
const ID = "AKIAISIE5TPSIPG2IUXA";
const SECRET = "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";

const s3 = new aws.S3({
	accessKeyId: ID,
	secretAccessKey: SECRET
});

const upload = multer({
	storage: multerS3({
		s3,
		bucket: BUCKET_NAME,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: `${file.originalname}` });
		},
		key: function (req, file, cb) {
			cb(null, `${Date.now().toString()} - ${file.originalname}`);
		},
		acl: "public-read"
	})
});

router.get("/", projectController.getAllProjects);
router.post("/", authenticate, authorize(["admin"]), projectController.addNewProject);

router.post(
	"/upload",
	authenticate,
	authorize(["admin"]),
	upload.single("projectImage"),
	projectController.uploadImg
);

module.exports = router;
