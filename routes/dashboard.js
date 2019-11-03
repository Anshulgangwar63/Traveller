const express = require('express');
const route = express.Router();

route.get("/dashboard",isLoggedIn,(req,res)=>{
    res.render("dashboard");
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
