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

    app.put("/api/workouts/:id", (req, res) => {

        Workout.updateOne(
            { _id: req.params.id },
            {
                $push: { exercises: req.body }
            }).then(dbUpdated => {
                res.send(dbUpdated);
            })       
                    .catch(err => {
                res.json(err);
            });
        
            app.get("/api/workouts", (req, res) => {
                Workout.aggregate([{
                    $addFields: {
                        totalDuration: { $sum: "$exercises.duration"}
                    }
                }

                ])
                    .then(data => {
                        res.json(data)
                    })
                    .catch(err => {
                        res.json(err)
                    })
            });

            app.get("/api/workouts/range", (req,res) => {  
                Workout.aggregate([{
                    $addFields: {
                        totalDuration: {$sum: "$exercises.duration"}
                    }
                }])
                .then(data => {  
                    res.json(data)
                })
                .catch(err => { 
                    res.json(err)
                })
            });
            

            app.post("/api/workouts/range", (req, res) => {
                Workout.create(req.body)
                    .then(data => res.json(data))
                    .catch(err => {
                        res.json(err)
                    })
            });
        });
    }

