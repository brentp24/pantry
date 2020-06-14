const selectCuisine = document.getElementById("selectCuisine");
const cuisineOptions = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese"
];

for (let i = 0; i < cuisineOptions.length; i++) {
  const cOpt = cuisineOptions[i];
  const cEl = document.createElement("option");
  cEl.textContent = cOpt;
  cEl.value = cOpt;
  selectCuisine.appendChild(cEl);
}

const selectType = document.getElementById("selectType");
const typeOptions = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink"
];

for (let i = 0; i < typeOptions.length; i++) {
  const tOpt = typeOptions[i];
  const tEl = document.createElement("option");
  tEl.textContent = tOpt;
  tEl.value = tOpt;
  selectType.appendChild(tEl);
}

const selectDiet = document.getElementById("selectDiet");
const dietOptions = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto-vegetarian",
  "ovo-vegetarian",
  "vegan",
  "pescetarian",
  "paleo",
  "primal",
  "whole30"
];

for (let i = 0; i < dietOptions.length; i++) {
  const dOpt = dietOptions[i];
  const dEl = document.createElement("option");
  dEl.textContent = dOpt;
  dEl.value = dOpt;
  selectDiet.appendChild(dEl);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("recipeSearch").addEventListener("click", () => {
    generateRequestObject();
    getRecipes();
    //validation code to see State field is mandatory.
  });
});

// eslint-disable-next-line no-unused-vars
function generateRequestObject(requestObject) {
  requestObject = {
    apikey: "527c6d48a93a43bf8f435bcfd7846114",
    ingredients: "cheese,flour,apples,milk,carrots",
    limitLicense: true,
    cuisine: selectCuisine.value,
    number: document.getElementById("resultsNumber").value,
    ranking: document.getElementById("selectCriteria").value,
    ignorePantry: true,
    type: selectType.value,
    diet: selectDiet.value
  };
  return requestObject;
}

function getRecipes() {
  console.log(requestObject);
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
    console.log(recipeData);
  });
}
