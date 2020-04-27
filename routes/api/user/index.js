const express = require("express");
const router = express.Router();
const { validateCreateUser } = require("../../../middleware/validation/user");
const userController = require("./controller");

router.get("/signup", validateCreateUser, userController.createUser);
router.get("/signin", userController.signin);

module.exports = router;
