$(document).ready(function() {
    console.log("login.js is loaded");
    $form = $("#login_form");

    $("#login").on("submit", function(e) {
        e.preventDefault();
        console.log("login");
        data = $form.serializeArray();
        console.log(data);
        $.ajax({
            method: "POST",
            data: data,
            url: "/login",
            success: loginSuccess,
            error: loginError
        });
    });


});

function loginSuccess(json) {
    window.open("./index.html");
}

function loginError(err) {
    alert("User/Password not found");
}
