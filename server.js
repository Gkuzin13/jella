const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");

// if (process.env.NODE_ENV === "development") {
require("dotenv").config();
// }

// Use passport config
const initialize = require("./config/passportConfig");
initialize(passport);

const homeRouter = require("./routes/api/homeRouter");
const boardRouter = require("./routes/api/boardRouter");
const listRouter = require("./routes/api/listRouter");
const cardRouter = require("./routes/api/cardRouter");

const app = express();

const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ credentials: true, origin: "https://jella-app.onrender.com" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: "sessions",
  }),
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", homeRouter);
app.use("/api", boardRouter);
app.use("/api", listRouter);
app.use("/api", cardRouter);

app.listen(port, () => {
  // Get db connection
  require("./config/mongoConfig");
  console.log(`Server is running on port: ${port}`);
});
