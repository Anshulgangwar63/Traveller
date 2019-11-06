const express = require('express');
const route = express.Router();
const User = require('../models/user');
const flash = require("connect-flash");
const passport = require("passport");

// Home page
route.get("/",function(req,res){
    res.render("index");
});

// --------Signup route--------//

route.get("/signup",function(req,res){
    res.render("signup"); 
 });
 
 route.post("/signup",function(req,res){
    var newUser = new User({username:req.body.username});  
    User.register(newUser,req.body.password,function(err,user){
       if(err)
       {
           console.log(err);
           return res.render("signup");
       }
       else
       {
           passport.authenticate("local")(req,res,function(){
               req.flash("success","Signup Successful, Please login with Your Credentials");
               res.redirect("/login");
           });
       }
    });
 });
 
 // -----------login routes----------------------//
 
 route.get("/login",function(req,res){
    res.render("login"); 
 });
 
 route.post("/login",passport.authenticate("local",{
     successRedirect:"/dashboard",
     failureRedirect:"/login"
 }),function(req,res){
 });
 
 //-------------- logout routes ----------------//
 
 route.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Successfully logged You out");
    res.redirect("/login");
 });



 module.exports = route;