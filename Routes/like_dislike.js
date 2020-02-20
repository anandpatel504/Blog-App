
module.exports = (app, jwt, knex) =>{
    app.post("/like_dislike", (req, res) =>{
        console.log({"token": req.headers.cookie});
        
        if (req.headers.cookie !== "" && req.headers.cookie !== undefined){
            var token = req.headers.cookie.slice(4);
            if (req.body.like !== undefined && req.body.dislike !== undefined && req.body.post_id !== undefined){
                var decoded = jwt.verify(token, "anand");
                if (req.body.like || !req.body.dislike || !req.body.like || req.body.dislike){
                    // console.log("hello")
                    knex('user_post').where('id', req.body.post_id)
                    .then((data) =>{
                        if (data.length>0){
                            knex('like_dislike').where('post_id', req.body.post_id).andWhere('user_id', decoded.id)
                            .then((data) =>{
                                if (data.length>0){
                                    var dic = req.body;
                                    dic.user_id=decoded.id;
                                    knex('like_dislike').update(dic)
                                    .then(() =>{
                                        console.log({"Success": "Thank you! like and dislike updated successfully!"});
                                        res.send({"Success": "Thank you! like and dislike updated successfully!"});
                                    })
                                }else{
                                    var dic = req.body;
                                    dic.user_id=decoded.id
                                    knex('like_dislike').insert(dic)
                                    .then(() =>{
                                        console.log({"Success": "Thank you! you have done like and dislike"});
                                        res.send(({"Success": "Thank you! you have done like and dislike"}));
                                    }).catch(() =>{
                                        console.log(err);
                                    })
                                }
                            }).catch((err) =>{
                                console.log(err);
                            })
                        }else{
                            res.send({"Error": "Please login...."})
                        }
                    }).catch((err) =>{
                        console.log(err);
                    })
                    
                }else{
                    res.send({"Error": "Please! fill the like or dislike"})
                }
            }else{
                res.send({
                    "Error": "please fill the body information",
                    "Hint": {
                        "post_id": 1,
                        "like": "true",
                        "dislike": "false"
                    }
                })
            }
        }else{
            res.send({"Error": "Please login...."})
        }
    })
}


// module.exports = (app, jwt, knex) => {

//     app.post("/like_dislike", (req, res) => {
//         console.log(req.headers.cookie);

//         if (req.headers.cookie !== "" && req.headers.cookie !== undefined) {
//             var token = req.headers.cookie.slice(4)
//             console.log(token);
//             if (req.body.like !== undefined && req.body.dislike !== undefined && req.body.post_id !== undefined) {
//                 var decoded = jwt.verify(token, "anand");
//                 // console.log(decoded);
//                 if (req.body.like && !req.body.dislike || !req.body.like && req.body.dislike) {
//                     knex("user_post").where("id", req.body.postId)
//                         .then((data) => {
//                             if (data.length > 0) {
//                                 knex("like_dislike").where("post_id", req.body.post_id).andWhere("user_id", decoded.id)
//                                     .then((data) => {
//                                         if (data.length > 0) {
//                                             var dic = req.body
//                                             // dic["Date"] = new Date()
//                                             knex("like_dislike").update(dic)
//                                                 .then(() => {
//                                                     res.send({ "Success": "You have done like or dislike on this post" })
//                                                 })
//                                                 .catch((err) => {
//                                                     res.send(err)
//                                                 })
//                                         } else {
//                                             var dic = req.body
//                                             // dic["Date"] = new Date()
//                                             dic.user_id = decoded.id
//                                             knex("like_dislike").insert(dic)
//                                                 .then(() => {
//                                                     res.send({ "Success": "You have done like or dislike on this post" })
//                                                 })
//                                                 .catch((err) => {
//                                                     res.send(err)
//                                                 })
//                                         }
//                                     })
//                             }else{
//                                 res.send({"Error":"This post is not Exists..."})
//                             }
//                         })
//                 } else {
//                     res.send({ "Error": "Please Like Or Dislike Post..." })
//                 }
//             } else {
//                 res.send({
//                     "Error": "Please Fill Information In Body...", "Hint": {
//                         "Text": "Enter your text.",
//                         "Description": "Enter your description."
//                     }
//                 })
//             }
//         } else {
//             res.send({ "Error": "Please Login..." })
//         }
//     })
// }