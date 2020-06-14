// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/rps", (req, res) => {
    res.render("rps");
  });

  app.get("/expiring", (req, res) => {
    res.render("expiring");
  });


  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.get("/createAccount", (req, res) => {
    res.render("createAccount");
  });
  app.get("/homepage", (req, res) => {
    res.render("homepage");
  });



  app.get("/recipe", (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      // parse it so that it is an array
      const recipes = JSON.parse(data);
      res.render("recipe", {
        rps: recipes
      });
    });
  });

  app.get("/appetizers", (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      // parse it so that it is an array
      const recipes = JSON.parse(data);
      res.render("appetizers", {
        title: "My recipes!",
        rps: recipes
      });
    });
  });

  app.get("/sidedish", (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      // parse it so that it is an array
      const recipes = JSON.parse(data);
      res.render("sidedish", {
        title: "My recipes!",
        rps: recipes
      });
    });
  });

  app.get("/maincourse", (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      // parse it so that it is an array
      const recipes = JSON.parse(data);
      res.render("maincourse", {
        title: "My recipes!",
        rps: recipes
      });
    });
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the front page
    if (req.user) {
      res.redirect("/homepage");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


  app.get("/shopping", (req, res) => {
    if (!req.user) {
      res.redirect("/login");
    } else {
      // console.log("Checking user access at html route:");
      // console.log("User ID = ", req.user.id);

      db.ShoppingList.findAll({
        where: {
          userID: req.user.id
        }
      }).then(userShoppingList => {
        // console.log(req.user.firstName, "'s shopping list:");
        // console.log(userShoppingList);
        res.render("shopping", {
          start: true,
          userShoppingList: userShoppingList.map(userShoppingList =>
            userShoppingList.toJSON()
          )
        });
      });
    }
  });
  
  app.get("/pantree", (req, res) => {
    if (!req.user) {
      res.redirect("/login");
    } else {
      // console.log("Checking user access at html route:");
      // console.log("User ID = ", req.user.id);

      db.Pantry.findAll({
        where: {
          userID: req.user.id
        }
      }).then(userPantree => {
        // console.log(req.user.firstName, "'s pantree:");
        // console.log(userPantree);
        res.render("pantree", {
          start: true,
          userPantree: userPantree.map(userPantree => userPantree.toJSON())
        });

      });
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

  app.get("/addrecipes", (req, res) => {
    res.render("addrecipes");
  });

  // Serve index.handlebars to the root route.
  app.get("/myrecipes", (req, res) => {
    db.Recipe.findAll({}).then(myRecipes => {
      res.render("myrecipes", {
        myRecipes: myRecipes.map(myRecipes => myRecipes.toJSON())
      });
    });
  });

  // Show the user the individual recipe and the form to update the recipe.
  app.get("/myrecipes/:id", (req, res) => {
    db.Recipe.findAll({
      id: req.params.id
    }).then(myRecipes => {
      res.render("myrecipe", {
        myRecipes: myRecipes.map(myRecipes => myRecipes.toJSON())
      });
    });
  });
};
