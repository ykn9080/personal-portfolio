import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className=" dark:text-white">
      <p>Other List</p>
      <ul>
        {[{ title: "one" }, { title: "two" }].map((k, i) => {
          //const slug = `/${urlarr[1]}/${k.slug}`
          //let current = ""
          //if (urlarr[2] === k.slug) current = "selected"
          const slug = "/";
          return (
            <li>
              <Link href={slug}>{k.title}</Link>
            </li>
          );
        })}
      </ul>
      <ul>
        {[
          { title: "one", url: "/" },
          { title: "two", url: "https://naver.com" },
        ].map((ah, i) => {
          return (
            <li>
              <Link
                href={ah.url}
                alt="showsite"
                target="_blank"
                title={ah.title}
              >
                {ah.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <h6>youtube</h6>
      {/* {videoTitle &&
                  videoTitle.split(";").map((title, j) => {
                    return <a href={`#showyoutube_${j}`}>{title}</a>
                  })} */}
    </div>
  );
}
