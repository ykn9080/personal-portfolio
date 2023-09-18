"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(async () => {
    console.log("Connecting to WebSocket server...");

    const newSocket = io("http://winubuntu:8881");
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    newSocket.on("message", (newMessage) => {
      console.log("Received message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    setSocket(newSocket);
    // Clean up the socket connection on unmount
    return () => {
      console.log("Disconnecting from WebSocket server...");
      newSocket.disconnect();
    };
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit("message", message);
      console.log(message, socket);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
