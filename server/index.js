const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;
var app = express();

app.set("port", port);
app.use(bodyParser.json({ limit: "100MB" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

require("./routes")(app);

var server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");

      process.exit(1);

      break;

    case "EADDRINUSE":
      console.error(bind + " is already in use");

      process.exit(1);

      break;

    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();

  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  console.log("Listening on " + bind);
}
