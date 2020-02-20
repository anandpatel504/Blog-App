module.exports = (app, jwt, knex) =>{
    app.get("/get_posts", (req, res) =>{
        if (req.headers.cookie !== undefined && req.headers.cookie !== ""){
            var token = req.headers.cookie.slice(4);
            jwt.verify(token, "anand", (err, decoded_data) =>{
                if (!err){
                    knex
                    .select('*')
                    .from('user_post')
                    .then((data) =>{
                        console.log(data);
                        res.send(data);
                    }).catch((err) =>{
                        console.log(err);
                    })
                }else{
                    res.send({"Error": "Please login..."})
                }
            })
        }else{
            res.send({"Error": "Please login..."})
        }
    })
}