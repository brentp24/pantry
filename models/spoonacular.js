const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;

const $ = (jQuery = require("jquery")(window));

const apikey = "527c6d48a93a43bf8f435bcfd7846114";
const ingredients = "&query=cheese";
const cuisine = "&cuisine=italian";
const number = "&number=2";
function getRecipes() {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      apikey +
      ingredients +
      cuisine +
      number,

    method: "GET"
  })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

getRecipes();
