const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const bycrpt = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Sign in",
    isLogin: true,
    error_login: req.flash("error_login"),
    error_register: req.flash("error_register"),
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
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;

        req.session.save((err) => {
          if (err) throw Error(err);
          res.redirect("/");
        });
      } else {
        req.flash("error_login", "Invalid password");
        res.redirect("/auth/login#login");
        return;
      }
    } else {
      req.flash("error_login", "User does not exist");
      res.redirect("/auth/login#login");
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
      req.flash("error_register", "User already exists");
      res.redirect("/auth/login#register");
    } else {
      const hashPassword = await bycrpt.hash(reg_password, 10);

      const user = new User({
        name,
        email: reg_email,
        password: hashPassword,
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
