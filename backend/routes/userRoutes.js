const express = require("express");
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser, createUser } = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:email", getUser);
router.post("/", createUser);
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);

module.exports = router;
