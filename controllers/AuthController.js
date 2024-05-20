const BanaoUsers = require("../models/BanaoUsers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await BanaoUsers.create({ username, email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await BanaoUsers.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await BanaoUsers.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, resetToken });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const resetToken = req.params.resetToken;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await BanaoUsers.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    user.password = password;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid token or token expired" });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
      await BanaoUsers.deleteMany({});
      res.status(200).json({ success: true, message: 'All users deleted' });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};