const { Router } = require("express");
const router = Router();

const Course = require("../models/course");

router.post("/add", async (req, res) => {
	try {
		const course = await Course.getById(req.body.id);
		await req.user.addToCart(course);

		res.redirect("/card");
	} catch (error) {
		console.log(error);
	}
});

router.get("/", async (req, res) => {
	// const card = await Card.get();

	// res.render("card", {
	// 	title: "Card",
	// 	isCard: true,
	// 	courses: card.courses,
	// 	price: card.all_price
	// })

	res.json({test: "test"})
});

router.delete("/remove/:id", async (req, res) => {
	const card = await Card.remove(req.params.id);

	res.status(200).json(card);
});

module.exports = router;
