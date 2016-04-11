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

    //participant selection buttons
    $("#violin1Button").on('click', function(e){
      e.preventDefault();
      $.get('/api/me', function getUserData(user) {
        console.log(user)
        $.ajax({
            method: "GET",
            url: '/api/users/' + user._id,
            success: handleViolin1User,
            error: getTheUserError
        });
      });

    });








//End of document ready
});

function renderEvent(event) {
    var eventHtml = event_template(event);
    $("#events").prepend(eventHtml);
}
//I would have like to search on Date as well but could not get the returned json date to match my entered value.
//convertDate(json.date).toString() === $("#date-picker").toString()&&
function findEventsSuccess(json) {
  json.forEach(function(json) {
  //  console.log("json date:", convertDate(json.date).toString(),"query date:", $("#date-picker").val().toString(), "json city:", json._host.city,"query city:", $("#query_city").val());
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
    $("#view_date").text(convertDate(json.date));
    $("#view_level").text(json.minimum_level);
    // $("#violin1").val(json.participant[0].requested_instrument);
    // $("#violin2").val(json.participant[1].requested_instrument);
    // $("#viola").val(json.participant[2].requested_instrument);
    // $("#cello").val(json.participant[3].requested_instrument);

}

function editEventError(err) {
    console.log("open edit event error");
}

function convertDate(ugly) {
   var month = ugly[5] + ugly[6];
   var day =   ugly[8] + ugly[9];
   var year =  ugly[0]+ugly[1]+ugly[2]+ugly[3];

   var refinedDate = month+'/'+day+'/'+year;
   return refinedDate;
}

function handleViolin1User(json) {
console.log(json)
    $("#violin1").text(json[0].name);
}

function getTheUserError(err) {
    console.log("couldn't find the user error");
}
