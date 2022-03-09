const { Router } = require("express");
const router = Router();
const Order = require("../models/order");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id })
      .lean()
      .populate("user.userId")
      .exec();

    res.render("orders", {
      isOrder: true,
      title: "Orders",
      orders: orders.map((x) => {
        return {
          ...x,
          price: x.courses.reduce(
            (total, item) => (total += item.count * item.course.price),
            0
          ),
        };
      }),
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.courseId");
    const courses = user.cart.items.map((x) => {
      return {
        count: x.count,
        course: { ...x.courseId },
      };
    });

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    });

    await order.save();
    await req.user.clearCart();

    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
