const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route
require("./app/routes/customer.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/price.routes")(app);
require("./app/routes/subscription.routes")(app);
require("./app/routes/report.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`MicroService Server is running on port ${PORT}.`);
});
