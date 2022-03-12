const { Router } = require("express");
const router = Router();

const Todo = require("../models/todo");

router.get("/",  async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json({todos});
  } catch (error) {
    console.log("Create todo error - ", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      done: false,
    });

    res.status(201).json({ todo });
  } catch (error) {
    console.log("Create todo error - ", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
