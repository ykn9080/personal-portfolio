"use client";

import React, { useState } from "react";
import MyListBox from "../../components/ListBox";
import { updateValue } from "@/redux/features/globalSlice";
import { openaiCall } from "@/lib/openai";
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
