const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const validateToken = require("../middleware/authenticateToken");

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", validateToken, createPost);

router.put("/:id", validateToken, updatePost);

router.delete("/:id", deletePost);

module.exports = router;
