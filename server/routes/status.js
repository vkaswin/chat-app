const { Router } = require("express");
const { verifyToken } = require("../middleware");
const { createStatus, getAllStatus } = require("../controllers/status");
const router = Router();

router.use(verifyToken);

router.post("/create", createStatus);
router.get("/list", getAllStatus);

module.exports = router;
