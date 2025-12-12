const router = require("express").Router();
const controller = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", auth, controller.getAllUsers);
router.get("/:email", auth, controller.getUser);
router.post("/", auth, controller.createUser);
router.put("/:email", auth, controller.updateUser);
router.delete("/:email", auth, controller.deleteUser);

module.exports = router;
