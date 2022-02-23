const path = require("path");
const express = require("express");
const exphds = require("express-handlebars");

const addRoutes = require("./routes/add");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const coursesRoutes = require("./routes/courses");

const mongoose = require("mongoose");


const app = express();
const hbs = exphds.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static( path.join(__dirname, "public") ));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://kazak_admin_helol:ISnfNsRJElNkAtb6@cluster0.tjxko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
  
    /** Server */
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
}

start();
