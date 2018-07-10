var express = require('express');
var app = express();
var path = require('path');
var XMLHttpRequest = require('xhr2');
const http = require('http');



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


    // http.get('http://api.walmartlabs.com/v1/feeds/clearance?apikey=qt6j3388qmyrfujtw36tpqcu&amp;categoryId=3944', (resp) => {
    //     let data = '';

    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //         console.log(chunk);
    //     });

    //     // The whole response has been received. Print out the result.
    //     // resp.on('end', () => {
    //     //     console.log(data);
    //     // });

    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });


    // console.log("getting list");
    // var result = [{
    //         id: 1,
    //         name: "pears"
    //     },
    //     {
    //         id: 2,
    //         name: "chicken"
    //     },
    //     {
    //         id: 3,
    //         name: "bread"
    //     }
    // ];
    // res.json(result);
}