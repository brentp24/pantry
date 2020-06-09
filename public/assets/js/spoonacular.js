const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;

const $ = (jQuery = require("jquery")(window));

const apikey = "527c6d48a93a43bf8f435bcfd7846114";
const ingredients = "&ingredients=cheese,flour,apples";
const limitLicense = "&limitLicense=true";
const cuisine = "&cuisine=italian";
const number = "&number=5";
const ranking = "&ranking=1";
const ignorePantry = "&ignorePantry=true";

function getRecipes() {
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
  })
    .then(response => {
      const recipeData = response;
      createHTML(recipeData);
      //   console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

function createHTML(recipeData) {
  console.log("testing from our function");
  console.log(recipeData);
}

getRecipes();
