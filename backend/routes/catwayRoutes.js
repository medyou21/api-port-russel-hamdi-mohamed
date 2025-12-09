const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getCatways, getCatwayById, createCatway, updateCatway, deleteCatway } = require("../controllers/catwayController");
const router = express.Router();

router.use(protect);

router.route("/").get(getCatways).post(createCatway);
router.route("/:id").get(getCatwayById).put(updateCatway).delete(deleteCatway);

module.exports = router;
