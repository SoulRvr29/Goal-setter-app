const asyncHandler = require("express-async-handler");

// @desc  Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ msg: "Get goals" });
});

// @desc  Set goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ msg: "Set goals" });
});

// @desc  Update goals
// @route PUT /api/goals
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Update goal ${req.params.id}` });
});

// @desc  Delete goals
// @route DELETE /api/goals
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
