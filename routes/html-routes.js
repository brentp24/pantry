// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const recipes = [
  {
    id: 1,
    name: "Pasta",
    ingredients: ["noodles", "tomato sauce"]
  },
  {
    id: 2,
    name: "Steak",
    ingredients: ["steak", "salt", "pepper"]
  }
];

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
    res.render("recipes", {
      title: "My recipes!",
      recipes
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
