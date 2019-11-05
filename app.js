const express             = require("express");
const app                 = express();
const bodyParser          = require("body-parser");
const mongoose            = require("mongoose");
const passport            = require("passport");
const localStrategy       = require("passport-local");
const methodOverride      = require("method-override");
const flash               = require("connect-flash");
const User                = require("./models/user");


/* ===================
    Routes path
======================*/

const authRoutes = require('./routes/authentication');
const photosRoutes = require('./routes/photos');
const dashboardRoutes = require('./routes/dashboard');


// global promise
mongoose.Promise = global.Promise;

// // mongoose connection 

mongoose.connect('mongodb://localhost:27017/Traveller',{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));


/*====================
     Global Setup
======================*/

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret:"My name is Anshul",
    resave:false,
    saveUninitialized:false
}));

/*==============================
     Passport configuration
================================*/


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error   = req.flash("error");
    res.locals.success   = req.flash("success");
    next();
});


// Routes

app.use(authRoutes);

app.use(photosRoutes);

app.use(dashboardRoutes);




app.listen(process.env.PORT || 3000,function() {
    console.log(`server started`);
});