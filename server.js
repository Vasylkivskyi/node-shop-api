const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const productsRouter = require("./api/routes/products");
const ordersRouter = require("./api/routes/orders");

const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
// Used to encode submitted data from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Used to encode json data
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  // Gives access to any client (you can replace "*" with your site url)
  res.header("Access-Control-Allow-Origin", "*");
  // Defines with kind of headers we want to accept
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization", // if all => replace with '*'
  );
  // Browser always sends OPTIONS request first than you send POST requests
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, PATCH, POST, DELETE", // Specify with methods your API allows
    );
    return res.status(200).json({}); // From here we don't want to go to our routes
  }
  next();
});

// Routes
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// Handling all other routes with not found error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Custom errors middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App running on ${port} 🎉`));
