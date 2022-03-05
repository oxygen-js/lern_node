const path = require("path");
const express = require("express");
const exphds = require("express-handlebars");
const User = require("./models/user");

const addRoutes = require("./routes/add");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const coursesRoutes = require("./routes/courses");

const mongoose = require("mongoose");


const app = express();
const hbs = exphds.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, resm, next) => {
  try {
    const user = await User.findById("62221f3e02d1bfd8b42a87e9").lean();
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }

});

app.use(express.static( path.join(__dirname, "public") ));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://kazak_admin_helol:ISnfNsRJElNkAtb6@cluster0.tjxko.mongodb.net/shop",
      { useNewUrlParser: true }
    );

    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "89170777282a@mail.ru",
        name: "kazak",
        cart: { items: [] }
      })

      await user.save();
    }
  
    /** Server */
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
}

start();
