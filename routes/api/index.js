const express = require("express");
const router = express.Router();

router.use("/projects", require("./project"));
router.use("/users", require("./user"));

module.exports = router;
