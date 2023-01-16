const { Router } = require("express");
const { verifyToken } = require("../middleware");
const { initiateCall, callHistory } = require("../controllers/call");
const router = Router();

router.use(verifyToken);

router.post("/initiate/:chatId", initiateCall);
router.get("/history", callHistory);

module.exports = router;
