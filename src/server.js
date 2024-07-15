const express = require("express");
require("dotenv").config();
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const apiRouter = require("./routes/api");
const projectRouter = require("./routes/project");
const taskRouter = require("./routes/task");
const { connection } = require("./config/database");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config fileupload
app.use(fileUpload());

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//declare route
app.use("/", webRouter);
app.use("/v1/api/", apiRouter);
app.use("/v1/api/", projectRouter);
app.use("/v1/api/", taskRouter);

(async () => {
  //test connection
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`App listening at port ${port}`);
    });
  } catch (error) {
    console.log(">>>Error connect to db:", error);
  }
})();
