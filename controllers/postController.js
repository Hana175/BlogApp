const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    res.status(404).json({ message: "No posts found, want to add one?" });
  }
  res.json(posts);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res
      .status(404)
      .json({ message: "Post not found, want to search for another one?" });
  }
  res.status(200).json(`Post ${post}`);
});

const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  // Log req.user to verify it's being populated correctly
  console.log(req.user);

  if (!title || !body) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // Ensure req.user._id exists
  if (!req.user || !req.user._id) {
    res.status(401);
    throw new Error("Not authorized, user ID missing");
  }

  // Create the post
  const post = await Post.create({
    title,
    body,
    user_id: req.user._id,
    // Link post to user
  });

  res
    .status(201)
    .json({ message: `Post created by user ${req.user.name}`, post });
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }
  // if (post.user_id.toString() !== req.user._id) {
  //   res.status(401).json({ message: "User not authorized to update" });
  // }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    message: `Post updated by user ${req.user.name}`,
    updatedPost,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  if (!deletedPost) {
    res.status(404).json({ message: "Post not found" });
  }

  res.json(`Post ${deletedPost} has been deleted.`);
});

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
