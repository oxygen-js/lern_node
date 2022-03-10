const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const auth = require("../middleware/auth");
const { validationResult } = require("express-validator");
const { courseValidators } = require("../utils/validators");

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "Add course",
    isAdd: true,
  });
});

router.post("/", auth, courseValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("add", {
      title: "Add course",
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        logo: req.body.logo,
        title: req.body.title,
        price: req.body.price,
      },
    });
  }

  const course = new Course({
    logo: req.body.logo,
    title: req.body.title,
    price: req.body.price,
    userId: req.user,
  });

  try {
    await course.save();
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
