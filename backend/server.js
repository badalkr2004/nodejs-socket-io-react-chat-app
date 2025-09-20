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

app.use(cors());
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(4600, () => {
  console.log("Server running at http://localhost:4600");
});
