const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const routerTodo = require("./routes/todo");
const app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + "/dist/"));
app.use("/api/todo", routerTodo);
app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

async function start() {
  try {
    await sequelize.sync();
    app.listen(process.env.PORT || 8080, () =>
      console.log(`listening on http://localhost:${process.env.PORT || 8080}`)
    );
  } catch (error) {
    console.log("Connect error in DB - ", error);
  }
}

start();
