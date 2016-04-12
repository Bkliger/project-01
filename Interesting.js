function handleGetAllEvents(json) {
    $("#events").empty();
    $.get('/api/me', function getUserData(user) {
        json.forEach(function(event) {
            var checkHost = (event._host._id === user._id);
            if (event.violin1 !== null) {
                var checkViolin1 = (event.violin1._id === user._id);
            } else { checkViolin1 = false}
            if (event.violin2 !== null) {
                var checkViolin2 = (event.violin2._id === user._id);
            } else { checkViolin2 = false}
            if (event.viola !== null) {
                var checkViola = (event.viola._id === user._id);
            } else { checkViola = false}
            if (event.cello !== null) {
                var checkCello = (event.cello._id === user._id);
            } else { checkCello = false}

            if (checkHost||checkViolin1||checkViolin2||checkViola||checkCello)  {

              event['date'] = convertDate(event.date)
              event['minimum_level'] = translateLevel(event.minimum_level);
                renderEvent(event);
            }
        });
    });
}


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
