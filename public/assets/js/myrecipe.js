// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(() => {
  $(".delrecipe").on("click", function() {
    const id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/myrecipes/" + id, {
      type: "DELETE"
    }).then(() => {
      console.log("deleted id ", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
  // create a new author and recipe name
  $(".create-form").on("submit", event => {
    event.preventDefault();
    const newRecipe = {
      authorName: $("#auth")
        .val()
        .trim(),
      recipeName: $("#rec")
        .val()
        .trim(),
      ingredientsName: $("#ing")
        .val()
        .trim(),
      instructionsName: $("#ins")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/api/myrecipes/", {
      type: "POST",
      data: newRecipe
    }).then(() => {
      console.log("created new recipe");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".update-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("updateform is running");
    const updatedRecipe = {
      authorName: $("#auth")
        .val()
        .trim(),
      recipeName: $("#rec")
        .val()
        .trim(),
      ingredientsName: $("#ing")
        .val()
        .trim(),
      instructionsName: $("#ins")
        .val()
        .trim()
    };

    const id = $(this).data("id");

    // Send the POST request.
    console.log(updatedRecipe);
    console.log(id);
    $.ajax("/api/myrecipes/" + id, {
      type: "PUT",
      data: updatedRecipe
    }).then(() => {
      console.log("updated recipe");
      // Reload the page to get the updated list
      location.assign("/");
    });
  });

  $(".ingredients-submission").on("submit", event => {
    event.preventDefault();
    console.log("am i here");
  });
  $(".ingredients-submission").on("submit", event => {
    event.preventDefault();
    console.log("am i here");
  });
});
