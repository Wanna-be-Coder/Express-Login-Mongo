const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

router.route("/").post(
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password must be more then 5 digits").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    if (!validationResult(req)) {
      return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: "User Already exsist" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get("jwtSecret"), {}, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
