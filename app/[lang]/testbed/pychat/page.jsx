"use client";

import React, { useEffect, useState } from "react";
import _ from "lodash";
import { io } from "socket.io-client";

const socket = io("http://winubuntu:8833", {
  path: "/sockets",
});

export default function Page() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(socket.connected);
    });

    socket.on("disconnect", () => {
      setIsConnected(socket.connected);
    });

    socket.on("join", (data) => {
      setMessages((prevMessages) =>
        _.uniqBy(
          [...prevMessages, { ...data, type: "join" }],
          (o) => o.type && o.sid
        )
      );
    });
    socket.on("left", (data) => {
      setMessages((prevMessages) =>
        _.uniqBy(
          [...prevMessages, { ...data, type: "left" }],
          (o) => o.type && o.sid
        )
      );
    });

    socket.on("chat", (data) => {
      setMessages((prevMessages) =>
        _.uniqBy(
          [...prevMessages, { ...data, type: "chat" }],
          (o) => o.type && o.sid && o.message
        )
      );
    });
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (message && message.length) {
      socket.emit("chat", message);
    }
    var messageBox = document.getElementById("message");
    messageBox.value = "";
    setMessage("");
  };

  return (
    <>
      <p className="text-xl font-semibold ml-3 mt-10">
        status:{isConnected ? "connected" : "disconnected"}
      </p>
      <div className="overflow-y-auto m-3 p-5 flex flex-col h-96 border-solid border-2 border-sky-500">
        {messages.map((message, index) => {
          console.log(message, index);
          return <Message message={message} key={index} />;
        })}
      </div>
      <div className="flex flex-row space-x-2 mx-3 my-10">
        <input
          type="text"
          className="p-2 grow text-base rounded-base bg-slate-50"
          id="message"
          onChange={(event) => {
            const value = event.target.value.trim();
            setMessage(value);
          }}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          onClick={onSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded grow-0"
        >
          Send
        </button>
      </div>
    </>
  );
}

const Message = ({ message }) => {
  if (message.type === "join")
    return (
      <div>
        <p>{`${message.sid} just joined`}</p>
      </div>
    );
  if (message.type === "left")
    return (
      <div>
        <p>{`${message.sid} just left`}</p>
      </div>
    );
  if (message.type === "chat")
    return (
      <div>
        <p>{`${message.sid}: ${message.message}`}</p>
      </div>
    );
};
