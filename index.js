var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var request = require('request');
const {
    Pool
} = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://xrexoekpptodxp:4b48a7123696130e7c3a34385c71c6156e626256bc93c498f33986b6ac4b748b@ec2-23-23-92-179.compute-1.amazonaws.com:5000/ddt326pp5gijtv'
const pool = new Pool({
    connectionString: connectionString
});



app.use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
}))
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set("port", process.env.PORT || 5000)

    .use(express.json())
    .use(express.urlencoded({
        extended: true
    }))
    .set('view engine', 'ejs')
    .use(express.static(path.join(__dirname + "/public")))
    .use(logRequest)
    .post('/login', handleLogin)
    .post('/signUp', handleSignUp)
    .post('/logout', handleLogout)
    .post('/myList', addToList)
    .get("/search/:id", getSearch)
    .get("/myList", getList)
    // .get("/", (req, res) => res.render(path.join('home')))
    .get("/", getHome)
    .listen(app.get("port"), function () {
        console.log("Listening on port: " + app.get("port"));
    });


/****************************************************************
 * These methods should likely be moved into a different module
 * But they are hear for ease in looking at the code
 ****************************************************************/

// Checks if the username and password match a hardcoded set
// If they do, put the username on the session
function handleLogin(request, response) {
    var email = req.body.email;
    var password = req.body.password;
    request.session.user = email;

    pool.query(`SELECT password FROM users WHERE email=${email}`, function (err, result) {
        if (err) {
            if (err.code === 'ETIMEDOUT') {
                console.log("timeout error");
            }
            throw err;
        }

        res.json(result);
        // res.redirect('public/views/home');
    })
}

function handleSignUp(req, res) {

    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    pool.query(`INSERT INTO users(first_name, last_name, email, password) VALUES('${first_name}', '${last_name}', '${email}', '${password}')`, function (err, result) {
        if (err) {
            if (err.code === 'ETIMEDOUT') {
                console.log("timeout error");
            }
            throw err;
        }

        // res.json(result);
        res.redirect('public/login.html');
    })
}


function addToList(req, res) {
    console.log("in add list func");
    var name = req.body.name;
    var price = req.body.price;
    var email = 'emma@byui.edu'
    var url = req.body.url;

    pool.query(`INSERT INTO items(name, price, user_id, url) VALUES('${name}', '${price}', '${email}', '${url}')`, function (err, result) {
        if (err) {
            if (err.code === 'ETIMEDOUT') {
                console.log("timeout error");
            }
            throw err;
        }

        console.log("Back from db with result: ", result);

        res.json(result);

        // res.json(result.rows);
        // var param = {
        //     result: result
        // }

        // res.render('pages/myList', param)
    })
}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
    var result = {
        success: false
    };

    // We should do better error checking here to make sure the parameters are present
    if (request.session.user) {
        request.session.destroy();
        result = {
            success: true
        };
    }

    response.json(result);
}


// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
    if (request.session.user) {
        // They are logged in!

        // pass things along to the next function
        next();
    } else {
        // They are not logged in
        // Send back an unauthorized status
        var result = {
            succes: false,
            message: "Access Denied"
        };
        response.status(401).json(result);
    }
}

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
    console.log("Received a request for: " + request.url);

    // don't forget to call next() to allow the next parts of the pipeline to function
    next();
}





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

    var user_id = 'emma@byui.edu';

    pool.query(`SELECT * FROM items WHERE user_id = 'emma@byui.edu'`, function (err, result) {
        if (err) {
            if (err.code === 'ETIMEDOUT') {
                console.log("timeout error");
            }
            throw err;
        }

        console.log("Back from db with result: ", result);
        var param = {
            result: result
        }

        res.render('pages/myList', param)
    })
}


function getHome(req, res) {
    var url = 'http://api.walmartlabs.com/v1/items?ids=44390948,16785100,10415385,19476986,10315394,10534084,22734174,10415325,13398002,23554583&apiKey=qt6j3388qmyrfujtw36tpqcu';
    // 16785100
    // qt6j3388qmyrfujtw36tpqcu
    var options = {
        'url': url,
        'encoding': 'utf8',
        'gzip': true
    }

    var result = request(options, function cb(err, resp, body) {
        pool.query("SELECT * FROM items WHERE user_id='fis17001@byui.edu'", function (err, myResult) {
            if (err) {
                throw err;
            }

            if (!err && resp.statusCode == 200) {
                // console.log(body);
                cb(null, body);
                body = JSON.parse(body);
                var items = body.items;
                var params = {
                    banana: items[0],
                    cereal: items[1],
                    peaches: items[2],
                    almondmilk: items[3],
                    rice: items[4],
                    pasta: items[5],
                    potatoes: items[6],
                    juice: items[7],
                    tuna: items[8],
                    oreo: items[9],
                    result: myResult
                }
                res.render('pages/home', params)
            }
        })
    })
}