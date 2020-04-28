const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { bucketName, accessKeyId, secretAccessKey } = require('../config')

const s3 = new aws.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: `${file.originalname}` });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()} - ${file.originalname}`);
        },
        acl: "public-read"
    })
});

const uploadImage = type => {
    return upload.single(type)
}

module.exports = {
    uploadImage
}