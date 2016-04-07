$(document).ready(function() {
  console.log("app.js is loaded");
  $form = $("#user_profile_form");
  data = $form.serializeArray();
  $form.on("submit", function(e) {
    console.log("form button clicked");
    e.preventDefault();
    $.ajax({
      method: "POST",
      data: data,
      url: "/api/users",
      success: addUserSuccess,
      error: addUserError
    });
  });






$('#newEventButton').on('click', function(e) {
    console.log('new event clicked!');
    $('#eventModal').modal();
});




// End of Document Ready
});

function addUserSuccess (json){
  console.log("added User",json);
}
function addUserError (err){
  console.log("add User error");
}
