$(document).ready(() => {
  $("#recipeSearch").on("click", () => {
    postRequest();
  });
});

const selectCuisine = $("#selectCuisine");
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
  selectCuisine.append(cEl);
}

const selectType = $("#selectType");
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
  selectType.append(tEl);
}

const selectDiet = $("#selectDiet");
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
  selectDiet.append(dEl);
}
const resultsNumber = document.getElementById("resultsNumber");
const resultsRanking = document.getElementById("selectCriteria");

function postRequest() {
  requestObject = {
    apikey: "527c6d48a93a43bf8f435bcfd7846114",
    ingredients: "cheese,flour,apples,milk,carrots",
    limitLicense: true,
    cuisine: selectCuisine.value,
    number: resultsNumber.value,
    ranking: resultsRanking.value,
    ignorePantry: true,
    type: selectType.value,
    diet: selectDiet.value
  };

  console.log(requestObject);
}
