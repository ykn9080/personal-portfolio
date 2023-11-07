"use client";

import React, { useEffect } from "react";
import $ from "jquery";

export default function Toc() {
  useEffect(() => {
    $("#dvToc").append($("#contents + ul")).prepend($("#contents"));
  }, []);
  return <div id="dvToc" className="mb-1 sticky top-0"></div>;
}
