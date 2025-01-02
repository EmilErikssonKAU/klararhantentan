const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({ message: 'No users found'});
    }
    res.json(users)
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password} = req.body;

    // Confirm data
    if(!username || !password){
        return res.status(400).json({ message: 'All fields are required'});
    }
    
    // check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec();
    
    if(duplicate){
        return res.status(409).json({ message: 'Duplicate username'});
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    const userObject = { username, "password": hashedPwd};

    // Create and store new user
    const user = await User.create(userObject);

    if(user){
        res.status(201).json({ message: `New user ${username} created`});
    } else {
        res.status(400).json({ message: 'Invalid user data recieved'});
    }

});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { username, password, id} = req.body;

    // Confirm data
    if(!id || !username){
        return res.status(400).json({ message: 'All fields are required'});
    }

    const user = await User.findById(id).exec();

    if(!user){
        return res.status(400).json({ message: 'User not found'});
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    // Allow updates to the original user
    if( duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({ message: 'Duplicate username'});
    }

    user.username = username;

    if(password){
        // Hash password
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated`});

});

// @desc Delete a user
// @route Delete /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if(!id){
        return res.status(400).json({ message: 'User ID required'});
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({ message: 'User not found'});
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);

});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};

