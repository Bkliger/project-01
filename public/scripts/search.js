$(document).ready(function() {
    console.log("search.js is loaded");
    $form = $("#search_form");
    $("#date-picker").datepicker({});


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

    // Select an event to edit and display modal dialog box.
    $('#events').on('click', '.edit-event', function(event) {
      var $eventRow = $(event.target).closest('.event');
      var event_id = $eventRow.attr("data-event-id");
        //use the show function in eventsController to get one event
      $.ajax({
          method: "GET",
          url: '/api/events/' + event_id,
          success: handleEditEvent,
          error: editEventError
        });
    });








//End of document ready
});

function renderEvent(event) {
    var eventHtml = event_template(event);
    $("#events").prepend(eventHtml);
}

// ISODate(json.date) === $("#date-picker").val()&&
// json._host.city === $("#query_city").val()
function findEventsSuccess(json) {
  json.forEach(function(json) {
    console.log("json date:", json.date,"query date:", $("#date-picker").val(), "json city:", json._host.city,"query city:", $("#query_city").val());
    if (json._host.city === $("#query_city").val()) {
      renderEvent(json);
    }
  });
}

function findEventsError(err) {
    console.log("couldn't find any events");
}


function handleEditEvent(json) {
    $('#eventModal').modal();
    $("#view_date").text(json.date);
    $("#view_level").text(json.minimum_level);
    // $("#violin1").val(json.participant[0].requested_instrument);
    // $("#violin2").val(json.participant[1].requested_instrument);
    // $("#viola").val(json.participant[2].requested_instrument);
    // $("#cello").val(json.participant[3].requested_instrument);

}

function editEventError(err) {
    console.log("open edit event error");
}
