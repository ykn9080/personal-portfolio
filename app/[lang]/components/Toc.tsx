"use client";

import React, { useEffect } from "react";
import $ from "jquery";

export default function Toc() {
  useEffect(() => {
    $("#dvToc").append($("#contents + ul")).prepend($("#contents"));
  }, []);
  return <div id="dvToc" className="mt-3 sticky top-0 bg-white"></div>;
}
