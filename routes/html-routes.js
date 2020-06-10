// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const fs = require("fs");

// Requiring our custom middleware for checking if a user is logged in
// const isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the front page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/createAccount", (req, res) => {
    if(req.user) {
      res.redirect("/");
    }
    else {
      res.sendFile(path.join(__dirname, "../public/createAccount.html"));
    }
  });

  app.get("/shopping", (req, res) => {
    if(!req.user) {
      res.redirect("/login");
    }
    else {
      res.render("shopping");
    }
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
