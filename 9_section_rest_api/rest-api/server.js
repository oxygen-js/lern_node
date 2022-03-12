const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(express.static(__dirname + "/dist/"));

app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
