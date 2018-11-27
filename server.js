var express = require("express");

var app = express();
var PORT = 3000;

/***********Database connection************************************* */
var db = require("./db");


app.get("/todos",function(req,res){

    res.send("All elements listed");

});


db.sequelize.sync().then(function(){
    console.log("Database connection is succesfully");

    app.listen(PORT,function(){
        console.log("Express listening on "+ PORT+" !");
    });

});


