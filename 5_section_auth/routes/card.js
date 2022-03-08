const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const user = await req.user.populate("cart.items.courseId");
  const courses = mapCartItems(user.cart);

  res.render("card", {
    title: "Card",
    isCard: true,
    courses,
    price: computePrice(courses),
  });
});

router.post("/add", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.body.id).lean();
    await req.user.addToCart(course);
    res.redirect("/card");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove/:id", auth, async (req, res) => {
  await req.user.deleteFromCart(req.params.id);
  const user = await req.user.populate("cart.items.courseId");
  const courses = mapCartItems(user.cart);
  const cart = { courses, price: computePrice(courses), csrf: req.csrfToken() };

  res.status(200).json(cart);
});

function mapCartItems(cart) {
  return cart.items.map((x) => ({
    ...x.courseId._doc,
    count: x.count,
    id: x.courseId.id,
  }));
}

function computePrice(courses) {
  return courses.reduce(
    (total, course) => (total += course.price * course.count),
    0
  );
}

module.exports = router;
