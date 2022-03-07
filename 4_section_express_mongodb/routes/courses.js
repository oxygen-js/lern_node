const {Router} = require("express");
const router = Router();
const Course = require("../models/course");

/** 
 * GET 
 * */

router.get("/", async (req, res) => {
  const courses = await Course.find().lean();
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses
  });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id).lean();
  res.render("course", {
    title: `Course: ${course.title}`,
    course
  });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  } 

  const course = await Course.findById(req.params.id).lean();
  res.render("course-edit", {
    title: `Edit course - ${course.title}`,
    course
  })
});


/** 
 * POST 
 * */

router.post("/edit", async (req, res) => {
  const {id} = req.body;
  await Course.findByIdAndUpdate(id, req.body).lean();

  res.redirect("/courses");
});

router.post("/remove", async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
    throw new Error(error)
  } 
});

module.exports = router;
