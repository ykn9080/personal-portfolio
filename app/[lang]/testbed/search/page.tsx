"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { winProcess, namProcess } from "@/lib/childprocess";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
//import "@/styles/highlight-js/atom-one-light.css";
import "@/styles/highlight-js/github-dark.css";
//import "@/styles/highlight-js/night-owl.css";
//import "highlight.js/styles/night-owl.css";
//import "highlight.js/styles/github-dark.css";
//import "highlight.js/styles/default.css";
import { LoadingScreen } from "@/app/[lang]/LoadingScreen";
import "@/styles/cover-spin.css";
import { elasticscript } from "./data";
import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export default function Search({ script }: LabelProps) {
  const [search, setSearch] = useState(script);
  const router = useRouter();
  const [result, setResult] = useState("");
  const [serverName, setServerName] = useState("winubuntu");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    //setSearch("");
    //router.push(`/${search}/`);
    let rtn;
    if (serverName === "namubuntu") rtn = await namProcess({ script: search });
    else rtn = await winProcess({ script: search });
    //rtn.result = rtn.result.replace(/\n/g, "<br />");
    hljs.registerLanguage("javascript", javascript);
    const highlighted = hljs.highlight(rtn.result, {
      language: "javascript",
    }).value;
    setResult(highlighted);
    setLoading(false);
  };
  const onChange = (svr: string) => {
    setServerName(svr);
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
  type: string;
}
interface LabelProps1 extends LabelProps {
  script1: string | null;
  type1: string;
}
interface LabelProps2 {
  filename: keyof Ielasticscript;
  script1: string;
  type: string;
  type1: string;
}
interface LabelProps3 {
  data: string;
  type: string;
}
export function SearchLabel({ script }: LabelProps) {
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
  }, [script]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    let rtn;
    if (serverName === "namubuntu") rtn = await namProcess({ script: search });
    else rtn = await winProcess({ script: search });

    hljs.registerLanguage("javascript", javascript);
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
        <label className="p-2 grow text-base rounded-base bg-slate-50">
          {search}
        </label>

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

export function SearchShow({ script, script1, type, type1 }: LabelProps1) {
  const [search, setSearch] = useState("");
  const [exescript, setExescript] = useState<string | null>();
  const [ftype, setFtype] = useState(type);
  const [ftype1, setFtype1] = useState(type1);
  const [result, setResult] = useState<any | null>();
  const [result1, setResult1] = useState<any | null>();
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
    async function fetch() {
      const rtn = await handleClick(script, type);

      setResult(rtn);
    }
    fetch();
  }, [script, type]);

  const handleClick = async (
    script: String | null | undefined,
    filetype: String
  ) => {
    setLoading(true);
    if (!script) return;
    let rtn = await winProcess({ script });

    hljs.registerLanguage("javascript", javascript);

    setLoading(false);

    if (filetype === "json") {
      return JSON.parse(rtn.result);
    }
    const highlighted = hljs.highlight(rtn.result, {
      language: "javascript",
    }).value;

    return highlighted;
  };
  const handleExecute = async () => {
    setToggle(false);
    if (!executed) {
      const rtn = await handleClick(exescript, ftype1);
      setExecuted(rtn);
    }
  };

  const btnClass =
    " float-right hover:bg-gray-400 text-gray-800 font-bold px-1 rounded inline-flex items-center mr-2 my-1";

  return (
    <div className="w-full mxheight">
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
        <Display
          data={toggle ? result : executed}
          type={toggle ? ftype : ftype1}
        />
        {isLoading && <LoadingScreen />}
      </pre>
    </div>
  );
}

function Display({ data, type }: LabelProps3) {
  if (type === "json") {
    console.log(data);
    return (
      <JsonView data={data} shouldExpandNode={allExpanded} style={darkStyles} />
    );
  }
  return (
    <code
      dangerouslySetInnerHTML={{
        __html: data,
      }}
    />
  );
}

interface Ielasticscript {
  mappings_update: string | undefined;
  reindex: string | undefined;
  index_template: string | undefined;
  reindex_template: string | undefined;
  painless: string | undefined;
  pipeline: string | undefined;
}

export function SearchScript({ filename, type, script1, type1 }: LabelProps2) {
  const [exescript, setExescript] = useState<string | null>();
  const [result, setResult] = useState<any | null>();
  const [executed, setExecuted] = useState<any | null>();
  const [ftype, setFtype] = useState(type);
  const [ftype1, setFtype1] = useState(type1);
  const [isLoading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);

  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("json", json);

  useEffect(() => {
    async function fetch() {
      const rtn = await elasticscript[filename];
      if (ftype === "json") setResult(JSON.parse(rtn));
      else readData(rtn);
    }
    if (filename) fetch();
    if (script1) {
      setExescript(script1);
    }
  }, [filename, script1]);

  const handleClick = async (script: String | null | undefined) => {
    setLoading(true);
    if (!script) return;

    let rtn = await winProcess({ script });
    setLoading(false);
    if (ftype1 === "json") return JSON.parse(rtn.result);

    const highlighted = hljs.highlight(rtn.result, {
      language: "javascript",
    }).value;

    return highlighted;
  };
  const handleExecute = async () => {
    setToggle(false);
    if (!executed) {
      const rtn = await handleClick(exescript);
      setExecuted(rtn);
      //readData(result);
    }
  };
  const readData = (content: string) => {
    const highlighted = hljs.highlight(content, {
      language: "json",
    }).value;
    setResult(highlighted);
  };

  const btnClass =
    " float-right hover:bg-gray-400 text-gray-800 font-bold px-1 rounded inline-flex items-center mr-2 my-1";

  return (
    <div className="w-full mxheight">
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
        <Display
          data={toggle ? result : executed}
          type={toggle ? ftype : ftype1}
        />
        {/* <code
          dangerouslySetInnerHTML={{ __html: toggle ? result : executed }}
        /> */}
        {isLoading && <LoadingScreen />}
      </pre>
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
