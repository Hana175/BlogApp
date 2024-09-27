const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  loggedUser,
} = require("../controllers/userController");

const validateToken = require("../middleware/authenticateToken");
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);

router.post("/register", registerUser);

router.post("/login", loggedUser);

module.exports = router;
