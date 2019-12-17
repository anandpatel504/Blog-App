const express = require("express");
const mysql = require("mysql");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
app.use(express.json()); 

const env = require('dotenv').config()
console.log(env)

var knex = require('knex')({
    client: "mysql",
    connection: {
        host : process.env.host,
        user : process.env.user,
        password : process.env.password,
        database : process.env.database
    }
})

// Create auth_details table
    knex.schema.createTable('user', function(table){
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
     }).then(() => {
        console.log("User_post table created successfully....")
     }).catch(() => {
        console.log("this table is already exists!");
    })

// Create Table user_post Table;
    knex.schema.createTable('user_post', function(table){
        table.increments('id').primary();
        table.integer('user_id');
        table.string('text');
        table.string('description');
        table.date('Date');
     }).then(() => {
        console.log("User_post table created successfully....")
     }).catch(() => {
        console.log("this table is already exists!");
    })

// Create Table like/dislike;
    knex.schema.createTable('like_dislike', function(table){
        table.increments('id').primary();
        table.integer('post_id');
        table.integer('user_id');
        table.string('like');
        table.string('dislike');
     }).then(() => {
        console.log("like_dislike table created successfully....")
     }).catch(() => {
        console.log("this table is already exists!");
    })


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