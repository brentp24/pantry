const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;
const $ = (jQuery = require("jquery")(window));
const fs = require("fs");
requestObject = {
  apikey: "527c6d48a93a43bf8f435bcfd7846114",
  ingredients: "cheese,flour,apples",
  limitLicense: true,
  cuisine: "italian",
  number: 5,
  ranking: 1,
  ignorePantry: true
};

module.exports = function getRecipes(
  apikey,
  ingredients,
  limitLicense,
  cuisine,
  number,
  ranking,
  ignorePantry
) {
  apikey = requestObject.apikey;
  ingredients = "&ingredients=" + requestObject.ingredients;
  limitLicense = "&limitLicense=" + requestObject.limitLicense;
  cuisine = "&cuisine=" + requestObject.cuisine;
  number = "&number=" + requestObject.number;
  ranking = "&ranking=" + requestObject.ranking;
  ignorePantry = "&ignorePantry=" + requestObject.ignorePantry;

  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
      apikey +
      ingredients +
      cuisine +
      ranking +
      limitLicense +
      ignorePantry +
      number,
    method: "GET"
  }).then(response => {
    recipeData = response;
    fs.writeFile(
      __dirname + "../../../../db/db.json",
      JSON.stringify(recipeData),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
};

