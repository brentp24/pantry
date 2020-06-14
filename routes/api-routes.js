// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  // Signing up for a new account
  app.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's info (sans password)
      res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      });
    }
  });

  // Get route for returning a user's shopping list
  app.get("/api/shopping_list_data", (req, res) => {
    db.ShoppingList.findAll({
      where: {
        userID: req.user.id
      }
    }).then(userShoppingList => {
      console.log(req.user.firstName, "'s shopping list:");
      res.json(userShoppingList);
    });
  });

  app.get("/api/recipes", (req, res) => {
    res.json(recipeData);
  });

  app.post("/api/myrecipes", (req, res) => {
    db.Recipe.create({
      authorName: req.body.authorName,
      recipeName: req.body.recipeName,
      ingredientsName: req.body.ingredientsName,
      instructionsName: req.body.instructionsName
    })
      .then(() => {
        res.redirect("/myrecipes");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.delete("/api/myrecipes/:id", (req, res) => {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.redirect("/myrecipes");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  // Update a recipe by an id and then redirect to the root route.
  app.put("/api/myrecipes/:id", (req, res) => {
    db.Recipe.update(
      { authorName: req.body.authorName },
      { recipeName: req.body.recipeName },
      { where: req.params.id }
    )
      .then(() => {
        res.redirect("/myrecipes");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
};
