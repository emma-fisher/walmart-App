var express = require('express');
var app = express();
var path = require('path');
var XMLHttpRequest = require('xhr2');


app.set("port", process.env.PORT || 5000)

    .use(express.json())
    .use(express.urlencoded({
        extended: true
    }))
    .set('view engine', 'ejs')
    .use(express.static(__dirname + "/public"))

    .get("/search/:id", getSearch)
    .get("/myList", getList)
    .get("/", (req, res) => res.render(path.join('home')))
    .listen(app.get("port"), function () {
        console.log("Listening on port: " + app.get("port"));
    });

function getSearch(req, res) {
    console.log("searching....");
    var id = req.params.id;
    console.log("Looking for video with id: " + id);

    var result = {
        title: `Results for product ${id}`,
        id: id
    };

    res.json(result);
}

function getList(req, res) {
    console.log("getting list");
    var result = [{
            id: 1,
            name: "pears"
        },
        {
            id: 2,
            name: "chicken"
        },
        {
            id: 3,
            name: "bread"
        }
    ];
    getClearance();
    res.json(result);
}

function getClearance() {

    // console.log(document.getElementById("movies").value);
    //var thing = document.getElementById("movies").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var results = this.responseText;
            results = JSON.parse(results);
            console.log("hellooo", results);
            // results.forEach(result => document.getElementById("stuff").innerHTML += "<br><br>" + result.Title + "<button onclick='showDetails()'>More Details</button>");

        }
    };

    xhttp.open("GET", `http://api.walmartlabs.com/v1/feeds/clearance?apikey=qt6j3388qmyrfujtw36tpqcu&amp;categoryId=3944`);
    xhttp.send();
}

function showDetails(title) {
    console.log(title);
}