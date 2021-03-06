$(document).ready(() => {
  // Checking for the data of the currently logged in account
  $.get("/api/user_data").then(data => {
    // For when there isn't a logged in account
    if (!data.firstName) {
      $(".nav_text").text("Pantree");
      $(".logout_btn").hide();
    } else {
      $(".nav_text").text(`Welcome, ${data.firstName}!`);
      $(".login_btn").hide();
      $(".create_acc_btn").hide();
    }
  });
});
