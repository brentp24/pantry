const newIngredient = $("input#aligned-foo2.ingredient");
const newQuantity = $("input#aligned-foo0.quantity");
const newUnit = $("input#aligned-foo1.unit");
const newForm = $("<form></form>");
const addMore = $("#newIngredient");
const addInst = $("#newInstructions");
const submitBtn = $("#submitRecipe");

$(document).ready(() => {
  //once everything is ready
  addMore.click("submit", event => {
    event.preventDefault();
    const ingredient = newIngredient.val(); //target text area class
    const quantity = newQuantity.val();
    const unit = newUnit.val();
    console.log(quantity, unit, ingredient); //have this render to the page,get forms to reset
  });
});

addInst.click("submit", event => {
  event.preventDefault();
  console.log("hello");
});

submitBtn.click("submit", event => {
  event.preventDefault();
  console.log("hello moto");
});
