var express = require("express");

var app = express();
var PORT = 3000;

/***********Database connection************************************* */
var db = require("./db");


app.get("/todos",function(req,res){

    res.send("All elements listed");

});

app.post("/todos",function(req,res){

    res.send("registration with post methods");
})

app.put("/todos/:id",function(req,res){

    res.send("update with put methods");
})

app.delete("/todos",function(req,res){

    res.send("delete with delete methods");
})

db.sequelize.sync().then(function(){
    console.log("Database connection is succesfully");

    app.listen(PORT,function(){
        console.log("Express listening on "+ PORT+" !");
    });

});


