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
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const areSame = password === candidate.password;

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
      
        req.session.save((err) => {
          if (err) throw Error(err);
          res.redirect("/");
        });
      } else {
        res.redirect("/auth/login#login");
      }

    } else {
      res.redirect("/auth/login#register");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { reg_email, reg_password, repeat, name } = req.body;
    const candidate = await User.findOne({ email: reg_email });

    if (candidate) {
      res.redirect("/auth/login#register");
    } else {
      const user = new User({
        email: reg_email,
        name,
        password: reg_password,
        cart: { items: [] },
      });

      await user.save();
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

module.exports = router;
