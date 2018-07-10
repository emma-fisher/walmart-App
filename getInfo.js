var express = require('express');
var app = express();

app.set("port", 5000)
    .use(express.json())
    .use(express.urlencoded({
        extended: true
    }))
    .use(express.static(__dirname + "/public"))
    .get("/video/:id", getVideo)
    .get("/tag", getTag)
    .post("/video", postVideo)
    .listen(app.get("port"), function () {
        console.log("Listening on port: " + app.get("port"));
    });
var express = require('express');
var app = express();

app.set("port", 5000)
    .use(express.json())
    .use(express.urlencoded({
        extended: true
    }))
    .use(express.static(__dirname + "/public"))
    .get("/video/:id", getVideo)
    .get("/tag", getTag)
    .post("/video", postVideo)
    .listen(app.get("port"), function () {
        console.log("Listening on port: " + app.get("port"));
    });

function getVideo(req, res) {
    console.log("getting video....");
    var id = req.params.id;
    console.log("Looking for video with id: " + id);

    var result = {
        title: "Charlie bit my finger",
        id: id,
        link: "https://www.youtube.com/watch?v=_OBlgSz8sSM"
    };

    res.json(result);
}

function getTag(req, res) {
    console.log("getting tags");
    var result = [{
            id: 1,
            name: "comedy"
        },
        {
            id: 2,
            name: "cat videos"
        },
        {
            id: 3,
            name: "action"
        }
    ];

    res.json(result);
}

function postVideo(req, res) {
    console.log("creating new video");

    var title = req.body.title;
    console.log("Title: " + title);

    res.json({
        success: true
    });
}

function getVideo(req, res) {
    console.log("getting video....");
    var id = req.params.id;
    console.log("Looking for video with id: " + id);

    var result = {
        title: "Charlie bit my finger",
        id: id,
        link: "https://www.youtube.com/watch?v=_OBlgSz8sSM"
    };

    res.json(result);
}

function getTag(req, res) {
    console.log("getting tags");
    var result = [{
            id: 1,
            name: "comedy"
        },
        {
            id: 2,
            name: "cat videos"
        },
        {
            id: 3,
            name: "action"
        }
    ];

    res.json(result);
}

function postVideo(req, res) {
    console.log("creating new video");

    var title = req.body.title;
    console.log("Title: " + title);

    res.json({
        success: true
    });
}