const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const auth = require("../middleware/auth");
const { validationResult } = require("express-validator");
const { courseValidators } = require("../utils/validators");

router.get("/", async (req, res) => {
  const courses = await Course.find().lean();
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses,
  });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id).lean();
  res.render("course", {
    title: `Course: ${course.title}`,
    course,
  });
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const course = await Course.findById(req.params.id).lean();
  res.render("course-edit", {
    title: `Edit course - ${course.title}`,
    course,
  });
});

router.post("/edit", auth, courseValidators, async (req, res) => {
  const { id } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }

  try {
    await Course.findByIdAndUpdate(id, req.body).lean();

    res.redirect("/courses");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
