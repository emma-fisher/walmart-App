function addToList() {
    var thingToAdd = $("#banana").val();


    var params = {
        thingToAdd: thingToAdd
    };

    console.log(params);

    $.post("/myList", params, function (result) {
        if (result && result.success) {
            $("#status").text("Success");
        } else {
            $("#status").text("Error");
        }
    })
}