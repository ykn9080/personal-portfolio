"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { winProcess, namProcess } from "@/lib/childprocess";
import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/javascript";
//import "@/styles/highlight-js/atom-one-light.css";
import "@/styles/highlight-js/github-dark.css";
//import "@/styles/highlight-js/night-owl.css";
//import "highlight.js/styles/night-owl.css";
//import "highlight.js/styles/github-dark.css";
//import "highlight.js/styles/default.css";
import { LoadingScreen } from "@/app/[lang]/LoadingScreen";
import "@/styles/cover-spin.css";
import { generate } from "@/lib/mdxToHtml";

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

interface LabelProps {
  script: string;
  server: string;
  txt: string;
}
interface LabelProps1 extends LabelProps {
  script1: string | null;
}
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
              className="language-html hljs w-full"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </pre>
        )}
      </div>
    </div>
  );
}

export function SearchShow({ script, script1, server, txt }: LabelProps1) {
  const [search, setSearch] = useState("");
  const [exescript, setExescript] = useState<string | null>();
  const [txtcomment, setTxtcomment] = useState("");
  const [codecomment, setCodecomment] = useState("");
  const router = useRouter();
  const [result, setResult] = useState<any | null>();
  const [executed, setExecuted] = useState<any | null>();
  const [serverName, setServerName] = useState("winubuntu");
  const [isLoading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (script) {
      setSearch(script);
    }
    if (script1) {
      setExescript(script1);
    }
    if (server) setServerName(server);
    if (txt) setTxtcomment(txt);
    async function fetch() {
      const rtn = await handleClick(script);

      setResult(rtn);
    }
    fetch();
  }, [script, server, txt]);

  const handleClick = async (script: String | null | undefined) => {
    setLoading(true);
    if (!script) return;
    let rtn;
    if (serverName === "namubuntu") rtn = await namProcess({ script });
    else rtn = await winProcess({ script });
    if (rtn) {
      const rtnArr = rtn.result.split('"""');
      if (rtnArr.length > 1) setCodecomment(rtnArr[1]);
      rtn.result = rtnArr[0];
    }
    hljs.registerLanguage("javascript", html);

    const highlighted = hljs.highlight(rtn.result, {
      language: "javascript",
    }).value;

    setLoading(false);
    return highlighted;
  };
  const handleExecute = async () => {
    setToggle(false);
    if (!executed) {
      const rtn = await handleClick(exescript);
      setExecuted(rtn);
    }
  };

  const btnClass =
    " float-right hover:bg-gray-400 text-gray-800 font-bold px-1 rounded inline-flex items-center mr-2 my-1";

  return (
    <div>
      <div className="w-full">
        <div dangerouslySetInnerHTML={{ __html: codecomment }}></div>
        <pre>
          {exescript && (
            <>
              <button
                onClick={handleExecute}
                className={`${btnClass} ${
                  !toggle ? "bg-gray-300" : "bg-gray-600"
                }`}
              >
                result
              </button>
              <button
                onClick={() => setToggle(true)}
                className={`${btnClass} ${
                  toggle ? "bg-gray-300" : "bg-gray-600"
                }`}
              >
                code
              </button>
            </>
          )}
          <code
            className="language-html hljs w-full"
            dangerouslySetInnerHTML={{ __html: toggle ? result : executed }}
          />
          {isLoading && <LoadingScreen />}
        </pre>
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
