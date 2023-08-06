require('dotenv').config();
const express = require('express'); 
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/matches");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));



app.use(
    session({
      secret: process.env.SESS_SEC_KEY,
      resave: false,
      saveUninitialized: true
    })
);
   
app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res)=>{
  res.render("index");
});

app.get('/gallery',(req,res)=>{
  res.render("gallery");
});


app.use("/auth", authRoute);
app.use("/user", userRoute);


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });