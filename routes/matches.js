const router = require("express").Router();
const Match = require("../models/match");
let date = new Date().toISOString().split('T')[0];

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));


router.get("/recentmatches", (req, res) => {
  if (req.isAuthenticated() && req.user.status == "member") {
    Match.find({
      $or: [{ clan1: req.user.clan }, { clan2: req.user.clan }],
      date: { $lt: date },
    }).sort({ date: -1 })
      .then((matches) => {
        res.render("mrecentmatches", { matches: matches });
      });
  } else if (req.isAuthenticated() && req.user.status == "admin") {
    Match.find({ date: { $lt: date } })
      .sort({ date: -1 })
      .then((matches) => {
        res.render("arecentmatches", { matches: matches });
      });
  } else {
    res.redirect("/auth/login");
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
    }).sort({ date: 1 })
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

// Route to get the matches that user has registered for
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
    }).sort({ date: 1 })
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

// Route for member to register in a match
router.get("/upcomingmatches/:matchID", (req, res) => {
  Match.findOne({ _id: req.params.matchID }).then(match => {
  if (match.clan1 == req.user.clan) {
    if (match.t1u1 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t1u1: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t1u2 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t1u2: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t1u3 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t1u3: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t1u4 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t1u4: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t1u5 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t1u5: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t1u6 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t1u6: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t1u7 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t1u7: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    } else {
      res.send(
        '<script>alert("Intake is already full for this match."); window.location.href="/user/upcomingmatches";</script>'
      );
    }
  } else {
    if (match.t2u1 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t2u1: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t2u2 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t2u2: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t2u3 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t2u3: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t2u4 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t2u4: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t2u5 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t2u5: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t2u6 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t2u6: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    }
    if (match.t2u7 == null) {
      Match.findOneAndUpdate(
        { _id: req.params.matchID },
        { $set: { t2u7: req.user.username } },
        { new: true }
      ).then(() => {
        res.redirect("/user/upcomingmatches");
      });
    } else {
      res.send(
        '<script>alert("Intake is already full for this match."); window.location.href="/user/upcomingmatches";</script>'
      );
    }
  }
  });
});

// Routes for declaring results of the matches
router.get("/declareresult", (req, res) => {
  if (req.isAuthenticated() && req.user.status == "admin") {
    Match.find({ status: null, date: { $lt: date } })
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

router.get("/declareresult/:matchID/clan1", (req, res) => {
  if (req.isAuthenticated() && req.user.status == "admin") {
    Match.findOneAndUpdate(
      { _id: req.params.matchID },
      { $set: { status: clan1 } },
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

router.get("/declareresult/:matchID/clan2", (req, res) => {
  if (req.isAuthenticated() && req.user.status == "admin") {
    Article.findOneAndUpdate(
      { _id: req.params.matchID },
      { $set: { status: clan2 } },
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

// Routes for creating matches
router
  .route("/creatematch")
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
    if (req.body.clan1 !== req.body.clan2 && req.body.date > date) {
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

module.exports = router;
