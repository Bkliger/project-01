$(document).ready(function() {
    console.log("app.js is loaded");
    $form = $("#user_profile_form");
    //handlebars
    var source = $("#event_template").html();
    event_template = Handlebars.compile(source);


    $.get('/api/me', function getUserData(user) {
      $.ajax({
          method: "GET",
          url: '/api/users/' + user._id,
          success: handleGetTheUser,
          error: getTheUserError
      });
    });

    getAllEvents();
    //load event list right away





    //Update user profile data
    $form.on("submit", function(e) {
        e.preventDefault();
        $.get('/api/me', function getUserData(user) {
            data = $form.serializeArray();
            $.ajax({
                method: "PUT",
                data: data,
                url: "/api/users/" + user._id,
                success: updateUserSuccess,
                error: updateUserError
            });
        });
    });




    // when the edit button for an event is clicked

    $('#events').on('click', '.edit-event', function(event) {

        $.get('/api/me', function getUserData(user) {
            var $eventRow = $(event.target).closest('.event');
            var event_id = $eventRow.attr("data-event-id");
            var $eventForm = $("#newEventForm");
            $eventForm.data("user_id", user.id);
            $.ajax({
                method: "GET",
                url: '/api/events/' + event_id,
                success: handleEditEvent,
                error: editEventError
            });
        });
    });

    $('#searchButton').on('click', function(e) {
        // window.open ("/views/search.html");
        window.location.href = "http//:localhost:3000/search";


    });




    $('#newEventButton').on('click', function(e) {
        $('#eventModal').modal();
    });

    //Create new event
    $('#saveEvent').on('click', function(e) {
        e.preventDefault();
        $.get('/api/me', function getUserData(user) {
            var url = "/api/events/" + user._id;
            $.ajax({
                method: 'POST',
                data: $("#newEventForm").serializeArray(),
                url: url,
                success: handlePostEventSuccess,
                error: newPostEventError,
            });

        });
    });

    // End of Document Ready
});



function getAllEvents() {
  $.get('/api/me', function getUserData(user) {
    $.ajax({
        method: "GET",
        url: '/api/events/' + user._id,
        success: handleGetAllEvents,
        error: getAllError
    });
  });
}

function renderEvent(event) {

    var eventHtml = event_template(event);
    $("#events").prepend(eventHtml);
}

function handleGetAllEvents(json) {
    json.forEach(function(event) {
        renderEvent(event);
    });
}

function handleEventEditClick(e) {
    var $eventRow = $(this).closest('.event');
    var eventId = $eventRow.attr("data-event-id");
    console.log('edit event', eventId);
}


function getAllError(err) {
    console.log("get all events error");
}

function addUserSuccess(json) {
    console.log("added User", json);
}

function addUserError(err) {
    console.log("add User error");
}

function handlePostEventSuccess(json) {
  $('#eventModal').modal('hide');
  $.ajax({
      method: "GET",
      url: '/api/events',
      success: handleGetAllEvents,
      error: getAllError
  });
}

function newPostEventError(err) {
    console.log("add Event error");
}

function updateUserSuccess(json) {
  console.log("update success")
  getAllEvents();

}

function updateUserError(err) {
    console.log("update user error");
}

function loginSuccess(json) {
    window.open("./index.html");
}

function loginError(err) {
    alert("User/Password not found");
}

function handleEditEvent(json) {
    $('#eventModal').modal();
    $("#edit_date").val(json.date);
    $("#edit_level").val(json.minimum_level);
}

function editEventError(err) {
    console.log("open edit event error");
}


function handleGetTheUser(user) {
  $("#profile_name").val(user[0].name);
  $("#profile_instrument").val(user[0].instrument);
  $("#profile_level").val(user[0].level);
  $("#profile_street_address").val(user[0].street_address);
  $("#profile_city").val(user[0].city);
  $("#profile_state").val(user[0].state);
  $("#profile_zip").val(user[0].zip);

  }
function getTheUserError(err) {
    console.log("user not found error");
}
