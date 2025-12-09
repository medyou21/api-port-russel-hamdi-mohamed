const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserByEmail, createUser, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.use(protect);

router.route("/").get(getUsers).post(createUser);
router.route("/:email").get(getUserByEmail).put(updateUser).delete(deleteUser);

module.exports = router;
