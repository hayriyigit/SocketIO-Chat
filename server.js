const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/rooms", (req, res) => {
  res.sendFile(__dirname + "/public/rooms.html");
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("connection_message", (data) => {
    io.emit("connect_message", data);
  });

  socket.on("disconnect", () => {
    io.emit("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
