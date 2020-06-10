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

  // app.get("/", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     return res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  // app.get("/login", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     return res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });

  // // Here we've add our isAuthenticated middleware to this route.
  // // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });
};
