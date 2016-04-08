$(document).ready(function() {
    console.log("app.js is loaded");
    $form = $("#user_profile_form");
    data = $form.serializeArray();

    //handlebars
    var source = $("#event_template").html();
    event_template = Handlebars.compile(source);
    getAllEvents();
    //load event list right away

    function getAllEvents() {

        $.ajax({
            method: "GET",
            url: '/api/events',
            success: handleGetAllEvents,
            error: getAllError
        });
    }
    //Update user profile data
    $form.on("submit", function(e) {
      e.preventDefault();
      $.get('/api/me', function getUserData(user) {
          data = $form.serializeArray();
          $.ajax({
            method: "PUT",
            data: data,
            url: "/api/users/"+user._id,
            success: updateUserSuccess,
            error: updateUserError
        });
      });
    });

    // when the edit button for an album is clicked

    $('#edit-event').on('click', function(e){
      var user_id = $(this).closest('.event').attr(data-user-id);

    });



    $('#newEventButton').on('click', function(e) {
        id = $form.attr("data-user_id");
        console.log(id);
        $('#eventModal').modal();
    });

    //Create new event
    $('#saveEvent').on('click', function(e) {
        e.preventDefault();

        var id = $form.attr("data-user_id");
        var url = "/api/events/:" + id;
        $.ajax({
            method: 'POST',
            data: $("#newEventForm").serializeArray(),
            url: url,
            success: handlePostEventSuccess,
            error: newPostEventError,
        });
        $('#eventModal').modal('hide');
    });


    // End of Document Ready
});

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

  // // show the save changes button
  // $albumRow.find('.save-album').toggleClass('hidden');
  // // hide the edit button
  // $albumRow.find('.edit-album').toggleClass('hidden');

  //place something on the modal

  // $('#level')=$eventRow.attr("data-event-id");

  // // get the album name and replace its field with an input element
  // var albumName = $albumRow.find('span.album-name').text();
  // $albumRow.find('span.album-name').html('<input class="edit-album-name" value="' + albumName + '"></input>');
  //
  // // get the artist name and replace its field with an input element
  // var artistName = $albumRow.find('span.artist-name').text();
  // $albumRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');
  //
  // // get the releasedate and replace its field with an input element
  // var releaseDate = $albumRow.find('span.album-releaseDate').text();
  // $albumRow.find('span.album-releaseDate').html('<input class="edit-album-releaseDate" value="' + releaseDate + '"></input>');
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
    console.log("added Event", json);
}

function newPostEventError(err) {
    console.log("add Event error");
}
function  updateUserSuccess(json) {
    console.log("updated user", json);
}

function updateUserError(err) {
    console.log("update user error");
}
