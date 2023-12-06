"use client";

import React, { useState } from "react";
import MyListBox from "../../components/ListBox";
import { updateValue } from "@/redux/features/globalSlice";
import { openaiCall, dalliCall, chatCall } from "@/lib/openai";
import { useAppSelector } from "@/redux/hooks";

export default function Page({ tags }: any) {
  const [tagname, setTagname] = useState();
  const [currentMsg, setCurrentMsg] = useState("");
  const [rspMsg, setRspMsg] = useState("");

  const taglist = useAppSelector((state) => state.global).tags;
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rtn = await openaiCall({ script: currentMsg });
    console.log(rtn);
    setRspMsg(rtn.content);
  };
  return (
    <div>
      <form onSubmit={(e) => sendData(e)}>
        {/* <MyListBox tags={tags} /> */}
        <input
          type="text"
          value={currentMsg}
          placeholder="Type your message.."
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button>Send</button>
      </form>
      <div>{rspMsg}</div>
    </div>
  );
}

export function Dalli({ prompt }: any) {
  const [promptname, setPromptname] = useState("");
  const [currentMsg, setCurrentMsg] = useState("tiger with trainer");
  const [rspMsg, setRspMsg] = useState("");

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rtn = await dalliCall({ prompt: currentMsg });
    console.log(rtn);
    setRspMsg(rtn.data[0].url);
  };
  return (
    <div>
      <form onSubmit={(e) => sendData(e)}>
        {/* <MyListBox tags={tags} /> */}
        <input
          type="text"
          value={currentMsg}
          placeholder="Type your message.."
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button>Send</button>
      </form>
      <div>
        <img src={rspMsg} />
      </div>
    </div>
  );
}

export function Chatbot({ prompt }: any) {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You're like a grammar-checking wizard, helping users fix grammar bloopers and jazz up their sentence structures.",
    },
  ]);

  const [currentMsg, setCurrentMsg] = useState("tiger with trainer");
  const [rspMsg, setRspMsg] = useState("");
  const handleSendMessage = (messageContent: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: messageContent },
    ]);
  };
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg.trim() !== "") {
      handleSendMessage(currentMsg);
      setCurrentMsg("");
    }
    const rtn = await chatCall({ prompt: messages });
    setRspMsg(rtn.choices[0].message.content);
  };
  return (
    <>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <h3>{message.role}</h3>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => sendData(e)}>
        <input
          type="text"
          name="input"
          value={currentMsg}
          placeholder="Type your message..."
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
