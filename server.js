var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = 3000;
var _ = require("underscore");
/***********Database connection************************************* */
var db = require("./db");
app.use(bodyParser.json());

app.get("/todos",function(req,res){

    db.Todo.findAll({
        where : {
            complated : false
        }
    }).then(function(todos){

        res.json(todos);
    })

});

app.post("/todos",function(req,res){

    let body = _.pick(req.body,"description","completed");
    db.Todo.create(body).then(function(todo){
        res.json(todo.toJSON());
    },function(e){
        //res.json(e.toJSON());
        res.status(500).send();
    })

});

app.put("/todos/:id",function(req,res){

    let todoId = req.params.id;

    let body = _.pick(req.body, "description", "completed");

    let attributes = {};

    if(body.hasOwnProperty("description")){
        attributes.description = body.description;
    }

    if(body.hasOwnProperty("completed")){
        attributes.completed = body.completed;
    }


    db.Todo.findOne({
        where : {
            id : todoId
        }
    }).then(function(todo){
        if(todo){

            todo.update(attributes).then(function(todo){

                res.json(todo.toJSON());


            },function(e){
                res.status(400).send();
            })



        }else{
            res.status(404).send({
                error : "aranan id bulunamadı!!!"
            })
        }
    },function(){
        res.status(500).send();
    })



});

app.delete("/todos/:id",function(req,res){

    let todoId = req.params.id;

    db.Todo.destroy({
        where : {
            id : todoId
        }
    }).then(function(rowDeleted){

        if(rowDeleted === 0){

            res.status(404).send({
                error : "cannot faund entry id"
            });

        }else{

            res.status(204).send();

        }


    },function(){
        res.status(500).send();
    })


});

db.sequelize.sync().then(function(){
    console.log("Database connection is succesfully");

    app.listen(PORT,function(){
        console.log("Express listening on "+ PORT+" !");
    });

});


