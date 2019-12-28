const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

router
  .route("/")
  .post(
    [
      check("email", "Enter a valid email").isEmail(),
      check("password", "Password must be more then 5 digits").exists()
    ],
    async (req, res) => {
      if (!validationResult(req)) {
        return res.status(400).json({ errors: validationResult(req).array() });
      }
      const { name, email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ err: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ err: "Wrong Password Credentials" });
        }

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
