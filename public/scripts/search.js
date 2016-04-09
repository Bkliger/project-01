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
console.log(data)
        $.ajax({
            method: "GET",
            data: $form.serializeArray(),
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


function findEventsSuccess(json) {
    console.log(json)
    json.forEach(function(event) {
        renderEvent(event);
    });
}

function findEventsError(err) {
    console.log("couldn't find any events");
}
