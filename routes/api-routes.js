// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {
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
      res.json(userShoppingList);
    });
  });

  // app.get("/api/recipes", (req, res) => {
  //   res.json(recipeData);
  // });


  // GET route for getting all of the recipes
  app.get("/api/myrecipes/", (req, res) => {
    db.Recipe.findAll({}).then(recipePost => {
      res.json(recipePost);
    });
  });
  // Get route for retrieving a single post
  app.get("/api/myrecipes/:id", (req, res) => {
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(recipePost => {
      // res.json(recipePost);
      res.render("myrecipes", recipePost.data);
    });
  });

  // POST route for saving a new Recipe

  app.post("/api/myrecipes", (req, res) => {
    console.log("Recipes being created!")
    db.Recipe.create({
      authorName: req.body.authorName,
      recipeName: req.body.recipeName,
      ingredientsName: req.body.ingredientsName,
      instructionsName: req.body.instructionsName
    }).then(recipePost => {
      res.json(recipePost);
    });
  });

  // delete a recipe from the database
  app.delete("/api/myrecipes/:id", (req, res) => {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(recipePost => {
      res.json(recipePost);
    });
  });
  //PUT route for updating Recipe Posts - followed activity example for blog posts
  app.put("/api/myrecipes/:id", (req, res) => {
    db.Recipe.update(
      req.body,

      {
        where: {
          id: req.body.id
        }
      }
    ).then(recipePost => {
      res.json(recipePost);
    });
  });

  // Get route for returning product search results on shopping list page
  app.get("/search_product_shopping", (req, res) => {
    let searchedProduct = req.query.product;
    // Capitalizing the first letter of a searched product
    searchedProduct =
      searchedProduct.charAt(0).toUpperCase() + searchedProduct.slice(1);

    db.Item.findAll({
      where: {
        itemName: {
          [Op.like]: "%" + searchedProduct + "%"
        }
      }
    }).then(products => {
      if (Object.keys(products).length < 1) {
        console.log("Item not found.");
        db.ShoppingList.findAll({
          where: {
            userID: req.user.id
          }
        }).then(userShoppingList => {
          res.render("shopping", {
            start: false,
            status: false,
            userShoppingList: userShoppingList.map(userShoppingList => userShoppingList.toJSON()
            )
          });
        });
      } else {
        db.ShoppingList.findAll({
          where: {
            userID: req.user.id
          }
        }).then(userShoppingList => {
          res.render("shopping", {
            start: false,
            status: true,
            userShoppingList: userShoppingList.map(userShoppingList => userShoppingList.toJSON()
            ),
            productsFound: products.map(products => products.toJSON())
          });
        });
      }
    });

    app.get("/add_to_shopping_list", (req, res) => {
      const productsSelected = req.query;

      if (Object.keys(productsSelected).length < 1) {
        console.log("No items selected");
        return;
      }

      console.log("==============");
      for (var i = 0; i < Object.keys(productsSelected).length; i++) {
        db.Item.findAll({
          where: {
            id: Object.values(productsSelected)[i]
          }
        }).then(itemFound => {
          const item = {
            itemFound: itemFound.map(itemFound => itemFound.toJSON())
          };

          db.ShoppingList.create({
            itemName: item.itemFound[0].itemName,
            itemID: item.itemFound[0].id,
            category: item.itemFound[0].category,
            clipartURL: item.itemFound[0].clipartURL,
            userID: req.user.id
          }).then(() => {
            console.log("Added at index ", Object.values(productsSelected)[i]);
            res.redirect("/shopping");
          });
        });
      }
    });

    app.get("/shopping_list_to_pantree", (req, res) => {
      const productsSelected = req.query;

      if (Object.keys(productsSelected).length < 1) {
        console.log("No items selected");
        return;
      }

      for (let i = 0; i < Object.keys(productsSelected).length; i++) {
        db.ShoppingList.findAll({
          where: {
            id: Object.values(productsSelected)[i] // ADDED i
          }
        }).then(itemToMove => {
          const item = {
            itemToMove: itemToMove.map(itemToMove => itemToMove.toJSON())
          };

          db.Item.findAll({
            where: {
              id: item.itemToMove[0].itemID
            }
          }).then(itemMatch => {
            const item = {
              itemMatch: itemMatch.map(itemMatch => itemMatch.toJSON())
            };

            db.Pantry.create({
              itemName: item.itemMatch[0].itemName,
              itemID: item.itemMatch[0].id,
              category: item.itemMatch[0].category,
              expirationDate: "01/01/2021", // Just temporarily set to fixed date
              clipartURL: item.itemMatch[0].clipartURL,
              userID: req.user.id
            });
          });
        });
      }
      res.redirect("/shopping");
    });

    // Get route for returning product search results on pantree page
    app.get("/search_product_pantree", (req, res) => {
      let searchedProduct = req.query.product;
      // Capitalizing the first letter of a searched product
      searchedProduct =
        searchedProduct.charAt(0).toUpperCase() + searchedProduct.slice(1);

      db.Item.findAll({
        where: {
          itemName: {
            [Op.like]: "%" + searchedProduct + "%"
          }
        }
      }).then(products => {
        if (Object.keys(products).length < 1) {
          db.Pantry.findAll({
            where: {
              userID: req.user.id
            }
          }).then(userPantree => {
            res.render("pantree", {
              start: false,
              status: false,
              userPantree: userPantree.map(userPantree => userPantree.toJSON())
            });
          });
        } else {
          db.Pantry.findAll({
            where: {
              userID: req.user.id
            }
          }).then(userPantree => {
            res.render("pantree", {
              start: false,
              status: true,
              userPantree: userPantree.map(userPantree => userPantree.toJSON()),
              productsFound: products.map(products => products.toJSON())
            });
          });
        }
      });
    });

    // Add items from search to the pantry
    app.get("/add_to_pantree", (req, res) => {
      const productsSelected = req.query;

      if (Object.keys(productsSelected).length < 1) {
        console.log("No items selected");
        return;
      }

      for (let i = 0; i < Object.keys(productsSelected).length; i++) {
        db.Item.findAll({
          where: {
            id: Object.values(productsSelected)[i]
          }
        }).then(itemFound => {
          const item = {
            itemFound: itemFound.map(itemFound => itemFound.toJSON())
          };

          db.Pantry.create({
            itemName: item.itemFound[0].itemName,
            itemID: item.itemFound[0].id,
            category: item.itemFound[0].category,
            expirationDate: "01/01/2021", // Temporary value
            clipartURL: item.itemFound[0].clipartURL,
            userID: req.user.id
          }).then(() => {
            db.Pantry.findAll({
              where: {
                userID: req.user.id
              }
            }).then(userPantree => {
              res.redirect("/pantree");
            });
          });
        });
      }
    });

    // Make recipe search from the pantree
    app.get("/pantree_recipe_search", (req, res) => {
      const productsSelected = req.query;
      console.log(req.query);
      console.log("length = ", Object.keys(productsSelected).length);

      if (Object.keys(productsSelected).length < 1) {
        console.log("No items selected");
        return;
      }

      console.log("========");
      console.log(Object.keys(productsSelected));
      console.log("========");

      res.redirect("/pantree");
    });


    // app.get("/searchNewRecipes", (req, res) => { // CHANGE TO POST

    //   console.log("Params from body");
    //   console.log(req.body.ranking);
    //   console.log(req.user.id);
    //   console.log(req.body.type);
    //   console.log(req.body.diet);
    //   console.log(req.body.cuisine);
    //   console.log(req.body.number);

    //   // db.RecipeSearch.create({
    //   //   authorName: req.body.authorName,
    //   //   recipeName: req.body.recipeName,
    //   //   ingredientsName: req.body.ingredientsName,
    //   //   instructionsName: req.body.instructionsName
    //   // }).then(recipePost => {
    //   //   res.json(recipePost);
    //   // });

    //   // res.redirect("/recipe");
    // });

    // POST route for saving a new Recipe - hw example
    app.get("/searchRecipes", (req, res) => {
      console.log("Params from body");
      console.log(req.body.ranking);
      console.log(req.user.id);
      console.log(req.body.type);
      console.log(req.body.diet);
      console.log(req.body.cuisine);
      console.log(req.body.number);
      db.RecipeSearch.create({
        selectionCriteria: req.body.ranking,
        userID: req.user.id,
        mealType: req.body.type,
        dietType: req.body.diet,
        cuisineType: req.body.cuisine,
        numberResults: req.body.number
      }).then(recipePost => {
        // res.json(recipePost);
        res.sendStatus(200);
      });
    });

  });
};
