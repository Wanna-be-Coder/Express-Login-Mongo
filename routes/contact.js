const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => res.send("Get Contact"))
  .post((req, res) => res.send("Insert Contact"));

router
  .route("/:id")
  .get((req, res) => res.send("Get Single Contact"))
  .post((req, res) => res.send("Post Single Contact"))
  .put((req, res) => res.send("Edit Contact"))
  .delete((req, res) => res.send("Delete Contact"));

module.exports = router;
