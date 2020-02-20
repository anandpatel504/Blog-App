module.exports = (app, jwt, knex) =>{
    app.post("/create_post", (req, res) =>{
       console.log({"token": req.headers.cookie});
       if (req.headers.cookie !== undefined && req.headers.cookie !== ""){
           var token = req.headers.cookie.slice(4);
        //    console.log(token);
           if (req.body.text !== undefined && req.body.description !== undefined){
               var token_data = jwt.verify(token, "anand");
               var dic = req.body;
               dic["user_id"]=token_data.id;
               dic['Date']=new Date();
               knex('user_post').insert(dic)
               .then((data) =>{
                   console.log(dic);
                   res.send(dic);
               }).catch((err) =>{
                   console.log(err);
               })

           }else{
               res.send({"Warning!": "Please fill the all details in body....", "Hint": {
                   "text": "Enter your text...",
                   "description": "Enter your description...."
               }})
           }
       }else{
           res.send({"Error": "Please! login"});
       }
    })
}