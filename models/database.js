const env = require('dotenv').config()
console.log(process.env.host);

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
        console.log("User table created successfully....")
     }).catch(() => {
        console.log("user table is already exists!");
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
        console.log("user_post table is already exists!");
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
        console.log("like_dislike table is already exists!");
    })

module.exports = knex;
