const express = require("express");

const router = express.Router();

const spoonacular = require("../models/spoonacular.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  spoonacular.all(data => {
    const hbsObject = {
      spoonacular: data
    };

    res.render("index", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
