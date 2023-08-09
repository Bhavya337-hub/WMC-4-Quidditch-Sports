const router = require("express").Router();
const Match = require("../models/match");
let date = new Date(new Date().toISOString().split("T")[0]);

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));





router.get("/recentmatches", (req, res) => {
    if (req.isAuthenticated() && req.user.status == "member") {
      Match.find({
        $or: [{ clan1: req.user.clan }, { clan2: req.user.clan }],
        date: { $lt: date },
        status: { $ne: "not declared"}
      })
        .sort({ date: -1 })
        .then((matches) => {
          res.render("mrecentmatches", { matches: matches });
        });
    } else if (req.isAuthenticated() && req.user.status == "admin") {
      Match.find({ date: { $lt: date }, status: { $ne: "not declared"}})
        .sort({ date: -1 })
        .then((matches) => {
          res.render("arecentmatches", { matches: matches });
        });
    } else {
      res.redirect("/auth/login");
    }
});

router.get("/registeredmatches", (req, res) => {
    if (req.isAuthenticated() && req.user.status == "member") {
      Match.find({
        $or: [
          { t1u1: req.user.username },
          { t1u2: req.user.username },
          { t1u3: req.user.username },
          { t1u4: req.user.username },
          { t1u5: req.user.username },
          { t1u6: req.user.username },
          { t1u7: req.user.username },
          { t2u1: req.user.username },
          { t2u2: req.user.username },
          { t2u3: req.user.username },
          { t2u4: req.user.username },
          { t2u5: req.user.username },
          { t2u6: req.user.username },
          { t2u7: req.user.username },
        ],
        date: { $gte: date },
      })
        .sort({ date: 1 })
        .then((matches) => {
          res.render("registeredmatches", { matches: matches });
        });
    } else if (req.isAuthenticated() && req.user.status == "admin") {
      res.send(
        '<script>alert("This section is closed for you."); window.location.href="/user/upcomingmatches";</script>'
      );
    } else {
      res.redirect("/auth/login");
    }
});


router.route("/creatematch")
  .get((req, res) => {
    if (req.isAuthenticated() && req.user.status == "admin") {
      res.render("creatematch");
    } else if (req.isAuthenticated() && req.user.status == "member") {
      res.send(
        '<script>alert("This section is closed for you."); window.location.href="/user/upcomingmatches";</script>'
      );
    } else {
      res.redirect("/auth/login");
    }
  })
  .post((req, res) => {
    if (req.body.clan1 !== req.body.clan2 || req.body.date > date) {
      Match.create({
        clan1: req.body.clan1,
        clan2: req.body.clan2,
        date: req.body.date,
      });
      res.redirect("/user/upcomingmatches");
    } else if (req.body.clan1 == req.body.clan2 || req.body.date < date) {
      res.send(
        '<script> alert("Please check if you have enters name of boath clans same or date which has past the present date"); window.location.href="/user/creatematch";</script>'
      );
    } else {
      res.send(
        '<script>alert("Please fill the form"); window.location.href="/user/creatematch";</script>'
      );
    }
});


router.get("/upcomingmatches", (req, res) => {
    if (req.isAuthenticated() && req.user.status == "member") {
      Match.find({
        $or: [{ clan1: req.user.clan }, { clan2: req.user.clan }],
        date: { $gte: date },
        t1u1: { $ne: req.user.username },
        t1u2: { $ne: req.user.username },
        t1u3: { $ne: req.user.username },
        t1u4: { $ne: req.user.username },
        t1u5: { $ne: req.user.username },
        t1u6: { $ne: req.user.username },
        t1u7: { $ne: req.user.username },
        t2u1: { $ne: req.user.username },
        t2u2: { $ne: req.user.username },
        t2u3: { $ne: req.user.username },
        t2u4: { $ne: req.user.username },
        t2u5: { $ne: req.user.username },
        t2u6: { $ne: req.user.username },
        t2u7: { $ne: req.user.username },
      })
        .sort({ date: 1 })
        .then((matches) => {
          res.render("mupcomingmatches", { matches: matches });
        });
    } else if (req.isAuthenticated() && req.user.status == "admin") {
      Match.find({ date: { $gte: date } })
        .sort({ date: 1 })
        .then((matches) => {
          res.render("aupcomingmatches", { matches: matches });
        });
    } else {
      res.redirect("/auth/login");
    }
});


router.get("/upcomingmatches/:matchID", async (req, res) => {
    try {
      const match = await Match.findOne({ _id: req.params.matchID });
  
      const teamPrefix = match.clan1 == req.user.clan ? 't1u' : 't2u';
  
      for (let i = 1; i <= 7; i++) {
        const field = `${teamPrefix}${i}`;
        if (match[field] === null) {
          await Match.findOneAndUpdate(
            { _id: req.params.matchID },
            { $set: { [field]: req.user.username } },
            { new: true }
          );
          res.redirect("/user/upcomingmatches");
          return;
        }
      }
      res.send(
        '<script>alert("Intake is already full for this match."); window.location.href="/user/upcomingmatches";</script>'
      );
    } catch (error) {
      console.log(error);
    }
});
  





router.get("/declareresult", (req, res) => {
    if (req.isAuthenticated() && req.user.status == "admin") {
      Match.find({ status: "not declared", date: { $lt: date } })
        .sort({ date: 1 })
        .then((matches) => {
          res.render("declareresult", { matches: matches });
        });
    } else if (req.isAuthenticated() && req.user.status == "member") {
      res.send(
        '<script>alert("This section is closed for you."); window.location.href="/user/upcomingmatches";</script>'
      );
    } else {
      res.redirect("/auth/login");
    }
});


router.get("/declareresult/:matchID/:clan", (req, res) => {
    if (req.isAuthenticated() && req.user.status == "admin") {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { status:  req.params.clan} },
        { new: true }
      ).then(() => {
        res.redirect("/user/declareresult");
      });
    } else if (req.isAuthenticated() && req.user.status == "member") {
      res.send(
        '<script>alert("This section is closed for you."); window.location.href="/user/upcomingmatches";</script>'
      );
    } else {
      res.redirect("/auth/login");
    }
});



module.exports = router;
