const URL_DB =
  "mongodb+srv://kazak_admin_helol:ISnfNsRJElNkAtb6@cluster0.tjxko.mongodb.net/shop";

const path = require("path");
const csrf = require("csurf");
const express = require("express");
const exphds = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const addRoutes = require("./routes/add");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const ordersRoutes = require("./routes/orders");
const coursesRoutes = require("./routes/courses");

const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");

const mongoose = require("mongoose");

const app = express();
const hbs = exphds.create({
  defaultLayout: "main",
  extname: "hbs",
});

const store = new MongoStore({
  collection: "sessions",
  uri: URL_DB,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(csrf());
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/auth", authRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/courses", coursesRoutes);

async function start() {
  try {
    await mongoose.connect(URL_DB, { useNewUrlParser: true });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

start();
