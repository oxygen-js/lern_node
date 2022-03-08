const { Router } = require("express");
const router = Router();
const User = require("../models/user");


router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Sign in",
    isLogin: true,
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

router.post("/login", async (req, res) => {
  req.session.user = await User.findById("6225bfb6e77d6196dd1ee736");
  req.session.isAuthenticated = true;

  req.session.save((err) => {
    if (err) throw Error(err);
    res.redirect("/");
  });
});

module.exports = router;
