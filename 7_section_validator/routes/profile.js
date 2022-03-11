const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.render("profile", {
    title: "Profile",
    isprofile: true,
    user: req.user.toObject(),
  });
});

router.post("/", (req, res) => {});

module.exports = router;
