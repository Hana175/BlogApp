const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    res.status(404).json({ message: "No posts found, want to add one?" });
  }
  res.json(posts);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById("id");
  if (!post) {
    res
      .status(404)
      .json({ message: "Post not found, want to search for another one?" });
  }
  // res.json(`GET post by ${id}`);
});

const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const post = await Post.create({
    title,
    body,
    user_id: req.user._id,
  });
  //res.json("CREATE post");
});

const updatePost = asyncHandler(async (req, res) => {
  const post = Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }
  if (!post._id.toString()) {
    res.status(401).json({ message: "User not authorized to update" });
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // res.json(`EDIT/UPDATE post by ${id}`);
});

const deletePost = asyncHandler(async (req, res) => {
  const deletedPost = Post.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }

  res.json(`Post ${id} has been deleted.`);
});

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
