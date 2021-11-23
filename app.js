const express = require("express");
var path = require("path");
var serveStatic = require("serve-static");

const app = express();
const port = 3000;

// app.use("/static", express.static("public"));
app.use(serveStatic(path.join(__dirname, "public")));
app.listen(port);
