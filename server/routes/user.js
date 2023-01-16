const { Router } = require("express");
const {
  login,
  register,
  getUserById,
  getAllUsers,
  searchUsers,
} = require("../controllers/user");
const { verifyToken } = require("../middleware");

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.use(verifyToken);

router.get("/detail/:userId", getUserById);

router.get("/all", getAllUsers);

router.get("/list", searchUsers);

module.exports = router;
