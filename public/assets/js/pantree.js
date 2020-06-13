const select = document.getElementById("selectCuisine");
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
  const cEl = document.createElement("a");
  cEl.textContent = cOpt;
  cEl.value = cOpt;
  cEl.className = "navbar-item";
  select.appendChild(cEl);
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
  const tEl = document.createElement("a");
  tEl.textContent = tOpt;
  tEl.value = tOpt;
  tEl.className = "navbar-item";
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
  const dEl = document.createElement("a");
  dEl.textContent = dOpt;
  dEl.value = dOpt;
  dEl.className = "navbar-item";
  selectDiet.appendChild(dEl);
}
