const {Router} = require("express");
const router = Router();
const Course = require("../models/course");


function mapCartItems(cart) {
  return cart.items.map(x => ({
    ...x.courseId._doc,
    count: x.count,
    id: x.courseId.id
  }) );
}

function computePrice(courses) {
  return courses.reduce((total, course) => total += course.price * course.count, 0);
}

router.post("/add", async (req, res) => {
  try {
    const course = await Course.findById(req.body.id).lean();
    await req.user.addToCart(course);
    res.redirect("/card");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const user = await req.user.populate("cart.items.courseId");
  const courses = mapCartItems(user.cart);

  res.render("card", {
    title: "Card",
    isCard: true,
    courses,
    price: computePrice(courses),
  })
});

router.delete("/remove/:id", async (req, res) => {
  await req.user.deleteFromCart(req.params.id);
  const user = await req.user.populate("cart.items.courseId");
  const courses = mapCartItems(user.cart);
  const cart = { courses, price: computePrice(courses) };

  res.status(200).json(cart);
});


module.exports = router;
