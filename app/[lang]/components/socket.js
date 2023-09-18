import { Server } from "socket.io";
import onSocketConnection from "@/app/helpers/onSocketConnection";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Server already started!");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "./socket",
    addTrailingSlash: false,
  });
  res.socket.server.io = io;

  const onConnection = (socket) => {
    console.log("New connection", socket.id);
    onSocketConnection(io, socket);
  };

  io.on("connection", onConnection);

  console.log("Socket server started successfully!");
  res.end();
}
