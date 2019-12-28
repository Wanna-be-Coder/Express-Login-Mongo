const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get Logged In user");
});

router.post("/", (req, res) => res.send("Login User user"));

module.exports = router;
