const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const sequelize = require("./utils/database");

app.use(bodyParser.json());

app.use(express.static(__dirname + "/dist/"));

app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

async function start() {
  try {
    await sequelize.sync();
    app.listen(port, () =>
      console.log(`listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.log("Connect error in DB - ", error);
  }
}

start();
