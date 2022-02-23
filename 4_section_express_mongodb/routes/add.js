const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add course",
    isAdd: true
  });
});

router.post("/", async (req, res) => {
  const course = new Course({
    logo: req.body.logo,
    title: req.body.title,
    price: req.body.price,
  });

  try {
    await course.save();
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
  }  
});

module.exports = router;
