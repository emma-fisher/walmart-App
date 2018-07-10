function getClearance() {

    // console.log(document.getElementById("movies").value);
    //var thing = document.getElementById("movies").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var results = this.responseText;
            results = JSON.parse(results);
            console.log(results);
            // results.forEach(result => document.getElementById("stuff").innerHTML += "<br><br>" + result.Title + "<button onclick='showDetails()'>More Details</button>");

        }
    };

    xhttp.open("GET", `http://api.walmartlabs.com/v1/feeds/clearance?apikey=qt6j3388qmyrfujtw36tpqcu&amp;categoryId=3944`);
    xhttp.send();
}

function showDetails(title) {
    console.log(title);
}