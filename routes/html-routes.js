// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const fs = require("fs");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/shopping", (req, res) => {
    res.render("shopping");
  });

  app.get("/expiring", (req, res) => {
    res.render("expiring");
  });

  app.get("/recipe", (req, res) => {
    res.render("recipe");
  });

  app.get("/appetizers", (req, res) => {
    res.render("appetizers");
  });

  app.get("/sidedish", (req, res) => {
    res.render("sidedish");
  });
  app.get("/maincourse", (req, res) => {
    res.render("maincourse");
  });

  app.get("/recipes", (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      // parse it so that it is an array
      const recipes = JSON.parse(data);
      res.render("rps", {
        title: "My recipes!",
        rps: recipes
      });
    });
  });

  app.get("/recipe/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const recipe = recipes.find(x => x.id === id);

    res.render("recipe", {
      recipe
    });
  });
};
