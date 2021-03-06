const express = require("express");

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.all("/", (req, res) => {
  spoonacular.all(data => {
    const hbsObject = {
      spoonacular: data
    };

    res.render("index", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
