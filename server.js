const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
app.use(express.json()); 

var knex = require("./models/database")
// console.log('database', knex)

// signup
var signup = express.Router();
app.use("/", signup);
require("./Routes/signup")(signup, jwt, knex);

// login
var login = express.Router();
app.use("/", login);
require("./Routes/login")(login, jwt, knex);

// create_post
var create_post = express.Router();
app.use("/", create_post);
require("./Routes/create_post")(create_post, jwt, knex);

// get_posts
var get_posts = express.Router();
app.use("/", get_posts);
require("./Routes/get_posts")(get_posts, jwt, knex);

// like_dislike
var like_dislike = express.Router();
app.use("/", like_dislike);
require("./Routes/like_dislike")(like_dislike, jwt, knex);

// get_like_dislike
var get_like_dislike = express.Router();
app.use("/", get_like_dislike);
require("./Routes/get_like_dislike")(get_like_dislike, jwt, knex);

var server = app.listen(3050, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("server is running port....")
    console.log(host, port);
})
