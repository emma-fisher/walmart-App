var express = require('express');
var app = express();
var path = require('path');


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

    res.json(result);
}