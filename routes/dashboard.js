const express = require('express');
const places = require('./places');
const travelPlan = require('../models/travelPlan');
const flights = require('../models/flights');
const hotels = require("../models/hotels");

const route = express.Router();

route.get("/dashboard",isLoggedIn,(req,res)=>{
    res.render("dashboard");
});

// places

let sour,des,day;

route.post("/place",isLoggedIn,(req,res)=>{
    sour = req.body.source;
    des = req.body.destination;
    day = req.body.book_date;
    res.redirect('/flights');
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

    flights.find({source: sour , destination: des},(err,flight)=>{
        if(err)
            console.log(err);
        else
            res.render("flight",{flight:flight});
    });
});

var newPlan;

route.post("/flight",isLoggedIn,(req,res)=>{
    newPlan = {
        user: req.user.id,
        airline: req.body.airline,
        source: req.body.source,
        destination:req.body.destination,
        source_time:req.body.source_time,
        book_date:day,
        dest_time:req.body.dest_time,
        flight_icon:req.body.flight_icon
    }; 
    // console.log(newPlan);
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
    hotels.find({city:des},(err,hotel)=>{
        if(err)
            console.log(err);
        else
            res.render("hotels",{hotel:hotel});
    });
});


route.post("/hotel",isLoggedIn,(req,res)=>{
    // console.log(newPlan);
    newPlan.hotel = req.body.hotel;
    newPlan.checkIn = req.body.checkIn;
    newPlan.checkOut = req.body.checkOut;
    newPlan.hotel_add = req.body.hotel_add;
    newPlan.star = req.body.star;
    newPlan.hotel_icon = req.body.hotel_icon;
    // console.log("New Data");
    // console.log(newPlan);
    travelPlan.create(newPlan,(err,newPlan)=>{
        if(err)
            console.log(err);
        else
        {
            // console.log(newPlan);
            res.redirect("/plans");
        }
    });

});



route.get("/plans",isLoggedIn,(req,res)=>{
    // console.log(req.user.id);
    // console.log("New Data");
    travelPlan.find({user:req.user.id},(err,plan)=>{
        if(err)
            console.log(err);
        else{
            console.log(plan[0].book_date);
            res.render("plans",{plan:plan});
        }
    });
});




route.get("/plan/:id",isLoggedIn,(req,res)=>{
    var _id = req.params.id;
    travelPlan.findById(_id,(err,plan)=>{
        if(err)
            console.log(err);
        else{
            console.log(plan);
        res.render("detail_plan",{plan:plan});
    }
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
