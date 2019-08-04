const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const multer = require("multer");
// databse config
mongoose
  .connect(
    "mongodb+srv://syedsultan:123098@cluster0-pgsyx.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(_ => console.log("databse is  connected"))
  .catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 3001;

// middlwares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "..", "public", "hello.html"));
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
// routes
routes(app);

app.listen(port, () => console.log(`the app is listening at port${port}`));
