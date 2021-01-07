const path = require("path");
const Workout = require("../models/workout.js");

module.exports = function (app) {

    //creating a post route for createWorkout method
    app.post("/api/workouts", ({ body }, res) => {
        Workout.create(body)
            .then(dbWorkout => {
                console.log(dbWorkout)
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

app.get("/api/workouts", function (req, res) {
    Workout.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
});

app.get("/api/workouts/range",function(req,res){  
    Workout.find()
    .then(data =>{  
        res.json(data)
    })
    .catch(err => { 
        res.json(err)
    })
});

app.post("/api/workouts/range",function (req,res){    
    Workout.create({})
    .then(data => res.json(data))
    .catch(err => { 
        res.json(err)
    })
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then(data => res.json(data))
        .catch(err => {
            res.json(err)
        })
});
}

