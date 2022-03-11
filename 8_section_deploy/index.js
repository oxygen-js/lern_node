const path = require("path");
const csrf = require("csurf");
const helmet = require("helmet");
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const exphds = require("express-handlebars");
const MongoStore = require("connect-mongodb-session")(session);

const addRoutes = require("./routes/add");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const ordersRoutes = require("./routes/orders");
const coursesRoutes = require("./routes/courses");
const profileRoutes = require("./routes/profile");

const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const fileMiddleware = require("./middleware/file");
const errorHandlerMiddleware = require("./middleware/error");

const keys = require("./keys");

const mongoose = require("mongoose");

const app = express();
const hbs = exphds.create({
  defaultLayout: "main",
  extname: "hbs",
});

const store = new MongoStore({
  collection: "sessions",
  uri: keys.URL_DB,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(fileMiddleware.single("avatar"));
app.use(csrf());
app.use(flash());
app.use(helmet());
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/auth", authRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/courses", coursesRoutes);
app.use("/profile", profileRoutes);

app.use(errorHandlerMiddleware);

async function start() {
  try {
    await mongoose.connect(keys.URL_DB, { useNewUrlParser: true });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

start();
