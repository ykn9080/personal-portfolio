"use client";
import React, { useState, useEffect } from "react";
import executeSocketXp from "@/lib/socketxp";

export default async function SocketXp() {
  const [command, setCommand] = useState(null);
  const [result, setResult] = useState(null);



  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
    <div>
      <div className="container mx-auto">
        <h1>Command</h1>
        {/* 👇 wire-up the handleSubmit handler */}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter your command script"
            name="command"
            // 👇 wire-up the controlled state
            value={command}
            onChange={(e: FormEvent) => setCommand(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        {/* show the data returned by the api */}
        Result
        <pre>{JSON.stringify(result, null, 4)}</pre>
      </div>

      <h2>결과</h2>
      <pre>{JSON.stringify(result, null, 4)}</pre>
    </div>
  );
}
