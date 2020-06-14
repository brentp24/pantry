///////////////////
/// SHOPPING.JS ///
///////////////////

// Grabbing the user's shoppingList data

let shoppingListObj;

$(document).ready(() => {
  console.log("Reached shopping list page");
  $.get("/api/shopping_list_data").then(data => {
    // Check the web console to see the logged results!
    console.log(data);

    // Any handlebars data rendering should be added right below:
  });
});
