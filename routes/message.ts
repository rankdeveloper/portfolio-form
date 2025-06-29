const express = require("express");
const router = express.Router();
const { postMessage } = require("../controllers/message");

router.post("/", postMessage);

module.exports = router;
