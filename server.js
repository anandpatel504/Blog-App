const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
app.use(express.json()); 

var knex = require("./models/database")
// console.log('database', knex)

// route to signup.js
var signup = express.Router();
app.use("/", signup);
require("./Routes/signup")(signup, jwt, knex);

// route to login.js
var login = express.Router();
app.use("/", login);
require("./Routes/login")(login, jwt, knex);

// routes to create_post.js
var create_post = express.Router();
app.use("/", create_post);
require("./Routes/create_post")(create_post, jwt, knex);

// route to get_posts.js
var get_posts = express.Router();
app.use("/", get_posts);
require("./Routes/get_posts")(get_posts, jwt, knex);

// route to like_dislike.js
var like_dislike = express.Router();
app.use("/", like_dislike);
require("./Routes/like_dislike")(like_dislike, jwt, knex);

// route to get_like_dislike.js
var get_like_dislike = express.Router();
app.use("/", get_like_dislike);
require("./Routes/get_like_dislike")(get_like_dislike, jwt, knex);

// the port listener
var server = app.listen(3050, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("server is running port....")
    console.log(host, port);
})
