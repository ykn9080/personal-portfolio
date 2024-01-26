// App.js
"use client";

import React, { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenPopup = () => {
    const popup = window.open(
      "http://imcmaster.iptime.org:30001",
      "네이버",
      "popup=yes"
    );
  };

  return (
    <div>
      <h1>hello</h1>
      <button onClick={handleOpenPopup}>팝업 열기</button>
    </div>
  );
}

export default App;
