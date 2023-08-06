const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
const User = require("../models/user");


router.use(bodyParser.urlencoded({ extended: true }));



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//REGISTER


router.route("/register")
.get((req,res) => {
  res.render("register");
})
.post((req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      clan: req.body.clan,
      status: req.body.status,
    }),
    req.body.password,
    function (err, msg) {
      if (err) {
        res.send('<script>alert(${err}); window.location.href="/auth/register";</script>');
      } else {
        res.redirect('/auth/login');
      }
    }
  );
});


//Login
router.route("/login")
.get((req,res) => {
  res.render("login");
})
.post(
  passport.authenticate("local", {
    successRedirect: "/user/upcomingmatches",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = router;
