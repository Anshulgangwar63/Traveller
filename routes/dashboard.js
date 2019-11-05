const express = require('express');
const places = require('./places');
const route = express.Router();

route.get("/dashboard",isLoggedIn,(req,res)=>{
    res.render("dashboard");
});

route.get("/flights",isLoggedIn,(req,res)=>{

    res.render("flight");

});

route.get("/hotels",isLoggedIn,(req,res)=>{
    res.render("hotels");

});

// let exp;
// route.post("/exp",(req,res)=>{
// exp=req.body.exp;
// console.log(exp);
// res.redirect("/hotels");
// });


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
