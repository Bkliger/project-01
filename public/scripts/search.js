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
      //store the event_id for latter use
        $("#eventModal").data("event_id",{event_id: event_id});
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
      //store the participant for latter use
        $("#eventModal").data("participant",{participant: "violin1"});
      $.get('/api/me', function getUserData(user) {
        $.ajax({
            method: "GET",
            url: '/api/users/' + user._id,
            success: handleParticipant,
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
console.log(json);
    $('#eventModal').modal();
    $("#view_date").text(convertDate(json.date));
    $("#view_level").text(translateLevel(json.minimum_level));
    $("#violin1").text(json.participants[0].player);
    $("#violin2").text(json.participants[1].player);
    $("#viola").text(json.participants[2].player);
    $("#cello").text(json.participants[3].player);

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

function handleParticipant(user) {
  var data;
  switch ($("#eventModal").data("participant").participant) {
    case "violin1":
      data = {index: 0, player: user};
      break;
    case "violin2":
      data = {index: 1, player: user};
      break;
    case "viola":
      data = {index: 2, player: user};
      break;
    case "cello":
      data = {index: 3, player: user};
      break;
  }

console.log(user);
$('#eventModal').modal('hide');
  event_id = $("#eventModal").data("event_id").event_id;
  console.log('/api/events/' + event_id)
$.ajax({
    method: "PUT",
    url: '/api/events1/' + event_id,
    data: data,
    success: handleUpdateEvent,
    error: updateEventError
});
}

function getTheUserError(err) {
    console.log("couldn't find the user error");
}

//Translate level
function translateLevel(level){
switch (level) {
  case 1:
    return niceLevel = "C-";
  case 2:
    return niceLevel = "C";
  case 3:
    return niceLevel = "C+";
  case 4:
    return niceLevel = "B-";
  case 5:
    return niceLevel = "B";
  case 6:
    return niceLevel = "B+";
  case 7:
    return niceLevel = "A-";
  case 8:
    return niceLevel = "A";
  case 9:
    return niceLevel = "A+";
  case 10:
    return niceLevel = "Professional";
  }
}
