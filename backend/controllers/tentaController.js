const Tenta = require("../models/Tenta.js");
const asyncHandler = require("express-async-handler");

// @desc Get all tentor
// @route GET /tentor
// @access Private
const getAllTentor = asyncHandler(async (req, res) => {
    // get all tentor
    const tentor = await Tenta.find().select().lean();

    // check whether tentor was found
    if (!tentor?.length) {
        return res.status(400).json({ message: "No tentor found" });
    }

    res.json(tentor);
});

// @desc Create new tenta
// @route POST /tentor
// @access Private
const createNewTenta = asyncHandler(async (req, res) => {
    const { coursename, date } = req.body;

    // Confirm data
    if (!coursename || !date) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Create tentaObject
      const tentaObject = {
        coursename,
        date
      };
    
    // Create and store new tenta
    const user = await Tenta.create(tentaObject);

    // Check if successful
     if (user) {
        res.status(201).json({ message: `New tenta for ${coursename} created` });
     } else {
        res.status(400).json({ message: "Invalid user data recieved" });
    }

});

// @desc Update a tenta
// @route PATCH /tentor
// @access Private
const updateTenta = asyncHandler(async (req, res) => {

});

// @desc Delete a tenta
// @route Delete /tentor
// @access Private
const deleteTenta = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Tenta-ID required" });
  }

  const tenta = await Tenta.findById(id).exec();

  if (!tenta) {
    return res.status(400).json({ message: "Tenta not found" });
  }

  const result = await tenta.deleteOne();

  const reply = `Tenta for ${result.coursename} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
    getAllTentor,
    createNewTenta,
    updateTenta,
    deleteTenta
};
