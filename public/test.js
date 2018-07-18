function login() {
    var email = $("#email").val();
    var password = $("#password").val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();


    var params = {
        email: email,
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

function signUp() {
    var email = $("#email").val();
    var password = $("#password").val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();


    var params = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    };

    console.log(params);

    $.post("/signUp", params, function (result) {
        if (result && result.success) {
            window.location.replace("https://peaceful-river-47246.herokuapp.com/login.html");
        } else {
            $("#status").text("Error logging in.");
        }
    });
}