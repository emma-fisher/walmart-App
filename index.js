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
    .post('/login', handleLogin)
    .post('/signUp', handleSignUp)
    .post('/logout', handleLogout)
    .post('/myList', addToList)
    .get("/search", getSearch)
    .get("/myList", getList)
    .get("/", getHome)
    .listen(app.get("port"), function () {
        console.log("Listening on port: " + app.get("port"));
    });


/****************************************************************
 * LOGIN, LOGOUT, and SIGN UP functions
 ****************************************************************/

function handleLogin(req, res) {

    var email = req.body.email;
    var password = req.body.password;
    req.session.user = email;

    pool.query(`SELECT password FROM users WHERE email='${email}'`, function (err, result) {
        if (err) {
            if (err.code === 'ETIMEDOUT') {
                console.log("timeout error");
            }
            throw err;
        }
        if (result.rows[0].password == password) {
            res.writeHead(301, {
                Location: "/"
            });
            res.end();
        } else {
            res.writeHead(301, {
                Location: "/login.html"
            });
            res.end();
        }
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

        res.writeHead(301, {
            Location: "/public/login.html"
        });
        res.end();
    })
}


function handleLogout(request, response) {
    var result = {
        success: false
    };

    if (request.session.user) {
        request.session.destroy();
        result = {
            success: true
        };
    }

    response.json(result);
}


/****************************************************************
 * ADD TO LIST, GET LIST, GET HOME, and SEARCH functions
 ****************************************************************/

function addToList(req, res) {
    if (request.session.user != undefined) {
        var name = req.body.name;
        var price = req.body.price;
        var email = request.session.user;
        var url = req.body.url;

        pool.query(`INSERT INTO items(name, price, user_id, url) VALUES('${name}', '${price}', '${email}', '${url}')`, function (err, result) {
            if (err) {
                if (err.code === 'ETIMEDOUT') {
                    console.log("timeout error");
                }
                throw err;
            }

            res.json(result);
        })
    } else {
        res.writeHead(301, {
            Location: "/public/login.html"
        });
        res.end();
    }

}


function getList(req, res) {

    var user_id = req.session.user;

    pool.query(`SELECT * FROM items WHERE user_id = '${user_id}'`, function (err, result) {
        if (err) {
            if (err.code === 'ETIMEDOUT') {
                console.log("timeout error");
            }
            throw err;
        }

        var param = {
            result: result
        }

        res.render('pages/myList', param)
    })
}


function getHome(req, res) {
    var url = 'http://api.walmartlabs.com/v1/items?ids=44390948,16785100,10415385,19476986,10315394,10534084,22734174,10415325,13398002,23554583&apiKey=qt6j3388qmyrfujtw36tpqcu';
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


function getSearch(req, res) {

    var searchWord = req.params.searchWord;
    var url = `http://api.walmartlabs.com/v1/search?apiKey=qt6j3388qmyrfujtw36tpqcu&query=${searchWord}`;
    var options = {
        'url': url,
        'encoding': 'utf8',
        'gzip': true
    }

    var result = request(options, function cb(err, resp, body) {
        if (err) {
            throw err;
        }

        if (!err && resp.statusCode == 200) {
            cb(null, body);
            body = JSON.parse(body);
            var items = body.items;
            var params = {
                result: myResult
            }
            res.render('pages/search', params)
        }
    })
}