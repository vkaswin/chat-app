const { Router } = require("express");
const {
  getContact,
  createContact,
  deleteContact,
} = require("../controllers/contact");
const { verifyToken } = require("../middleware");

const router = Router();

router.use(verifyToken);

router.route("/").get(getContact).post(createContact).delete(deleteContact);

module.exports = router;
