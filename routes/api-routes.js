// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Signing up for a new account
  app.post("/api/signup", function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
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
  app.get("/api/shopping_list_data", function (req, res) {
    db.ShoppingList.findAll({
      where: {
        userID: req.user.id
      }
    }
    ).then(function (userShoppingList) {
      // console.log(req.user.firstName, "'s shopping list:");
      res.json(userShoppingList);
    });
  });


  app.get("/api/recipes", (req, res) => {
    res.json(recipeData);
  });


  // Get route for returning product search results on shopping list page
  app.get("/search_product_shopping", function (req, res) {
    var searchedProduct = req.query.product;
    // Capitalizing the first letter of a searched product
    searchedProduct = searchedProduct.charAt(0).toUpperCase() + searchedProduct.slice(1)

    db.Item.findAll({
      where: {
        itemName: {
          [Op.like]: "%" + searchedProduct + "%"
        }
      }
    }).then(function (products) {
      // console.log({ products });
      // console.log(products);

      // var productsFound = { products };
      // console.log("==============");
      // var productObj = { products };
      // console.log(Object.keys(products).length);
      // console.log(products[0].dataValues.itemName);
      // console.log("==============");

      if (Object.keys(products).length < 1) {
        console.log("Item not found.");
        db.ShoppingList.findAll({
          where: {
            userID: req.user.id
          }
        }).then(function (userShoppingList) {
          // console.log(req.user.firstName, "'s shopping list:");
          res.render("shopping", {
            start: false,
            status: false,
            userShoppingList: userShoppingList.map(userShoppingList => userShoppingList.toJSON())
          });
        });

      }

      else {
        // var productsFound = {
        //   start: false,
        //   status: true,
        //   productsFound: products.map(products => products.toJSON())
        // }

        // res.render("shopping", productsFound);

        db.ShoppingList.findAll({
          where: {
            userID: req.user.id
          }
        }).then(function (userShoppingList) {
          // console.log(req.user.firstName, "'s shopping list:");
          res.render("shopping", {
            start: false,
            status: true,
            userShoppingList: userShoppingList.map(userShoppingList => userShoppingList.toJSON()),
            productsFound: products.map(products => products.toJSON())
          });
        });

      }
    });
  });


  app.get("/add_to_shopping_list", function (req, res) {
    // console.log("Testing checklist form!");
    // console.log(req.query);
    var productsSelected = req.query;
    // console.log("==============");
    // console.log(req.user.id);
    // console.log("==============");
    // console.log(Object.keys(productsSelected).length);

    if (Object.keys(productsSelected).length < 1) {
      console.log("No items selected");
      return;
    }

    console.log("==============");
    // console.log(Object.values(productsSelected)[0]);
    for (var i = 0; i < Object.keys(productsSelected).length; i++) {
      // console.log("Search at index ", Object.values(productsSelected)[i]);
      db.Item.findAll({
        where: {
          id: Object.values(productsSelected)[i]
        }
      }
      ).then(function (itemFound) {

        var item = {
          itemFound: itemFound.map(itemFound => itemFound.toJSON())
        }

        // console.log(item.itemFound);
        // console.log("id = ", item.itemFound[0].id);
        // console.log("itemName = ", item.itemFound[0].itemName);
        // console.log("category = ", item.itemFound[0].category);
        // console.log("clipartURL = ", item.itemFound[0].clipartURL);
        // console.log("userID = ", req.user.id);

        db.ShoppingList.create({
          itemName: item.itemFound[0].itemName,
          itemID: item.itemFound[0].id,
          category: item.itemFound[0].category,
          clipartURL: item.itemFound[0].clipartURL,
          userID: req.user.id
        }).then(function () {
          db.ShoppingList.findAll({
            where: {
              userID: req.user.id
            }
          }).then(function (userShoppingList) {
            // console.log(req.user.firstName, "'s shopping list:");
            res.render("shopping", {
              start: true,
              userShoppingList: userShoppingList.map(userShoppingList => userShoppingList.toJSON())
            });
          });
        });

      });
    }
    console.log("==============");


    // res.render("shopping", { start: true });

  });


  app.get("/shopping_list_to_pantree", function (req, res) {

    var productsSelected = req.query;
    // console.log(req.query);
    // console.log("length = ", Object.keys(productsSelected).length);

    if (Object.keys(productsSelected).length < 1) {
      console.log("No items selected");
      return;
    }

    for (var i = 0; i < Object.keys(productsSelected).length; i++) {

      db.ShoppingList.findAll({
        where: {
          id: Object.values(productsSelected)[i] // ADDED i
        }
      }).then(function (itemToMove) {

        var item = {
          itemToMove: itemToMove.map(itemToMove => itemToMove.toJSON())
        }

        // console.log(item);

        db.Item.findAll({
          where: {
            id: item.itemToMove[0].itemID
          }
        }).then(function (itemMatch) {

          var item = {
            itemMatch: itemMatch.map(itemMatch => itemMatch.toJSON())
          }

          db.Pantry.create({
            itemName: item.itemMatch[0].itemName,
            itemID: item.itemMatch[0].id,
            category: item.itemMatch[0].category,
            expirationDate: "01/01/2021", // Just temporarily set to fixed date
            clipartURL: item.itemMatch[0].clipartURL,
            userID: req.user.id
          }).then(function () {
            res.redirect("/shopping");
          });
        });
      });
    };
  });



  // Get route for returning product search results on pantree page
  app.get("/search_product_pantree", function (req, res) {
    var searchedProduct = req.query.product;
    // Capitalizing the first letter of a searched product
    searchedProduct = searchedProduct.charAt(0).toUpperCase() + searchedProduct.slice(1)

    db.Item.findAll({
      where: {
        itemName: {
          [Op.like]: "%" + searchedProduct + "%"
        }
      }
    }).then(function (products) {

      if (Object.keys(products).length < 1) {
        db.Pantry.findAll({
          where: {
            userID: req.user.id
          }
        }).then(function (userPantree) {
          res.render("pantree", {
            start: false,
            status: false,
            userPantree: userPantree.map(userPantree => userPantree.toJSON())
          });
        });
      }

      else {
        db.Pantry.findAll({
          where: {
            userID: req.user.id
          }
        }).then(function (userPantree) {
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
  app.get("/add_to_pantree", function (req, res) {

    var productsSelected = req.query;

    if (Object.keys(productsSelected).length < 1) {
      console.log("No items selected");
      return;
    }

    for (var i = 0; i < Object.keys(productsSelected).length; i++) {
      db.Item.findAll({
        where: {
          id: Object.values(productsSelected)[i]
        }
      }
      ).then(function (itemFound) {

        var item = {
          itemFound: itemFound.map(itemFound => itemFound.toJSON())
        }

        db.Pantry.create({
          itemName: item.itemFound[0].itemName,
          itemID: item.itemFound[0].id,
          category: item.itemFound[0].category,
          expirationDate: "01/01/2021",
          clipartURL: item.itemFound[0].clipartURL,
          userID: req.user.id
        }).then(function () {
          db.Pantry.findAll({
            where: {
              userID: req.user.id
            }
          }).then(function (userPantree) {
            res.render("pantree", {
              start: true,
              userPantree: userPantree.map(userPantree => userPantree.toJSON())
            });
          });
        });

      });
    };
  });



  // Make recipe search from the pantree
  app.get("/pantree_recipe_search", function (req, res) {

    var productsSelected = req.query;
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






};


