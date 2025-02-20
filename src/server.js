const express = require("express"); // commonjs
require("dotenv").config();
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");
const connection = require("./config/database");
const User = require("./models/user");

const app = express(); //app express
const port = process.env.PORT || 8888; //0 - 65535 not 21,23,80,443
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//declare route
//app.METHOD(PATH,HANDLER)

app.use("/", webRouter);
app.use("/v1/api/", apiRouter);

(async () => {
  //test connection
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`app listening at port ${port}`);
    });
  } catch (error) {
    console.log(">>>Error connect to db:", error);
  }
})();
