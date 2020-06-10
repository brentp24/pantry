///////////////////
/// SHOPPING.JS ///
///////////////////

// Grabbing the user's shoppingList data

var shoppingListObj;

$(document).ready(function() {
    console.log("Reached shopping list page");
    $.get("/api/shopping_list_data").then(function(data) {

        // Check the web console to see the logged results!
        console.log(data);

        // Any handlebars data rendering should be added right below:

    });
});
