const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // return all users without 'password' field, strip unnecessary data with lean
  const users = await User.find().select("-password").lean();

  // if users.length is 0 or users is undefined return status 400
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  // return all users
  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, firstname, lastname, accountBalance } = req.body;

  // Confirm data
  if (!username || !password || !firstname || !lastname) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // check for duplicate usernames
  const duplicate = await User.findOne({ username }).lean().exec();

  // if duplicate return status 409
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  // Create userObject
  const userObject = {
    username,
    password: hashedPwd,
    firstname,
    lastname,
    accountBalance,
  };

  // Create and store new user
  const user = await User.create(userObject);

  // Check if successful
  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data recieved" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { username, password, id, firstname, lastname, accountBalance } =
    req.body;

  // Confirm data
  if (!id || !username) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // find user by id
  const user = await User.findById(id).exec();

  // if user doesn't exist return status 400
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  // if duplicate that is not the current user exists return status 409
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Update username
  user.username = username;

  // Update firstname
  if (firstname) {
    user.firstname = firstname;
  }

  // Update lastname
  if (lastname) {
    user.lastname = lastname;
  }

  // Update accountBalance
  if (accountBalance) {
    user.accountBalance = accountBalance;
  }

  // Hash and update password
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route Delete /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
