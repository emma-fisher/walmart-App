function login() {
    var email = $("#email").val();
    var password = $("#password").val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();


    var params = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname
    };

    console.log(params);

    $.post("/login", params, function (result) {
        if (result && result.success) {
            $("#status").text("Successfully logged in.");
        } else {
            $("#status").text("Error logging in.");
        }
    });
}

function logout() {
    $.post("/logout", function (result) {
        if (result && result.success) {
            $("#status").text("Successfully logged out.");
        } else {
            $("#status").text("Error logging out.");
        }
    });
}