"use client";
import React, { useState, FormEvent } from "react";
import executeSocketXp from "@/lib/socketxp";

export default async function SocketXp() {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rtn = await executeSocketXp(
      // "echo 'This is the content of the file.' > /home/yknam/helloconfig"
      //"/usr/local/hadoop/bin/hadoop jar /home/yknam/IdeaProjects/mapreduce/target/mapreduce-1.0.0.jar /data/wordSample.txt /output"
      //"/usr/local/hadoop/bin/hadoop fs -rm -r /outpu"
      command
    );
    setResult(rtn);
  };

  return (
    <div className="container mx-auto">
      <h1>Command</h1>
      {/* 👇 wire-up the handleSubmit handler */}
      <form
        className="w-50 flex justify-center md:justify-between"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Enter your command script"
          name="command"
          className="bg-white p-2 w-80 text-xl rounded-xl"
          value={command}
          onChange={(e) => {
            console.log(e.target.value);
            setCommand(e.target.value);
          }}
        />
        <button className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">
          Send
        </button>
      </form>
      {/* show the data returned by the api */}
      Result
      <pre>{JSON.stringify(result, null, 4)}</pre>
    </div>
  );
}
