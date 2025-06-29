const express = require("express");
const app = express();
require("dotenv").config();
const messageRouter = require("./routes/message");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/message", messageRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
