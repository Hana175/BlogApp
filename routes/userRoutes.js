const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  loggedUser
} = require("../controllers/userController");

const validateToken = require("../middleware/authenticateToken");

router.use(validateToken);

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", registerUser);

router.put("/:id", updateUser);

router.post("/login", validateToken, loggedUser);

module.exports = router;
