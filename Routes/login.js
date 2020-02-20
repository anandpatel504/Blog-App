module.exports = (app, jwt, knex) =>{
    app.post("/login", (req, res) =>{
        if (req.body.email === undefined || req.body.password === undefined){
            console.log({"suggetion": "email and password both are require!"})
        }else{
            knex
            .select('*')
            .from('user')
            .where('email', req.body.email)
            .then((data) =>{
                // console.log(data);
                if (data.length>0){
                    if (data[0].password === req.body.password){
                        var token = jwt.sign({"id": data[0].id, "name": data[0].name, "email": data[0].email, "password": data[0].password }, "anand");
                        // console.log({"Login Success": token});
                        res.cookie("key", token);
                        console.log({"Login success!": data, token});
                        res.send({"Login success!": data});
                    }else{
                        res.send({
                            "Error": "Password is invalid"
                        })
                    }
                }else{
                    res.send({
                        "Error": "This user doesn't exists! please Signup....."
                    })
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    })
}