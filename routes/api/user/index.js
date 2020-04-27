const express = require("express");
const router = express.Router();
const { validateCreateUser } = require("../../../middleware/validation/user");
const userController = require("./controller");

router.post("/signup", validateCreateUser, userController.createUser);
router.post("/signin", userController.signin);

module.exports = router;
