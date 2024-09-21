const User = require("../models/userModel");
const bcrypt = require("bcrypt");
console.log(User); // This should not log 'undefined'
const asyncHandler = require("express-async-handler");

//@desc Register user
//@route POST /users/create
//@access public later will be private then authentication
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(404).json({ message: "No users found, want to add one?" });
  }
  res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  console.log("User ID:", user._id.toString());
  //console.log("Request User ID:", req.user._id.toString());
  res.json(user);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body); // Log the request body as an object

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: `User created with ID: ${user._id}` });
});

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  if (!user._id.toString()) {
    res.status(401).json({ message: "User not authorized to update" });
  } else {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ message: `User updated with ID: ${updatedUser._id}` });
  }
};


const loggedUser = async (req, res) => {
  const user = await User.findOne({email});
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  if(user && bcrypt.compare(password, user.password)){
    const accessToken = jwt.sign(
      { name:user.name, email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {expiresIn: process.env.ACCESS_TOKEN_LIFE}
    );
    res.status(200).json({accessToken: accessToken});
    res.json({ message: `Welcome, ${user.name}` });
  } else{
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = {
  updateUser,
  registerUser,
  getUser,
  getUsers,
  loggedUser,
};
