import { createServer } from "node:http";
import { Server } from "socket.io";
``;
import express from "express";

const app = express();
const server = createServer(app);

server.listen(4600, () => {
  console.log("Server running at http://localhost:3000");
});
