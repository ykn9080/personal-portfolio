"use client";

import React, { useEffect } from "react";
import $ from "jquery";

export default function Toc() {
  useEffect(() => {
    $("#dvToc").append($("#contents + ul")).prepend($("#contents"));

    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (let entry of entries) {
        const { id } = entry.target;
        const enid = encodeURI(id);
        const tocHeadingEl = document.querySelector(
          `#dvToc a[href="#${enid}"]`
        );

        if (!tocHeadingEl) return;
        if (entry.isIntersecting) {
          document
            .querySelectorAll("#dvToc a")
            .forEach((e) => e.classList.remove("active"));
          tocHeadingEl.classList.add("active");
        }
      }
    };
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px 0px -96%",
    };
    const observer = new IntersectionObserver(setCurrent, observerOptions);

    document.querySelectorAll("h2, h3, h4, h5, h6").forEach((entries) => {
      observer.observe(entries);
    });
  }, []);
  return <div id="dvToc" className="mt-3 sticky top-8 "></div>;
}
