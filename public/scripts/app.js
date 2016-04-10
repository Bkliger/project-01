$(document).ready(function() {
    console.log("app.js is loaded");
    $form = $("#user_profile_form");
    //handlebars
    var source = $("#event_template").html();
    event_template = Handlebars.compile(source);


//initial load of index.html - get the user data and load profile page
    $.get('/api/me', function getUserData(user) {
      $.ajax({
          method: "GET",
          url: '/api/users/' + user._id,
          success: handleGetTheUser,
          error: getTheUserError
      });
    });
//load event list for that user right away
    getAllEvents();






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


//click the new event button on the profile page
    $('#newEventButton').on('click', function(e) {
        $('#eventModal').modal();
    });

    //Create new event in the modal dialog box
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



    // Select an event to edit and display modal dialog box.
    $('#events').on('click', '.edit-event', function(event) {
        $.get('/api/me', function getUserData(user) {
            var $eventRow = $(event.target).closest('.event');
            var event_id = $eventRow.attr("data-event-id");
            var $eventForm = $("#newEventForm");
            $eventForm.data("user_id", user.id);
            //use the show function in eventsController to get one event
            $.ajax({
                method: "GET",
                url: '/api/events/' + event_id,
                success: handleEditEvent,
                error: editEventError
            });
        });
    });


    // End of Document Ready
});


//retrieve all events for a user
function getAllEvents() {
  $.ajax({
      method: "GET",
      url: '/api/events/',
      success: handleGetAllEvents,
      error: getAllError
  });
}

//creates each event row separately
function handleGetAllEvents(json) {
  $.get('/api/me', function getUserData(user) {
    console.log(user)
    json.forEach(function(event) {
      console.log(event)
      if (event._host._id === user._id) {
          renderEvent(event);
      }
    });
  });
}

//use handlebars to render the events
function renderEvent(event) {
    var eventHtml = event_template(event);
    $("#events").prepend(eventHtml);
}

function getAllError(err) {
    console.log("get all events error");
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
  alert("User Profile Updated");
  getAllEvents();
}

function updateUserError(err) {
    console.log("update user error");
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
