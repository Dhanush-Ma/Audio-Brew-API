const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { Users } = require("../models/User");

router.get("/", auth, async (req, res) => {
  res.status(200).json(req.user);
});

router.put("/", auth, async (req, res) => {
  if (req.body.flag == "genre") {
    const user = await Users.findByIdAndUpdate(req.user._id, {
      preferences: req.body.preferences,
      country: req.body.country,
      countryCode: req.body.countryCode,
    });
    await user.save();
  }
  
  if (req.body.flag == "artist") {
    const user = await Users.findByIdAndUpdate(req.user._id, {
      artistsPreferences: req.body.artistsPreferences,
    });
    await user.save();
  }
  res.status(200).json(req.user);
});

module.exports = router;
