"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const [value, setValue] = useState("");

  const socketInitializer = async () => {
    // We call this just to make sure we turn on the websocket server
    await fetch("./socket");

    socket = io("winubuntu:8881", {
      path: "./socket",
    });

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("message", (msg) => {
      console.log("New message in client", msg);
      setValue(msg);
    });
  };

  const sendMessageHandler = async (e) => {
    const val = e.target.value;
    console.log(val, socket);
    if (!socket) return;

    socket.emit("message", val);
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-8 items-center justify-start p-24 bg-pink-50">
      <p>
        In the console & network tabs, you can see the issue that on the latest
        next.js canary its not able to connect to socket.io server.
      </p>
      <p>
        But it will start working if we switch back to 13.2.5-canary.26 version
        or lower version.
      </p>
      <input
        onChange={sendMessageHandler}
        className="w-full h-12 px-2 mt-auto rounded"
        placeholder="Enter some text and see the syncing of text in another tab"
      />
    </main>
  );
}
