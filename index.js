// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3231

// Create express app
const app = express();
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
});



// Set up default mongoose connection
let db_url = 'mongodb://127.0.0.1/db_exercise_erim';
mongoose.connect(db_url, { useNewUrlParser: true });
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//
// Let's start the exercise :
//
// During ALL the exercise the requests have to be connected with the database
//
// Context : We want to create a web application to manage a motorcyle Championship. 
// ------------------------------------------------------------

// Import Models
const Rider = require('./models/rider.model');


// Question 1 - Create a HTTP Request to add a riders in the database :
// When we create a rider he doesn't have a score yet.

app.post('/addRiders',(req, res)=>{
    let addRidersToCreate = new Rider({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age
    });

    addRidersToCreate.save((err,addRiders)=>{
        if(err){
            res.send(err);
        }
        res.json(addRiders);
    });
});


// Question 2 - Create a HTTP Request to fetch all the riders :

app.get('/riders',(req,res)=>{
    Rider.find({},(err, addRiders)=>{
        if(err){
            res.send(err);
        }
        res.json({addRiders:addRiders});
    });
});


// Question 3 - Create a HTTP Request to fetch one rider :

let myId =req.params.firstName;
Rider.findOne({firstName: myId},function(err, rider){
if(err){
res.send(err)
}
res.json(rider)

// Question 4 - Create a HTTP Request to update firstName or/and lastName of a rider :


// Question 5 - Create a HTTP Request to ADD score of a rider :


// Question 6 - Create a HTTP Request to delete one rider :


// Question 7 - Create a HTTP Request to create motorcycles :
// For create a motorcycle you will need to create the model first.


// Question 8 - Create a HTTP Request to fetch all the motorcycles:


// Question 9 - Create a HTTP Request to fetch all the motorcycles associate to one rider:


// BONUS 10 - Create a HTTP Request to to get the riders ranking


//
// End of the exercise
// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});