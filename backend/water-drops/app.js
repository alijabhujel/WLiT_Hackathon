var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var workShopRouter = require("./routes/workshop");

var filtrationRouter = require("./routes/filtration");
var campaignRoutes = require("./routes/campaign");

var mongoose = require("mongoose");

const cors = require("cors");

const PORT = process.env.PORT || 5000;
var app = express();
mongoose.connect("mongodb://localhost/Pure_drop").then(() => {
  console.log("connected to db  ");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual origin of your frontend
  })
);

app.use("/", indexRouter);

app.use("/workshop", workShopRouter);
app.use("/campaign", campaignRoutes);
app.use("/filtration", filtrationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
