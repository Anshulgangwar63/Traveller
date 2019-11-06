const express = require('express');
const places = require('./places');
const travelPlan = require('../models/travelPlan');
const flights = require('../models/flights');
const hotels = require("../models/hotels");

const route = express.Router();

route.get("/dashboard",isLoggedIn,(req,res)=>{
    res.render("dashboard");
});


// flights routes

route.get("/flight_data",isLoggedIn,(req,res)=>{
    res.render("flight_data");
});

route.post("/flight_data",isLoggedIn,(req,res)=>{
    var newFlight = {
        airline: req.body.airline,
        source: req.body.source,
        destination:req.body.destination,
        source_time:req.body.source_time,
        dest_time:req.body.dest_time,
        price:req.body.price,
        icon:req.body.icon
    };

    flights.create(newFlight,(err,newFlight)=>{
        if(err)
            console.log(err);
        else
            res.redirect("/flights");
    })
});


route.get("/flights",isLoggedIn,(req,res)=>{
    flights.find({source:'Dubai'},(err,flight)=>{
        if(err)
            console.log(err);
        else
            res.render("flight",{flight:flight});
    })
});

var newPlan;

route.post("/flight",isLoggedIn,(req,res)=>{
    newPlan = {
        user: req.user.id,
        airline: req.body.airline,
        source: req.body.source,
        destination:req.body.destination,
        source_time:req.body.source_time,
        dest_time:req.body.dest_time,
        flight_icon:req.body.flight_icon
    }; 
    res.redirect("/hotels");
});


// hotels routes


route.get("/hotel_data",isLoggedIn,(req,res)=>{
    res.render("hotel_data");
});


route.post("/hotel_data",isLoggedIn,(req,res)=>{
    var newHotel = {
        hotel:req.body.hotel,
        city:req.body.city,
        address:req.body.address,
        hotel_icon:req.body.hotel_icon,
        star:req.body.star
    };

    hotels.create(newHotel,(err,newHotel)=>{
        if(err)
            console.log(err);
        else
            res.redirect("/hotels");
    });
});


route.get("/hotels",isLoggedIn,(req,res)=>{
    hotels.find({city:'Delhi'},(err,hotel)=>{
        if(err)
            console.log(err);
        else
            res.render("hotels",{hotel:hotel});
    });
});


route.post("/hotel",isLoggedIn,(req,res)=>{
    newPlan.hotel = req.body.hotel;
    newPlan.checkIn = req.body.checkIn;
    newPlan.checkOut = req.body.checkOut;
    newPlan.hotel_add = req.body.hotel_add;
    newPlan.star = req.body.star;
    newPlan.hotel_icon = req.body.hotel_icon;

    travelPlan.create(newPlan,(err,newPlan)=>{
        if(err)
            console.log(err);
        else
        {
            console.log(newPlan);
            res.redirect("/dashboard");
        }
    });

});









let place;

route.post("/place",(req,res)=>{
    place = req.body.place + ',';
    res.redirect('/dashboard/places');
});

 
route.get('/dashboard/places',isLoggedIn,(req,res)=>{
    var search = place.substr(0,place.indexOf(','));
    console.log(search);
    res.send(`You city is ${search}`);
    places.callApi(function(response){
      
      var data = JSON.stringify(response);
      console.log(data);
      res.end();
  })
});





// --------------middleware--------------//

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
        req.flash("error","Please Login First");
        res.redirect("/login");
    }
}



module.exports = route;
