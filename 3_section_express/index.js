const path = require("path");
const express = require("express");
const exphds = require("express-handlebars");

const app = express();
const hbs = exphds.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.get('/', (req, res, next) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
})



/** Server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
