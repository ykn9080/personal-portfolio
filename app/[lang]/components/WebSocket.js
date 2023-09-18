import React, { useState } from "react";
import WebSocketClient from "./WebSocketClient";

const MyPage = () => {
  const [data, setData] = useState([]);

  const handleDataReceived = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  return (
    <div>
      {/* Render your data */}
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}

      {/* Use the WebSocketClient component */}
      <WebSocketClient onDataReceived={handleDataReceived} />
    </div>
  );
};

export default MyPage;
