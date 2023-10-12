"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { winProcess, namProcess } from "@/lib/childprocess";
import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/javascript";
import { LoadingScreen } from "@/app/[lang]/LoadingScreen";

export default function Search({ script }: LabelProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [result, setResult] = useState("");
  const [server, setServer] = useState("winubuntu");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    //setSearch("");
    //router.push(`/${search}/`);
    let rtn;
    if (server === "namubuntu") rtn = await namProcess({ script: search });
    else rtn = await winProcess({ script: search });
    //rtn.result = rtn.result.replace(/\n/g, "<br />");
    hljs.registerLanguage("javascript", html);
    const highlighted = hljs.highlight(rtn.result, {
      language: "javascript",
    }).value;
    setResult(highlighted);
    setLoading(false);
  };
  const onChange = (svr: string) => {
    setServer(svr);
    console.log(svr);
  };
  return (
    <div>
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
        <Radiobtn onChange={onChange} />
        <button className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">
          🚀
        </button>
      </form>
      <h3>Result</h3>

      <div className="w-full">
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

type LabelProps = {
  script: string;
  server: string;
  txt: string;
};
export function SearchLabel({ script, server, txt }: LabelProps) {
  const [search, setSearch] = useState("");
  const [txtcomment, setTxtcomment] = useState("");
  const router = useRouter();
  const [result, setResult] = useState<any | null>();
  const [serverName, setServerName] = useState("winubuntu");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (script) {
      setSearch(script);
    }
    if (server) setServerName(server);
    if (txt) setTxtcomment(txt);
  }, [script, server, txt]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    let rtn;
    if (serverName === "namubuntu") rtn = await namProcess({ script: search });
    else rtn = await winProcess({ script: search });
    hljs.registerLanguage("javascript", html);
    const highlighted = hljs.highlight(rtn.result, {
      language: "javascript",
    }).value;
    setResult(highlighted);
    setLoading(false);
  };
  if (isLoading) return <LoadingScreen />;
  return (
    <div>
      <div className="flex flex-row space-x-2">
        {txt ? (
          <label className="p-2 grow text-base">{txtcomment}</label>
        ) : (
          <label className="p-2 grow text-base rounded-base bg-slate-50">
            {search}
          </label>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded grow-0"
          onClick={handleClick}
        >
          Run
        </button>
      </div>

      <div className="w-full">
        {result && (
          <pre>
            <code
              className="language-html hljs"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </pre>
        )}
      </div>
    </div>
  );
}
const Radiobtn = ({ onChange }: any) => {
  const [server, setServer] = useState("winubuntu");
  return (
    <div className="flex flex-row items-center">
      <input
        type="radio"
        name="topping"
        value="winubuntu"
        id="regular"
        checked={server === "winubuntu"}
        onChange={(e) => {
          setServer(e.target.value);
          onChange(e.target.value);
        }}
      />
      <label htmlFor="regular">winubuntu</label>

      <input
        type="radio"
        name="topping"
        value="namubuntu"
        id="medium"
        checked={server === "namubuntu"}
        onChange={(e) => {
          setServer(e.target.value);
          onChange(e.target.value);
        }}
      />
      <label htmlFor="medium">namubuntu</label>
    </div>
  );
};
