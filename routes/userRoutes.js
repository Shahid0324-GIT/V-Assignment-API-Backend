const express = require("express");
const { registerUser, allUsers } = require("../controllers/userController");
const router = express.Router();

router.route("/").post(registerUser).get(allUsers);
module.exports = router;
