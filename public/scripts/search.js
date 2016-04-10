$(document).ready(function() {
    console.log("search.js is loaded");
    $form = $("#search_form");

    //handlebars
    var source = $("#event_template").html();
    event_template = Handlebars.compile(source);
    //Update user profile data
    $form.on("submit", function(e) {
        e.preventDefault();
        data = $form.serializeArray();
        $.ajax({
            method: "GET",
            // data: $form.serializeArray(),
            url: "/api/events/",
            success: findEventsSuccess,
            error: findEventsError
        });
    });








});

function renderEvent(event) {
    var eventHtml = event_template(event);
    $("#events").prepend(eventHtml);
}

// json.date === $("#query_date").val()&&
// json._host.city === $("#query_city").val()
function findEventsSuccess(json) {
  json.forEach(function(json) {
    console.log("json date:", json.date,"query date:", $("#query_date").val()+"T08:00:00.000Z", "json city:", json._host.city,"query city:", $("#query_city").val());
    if (json._host.city === $("#query_city").val()) {
      renderEvent(json);
    }
  });
}

function findEventsError(err) {
    console.log("couldn't find any events");
}
