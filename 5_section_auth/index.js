const path = require("path");
const express = require("express");
const exphds = require("express-handlebars");
const session = require("express-session");

const User = require("./models/user");

const addRoutes = require("./routes/add");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const ordersRoutes = require("./routes/orders");
const coursesRoutes = require("./routes/courses");

const varMiddleware = require("./middleware/variables");

const mongoose = require("mongoose");

const app = express();
const hbs = exphds.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    req.user = await User.findById("6225bfb6e77d6196dd1ee736");
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "some secret value",
  resave: false,
  saveUninitialized: false
}));

app.use(varMiddleware);

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/auth", authRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/courses", coursesRoutes);

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
        cart: { items: [] },
      });

      await user.save();
    }

    /** Server */
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
