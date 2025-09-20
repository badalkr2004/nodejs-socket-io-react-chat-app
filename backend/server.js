import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const ROOM = "group";

app.use(cors());
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("joinRoom", async (userName) => {
    console.log(`${userName} joined the room`);
    await socket.join(ROOM);

    // send to all
    // io.to(ROOM).emit("roomNotice", userName);

    // Brodcast to all
    socket.to(ROOM).emit("roomNotice", userName);
  });

  socket.on("chatMessage", (msg) => {
    socket.to(ROOM).emit("chatMessage", msg);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(4600, () => {
  console.log("Server running at http://localhost:4600");
});
