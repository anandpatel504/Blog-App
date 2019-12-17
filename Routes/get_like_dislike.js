module.exports = (app, jwt, knex) =>{
    app.get("/get_like_dislike", (req, res) =>{
        console.log({"token": req.headers.cookie})

        if (req.headers.cookie !== undefined){
            var token = req.headers.cookie.slice(4);
            var decoded = jwt.verify(token, "anand");
            knex
            .select('*')
            .from('user_post')
            .join('like_dislike', function() {
                this.on('user_post.user_id','like_dislike.user_id')
            })
            .where('user_post.user_id', decoded.id)
            .then((data) =>{
                console.log(data)
                res.send({"like and dislike datas": data})
            })
        }else{
            res.send({"Error": "Please login...."})
        }
    })
}
