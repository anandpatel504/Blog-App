module.exports = (app, jwt, knex) => {
    app.post("/register", (req, res) =>{
        if (req.body.name === undefined || req.body.email === undefined || req.body.password === undefined){
            console.log({"suggetion": "please fill all contents!"});
            res.send({"suggetion": "please fill all contents!"})
        }else{
            knex
            .select('*')
            .from('user')
            .where({"name": req.body.name, "email": req.body.email, "password": req.body.password})
            .then((data) =>{
                console.log(data);
                if (data.length<1){
                    knex('user')
                    .insert(req.body)
                    .then((result) =>{
                        knex
                        .select('*')
                        .from('user')
                        .where('email', req.body.email)
                        .then((data) =>{
                            console.log({"success": "signup successfully..."})
                            res.send({"success": "signup successfully..."});
                        }).catch((err) =>{
                            console.log(err);
                        })
                    }).catch((err) =>{
                        console.log(err);
                    })
                }else{
                    console.log({"exist": "this user alredy exists.."});
                    res.send({"exist": "this user alredy exists.."})
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    })
}