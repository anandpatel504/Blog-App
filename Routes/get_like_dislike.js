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
                res.send({"like and dislike data's": data})
            })
        }else{
            res.send({"Error": "Please login...."})
        }
    })
}


/*
module.exports = (app, jwt, knex) => {

    app.get("/get_like_dislike2", (req, res) => {
        if (req.headers.cookie !== "" && req.headers.cookie !== undefined) {
            var token = req.headers.cookie.slice(4)
                var decoded = jwt.verify(token, "anand")
                knex.select("*").from("user_post").join("like_dislike",function(){
                    this.on("user_post.user_id","like_dislike.user_id")
                }).where("user_post.user_id",decoded.id)
                .then((data) => {
                    console.log(data);
                    
                    var list=[]
                    var newlist=[]
                    for(dic of data){
                        if (!list.includes(dic.id)){
                            newlist.push(dic)
                            list.push(dic.id)
                        }else{
                            for (i of newlist){
                                console.log(i,dic);
                                
                                if (i.id===dic.id){
                                    i.like=i.like+dic.like
                                    i.dislike=i.dislike+dic.dislike
                                }
                            }
                        }
                    }
                    res.send(newlist)
                })
        } else {
            res.send({ "Error": "Please Login..." })
        }
    })
}
*/