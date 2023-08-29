"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { childProcess } from "@/lib/childprocess";
import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/javascript";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [result, setResult] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //setSearch("");
    //router.push(`/${search}/`);
    let rtn = await childProcess({ script: search });

    //rtn.result = rtn.result.replace(/\n/g, "<br />");
    hljs.registerLanguage("javascript", html);
    const highlighted = hljs.highlight(rtn.result, {
      language: "javascript",
    }).value;
    setResult(highlighted);
  };

  return (
    <div className="container mx-auto my-10">
      <form
        className="w-50 flex justify-center md:justify-between"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white p-2 w-80 text-xl rounded-xl"
          placeholder="Search"
        />
        <button className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">
          🚀
        </button>
      </form>
      <h1>Result</h1>

      <div className="bg-black-900 w-full">
        <pre>
          <code
            className="language-html hljs"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </pre>
      </div>
    </div>
  );
}
