const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    const name = String(username || "Guest").trim() || "Guest";
    socket.username = name;
    onlineUsers[socket.id] = name;

    io.emit("users", Object.values(onlineUsers));

    io.emit("message", {
      user: "System",
      text: `${name} joined the chat`,
      time: Date.now(),
    });
  });

  socket.on("typing", (isTyping) => {
    if (!socket.username) return;
    socket.broadcast.emit("typing", {
      user: socket.username,
      typing: Boolean(isTyping),
    });
  });

  socket.on("message", (text) => {
    if (!socket.username) return;

    io.emit("message", {
      user: socket.username,
      text: String(text || "").slice(0, 500),
      time: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    const name = onlineUsers[socket.id];
    if (name) {
      delete onlineUsers[socket.id];
      io.emit("users", Object.values(onlineUsers));
      io.emit("message", {
        user: "System",
        text: `${name} left the chat`,
        time: Date.now(),
      });
    }
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
