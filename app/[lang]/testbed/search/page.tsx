"use client";

import React, { useState, FormEvent, useEffect } from "react";

import { useRouter } from "next/navigation";
import { winProcess } from "@/lib/childprocess";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
//import "@/styles/highlight-js/github-dark.css";
//import "@/styles/highlight-js/atom-one-light.css";
//import "@/styles/highlight-js/night-owl.css";
//import "highlight.js/styles/night-owl.css";
//import "highlight.js/styles/github-dark.css";
//import "highlight.js/styles/github.css";
//import "highlight.js/styles/atom-one-light.css";
//import "highlight.js/styles/grayscale.css";
//import "highlight.js/styles/default.css";

import { LoadingScreen } from "@/app/[lang]/LoadingScreen";
import "@/styles/cover-spin.css";
import { elasticscript } from "./data";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "@/styles/jsonlite.css";
import { ScrollShadow } from "@nextui-org/react";
import {
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import {
  Stepp,
  Tabss,
  TabssCompare,
  Modall,
} from "@/app/[lang]/components/nextui";
import $ from "jquery";

import { GrMore } from "react-icons/gr";

interface LabelProps {
  script: string;
  type: string;
  comment: string;
}
interface LabelProps1 extends LabelProps {
  id: string;
  script1: string | null;
  script2: string | null;
  type1: string;
  comment1: string;
  buttonname: string | null;
}
interface LabelProps2 {
  id: string;
  filename: keyof Ielasticscript;
  script1: string;
  type: string;
  type1: string;
  script2: string;
  comment: string;
  comment1: string;
}

interface LabelProps3 {
  id: string;
  data: string;
  type: string | undefined;
  comment: string | undefined;
}
interface LabelProps4 {
  script: keyof Ielasticscript | string | undefined;
  scriptArr: Array<string> | null;
  type: string;
  comment: string;
}

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
    let rtn = await winProcess({ script: search });
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
        <pre className="bg-[#011627]">
          <code
            className="language-html hljs"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </pre>
      </div>
    </div>
  );
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

  const fetchCommand = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    let rtn = await winProcess({ script: search });

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
          onClick={fetchCommand}
        >
          Run
        </button>
      </div>

      <div className="w-full">
        {result && (
          <pre className="bg-[#011627]">
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
export const fetchCommand = async (
  script: String | null | undefined,
  filetype: String
) => {
  if (!script) return;

  let rtn = await winProcess({ script });

  hljs.registerLanguage("javascript", javascript);

  if (filetype === "json") {
    return JSON.parse(rtn.result);
  }
  const highlighted = hljs.highlight(rtn.result, {
    language: "javascript",
  }).value;

  return highlighted;
};
export function SearchShow({
  id,
  script,
  script1,
  script2,
  type,
  type1,
  comment,
  comment1,
  buttonname,
}: LabelProps1) {
  const [search, setSearch] = useState("");
  const [exescript, setExescript] = useState<string | null>();
  const [hiddenscript, setHiddenscript] = useState<string | null>();
  const [ftype, setFtype] = useState(type);
  const [ftype1, setFtype1] = useState(type1);
  const [cmt, setCmt] = useState(comment);
  const [cmt1, setCmt1] = useState(comment1);
  const [open, setOpen] = useState(false);

  const [result, setResult] = useState<any | null>();
  const [result1, setResult1] = useState<any | null>();
  const [executed, setExecuted] = useState<any | null>();
  const [isLoading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [custombtn, setCustombtn] = useState<Array<string>>(["code", "result"]);

  useEffect(() => {
    if (script) {
      setSearch(script);
    }
    if (script1) {
      setExescript(script1);
    }
    if (script2) {
      setHiddenscript(script2);
    }
    if (buttonname) {
      const btn = buttonname.split(",");
      let btn1 = ["code", "result"];
      if (btn[0]) btn1[0] = btn[0];
      if (btn[1]) btn1[1] = btn[1];

      setCustombtn(btn1);
    }
    async function fetch() {
      setLoading(true);
      const rtn = await fetchCommand(script, type);

      setLoading(false);
      setResult(rtn);
    }
    if (script && script !== "") fetch();
  }, [script, type]);

  useEffect(() => {
    $("#sideLeft").css("padding-left", "5px");
    $("#sideRight").css("padding-left", "5px");
  });

  const handleExecute = async () => {
    setToggle(false);

    if (hiddenscript) {
      const rtn1 = await winProcess({ script: hiddenscript });
    }
    if (!executed) {
      setLoading(true);
      const rtn = await fetchCommand(exescript, ftype1);
      setLoading(false);
      setExecuted(rtn);
    }
  };
  const handleExecuteReload = async () => {
    setLoading(true);
    const rtn = await fetchCommand(exescript, ftype1);
    setLoading(false);
    setExecuted(rtn);
  };

  const btnClass =
    " float-right hover:bg-gray-400 text-gray-800 font-bold px-1 rounded inline-flex items-center mr-2 my-1";
  const modalData = (
    <div className="flex ">
      <div className="w-1/2 pl-10">
        <p className="text-lg font-bold">Script</p>
        <pre>
          <Display id="sideLeft" data={result} type={ftype} comment={cmt} />
        </pre>
      </div>
      {/* <div className="flex-none w-0.5" /> */}
      <div className="w-1/2 pl-10">
        <p className="text-lg font-bold">Result</p>
        <pre>
          <Display
            id="sideRight"
            data={executed}
            type={ftype1}
            comment={cmt1}
          />
        </pre>
      </div>
    </div>
  );

  const onChange = () => {
    setOpen(false);
  };
  const dropdownAction = (key: string) => {
    switch (key) {
      case "reload":
        handleExecuteReload();
        break;
      case "sideby":
        setOpen(false);
        setOpen(true);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="w-full ">
        <pre className="bg-[#011627]">
          {exescript && (
            <>
              <div className="float-right">
                {!toggle && executed && (
                  <Dropdown>
                    <DropdownTrigger>
                      <button
                        className={`${btnClass} ${
                          !toggle ? "bg-gray-300" : "bg-gray-600"
                        } py-[4.5px]`}
                      >
                        <GrMore />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key={1}
                        onClick={() => dropdownAction("reload")}
                      >
                        🔄reload
                      </DropdownItem>
                      <DropdownItem
                        key={2}
                        onClick={() => dropdownAction("sideby")}
                      >
                        🧑🏻‍🤝‍🧑🏻code vs output
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
                <button
                  onClick={handleExecute}
                  className={`${btnClass} ${
                    !toggle ? "bg-gray-300" : "bg-gray-600"
                  }`}
                >
                  {custombtn[1]}
                </button>

                <button
                  onClick={() => setToggle(true)}
                  className={`${btnClass} ${
                    toggle ? "bg-gray-300" : "bg-gray-600"
                  }`}
                >
                  {custombtn[0]}
                </button>
              </div>
            </>
          )}
          <div className="clear-both" />
          <Display
            id={id}
            data={toggle ? result : executed}
            type={toggle ? ftype : ftype1}
            comment={toggle ? cmt : cmt1}
          />

          {isLoading && <LoadingScreen />}
        </pre>
        <Modall width={1500} open={open} data={modalData} onChange={onChange} />
      </div>
    </>
  );
}

export function SearchShow1({
  id,
  script,
  script1,
  script2,
  type,
  type1,
  comment,
  comment1,
  buttonname,
}: LabelProps1) {
  return (
    <SearchShow
      id={id}
      script={script}
      script1={script1}
      script2={script2}
      type={type}
      type1={type1}
      comment={comment}
      comment1={comment1}
      buttonname={buttonname}
    />
  );
}
export function Display({ id, data, type, comment }: LabelProps3) {
  const btnClass =
    "bg-gray-500 hover:bg-gray-300 text-gray-800 font-bold px-1 rounded inline-flex items-center mr-2 my-1";
  const ExpandBtn = ({ expand }: { expand: string }) => {
    return (
      <div className="sticky bottom-0 flex flex-col items-center pb-10">
        <button onClick={() => toggle(expand)} className={btnClass}>
          {expand === "high"
            ? "show less"
            : expand === "mid"
            ? "show all"
            : "show more"}
        </button>
      </div>
    );
  };
  const [expand, setExpand] = useState("low");
  const [btn, setBtn] = useState<JSX.Element | null>(
    <ExpandBtn expand="low" />
  );
  const [ht, setHt] = useState<number>(399);

  // useEffect(() => {
  //   if (id !== "undefined") {
  //     const htt = $("#" + id).height();

  //     if (htt) {
  //       setHt(htt);
  //     }
  //     console.log("im in", id, htt);
  //   }
  // });
  useEffect(() => {
    if (id === "sideLeft" || id === "sideRight") {
      setExpand("mid");
      setBtn(<ExpandBtn expand="mid" />);
      setBtn(null);
    }
  }, [id]);

  const toggle = (current: string) => {
    let status = "low";
    console.log("current", current);
    switch (current) {
      case "low":
        status = "mid";
        break;
      case "mid":
        status = "high";
        break;
      case "high":
        status = "low";
        break;
    }
    setExpand(status);
    setBtn(<ExpandBtn expand={status} />);
  };
  console.log(expand);
  return (
    <div
      id={id}
      className={`bg-[#011627] ${
        id === "sideLeft" || id === "sideRight" ? "p-5" : ""
      }`}
    >
      <ScrollShadow
        hideScrollBar
        size={100}
        className={
          expand === "low"
            ? "max-h-[300px]"
            : expand === "mid"
            ? "max-h-[650px]"
            : "h-full"
        }
      >
        <div>{comment}</div>
        {type === "json" ? (
          <JsonView
            data={data}
            shouldExpandNode={allExpanded}
            style={darkStyles}
          />
        ) : (
          <code
            className="text-white"
            dangerouslySetInnerHTML={{
              __html: data,
            }}
          />
        )}
      </ScrollShadow>
      {btn}
    </div>
  );
}

interface Ielasticscript {
  mappings_update: string | undefined;
  reindex: string | undefined;
  index_template: string | undefined;
  reindex_template: string | undefined;
  painless: string | undefined;
  pipeline: string | undefined;
  filebeatyml: string | undefined;
}

export function SearchScript({
  id,
  filename,
  type,
  script1,
  type1,
  script2,
  comment,
  comment1,
}: LabelProps2) {
  const [exescript, setExescript] = useState<string | null>();
  const [result, setResult] = useState<any | null>();
  const [executed, setExecuted] = useState<any | null>(script1);
  const [lastScript, setLastScript] = useState<any | null>(script2); //ex kill script1 process aft 1 min
  const [cmt, setCmt] = useState(comment);
  const [cmt1, setCmt1] = useState(comment1);
  const [ftype, setFtype] = useState(type);
  const [ftype1, setFtype1] = useState(type1);
  const [isLoading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);

  hljs.registerLanguage("javascript", javascript);

  useEffect(() => {
    async function fetch() {
      const rtn = await elasticscript[filename];
      if (ftype === "json") setResult(JSON.parse(rtn));
      else readData(rtn);
    }
    if (filename) fetch();
  }, []);

  const fetchCommand = async (
    script: String | null | undefined,
    ftype1: string | null | undefined
  ) => {
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
      setLoading(true);
      const rtn = await fetchCommand(exescript, ftype1);
      setLoading(false);
      setExecuted(rtn);
      if (lastScript) await winProcess({ lastScript });
    }
  };
  const handleExecuteReload = async () => {
    setLoading(true);
    const rtn = await fetchCommand(exescript, ftype1);
    setLoading(false);
    setExecuted(rtn);
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
    <div className="w-full ">
      <pre className="bg-[#011627]">
        {exescript && (
          <>
            {!toggle && (
              <div className="float-left">
                <button onClick={handleExecuteReload}>reload</button>
              </div>
            )}
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
          id={id}
          data={toggle ? result : executed}
          type={toggle ? ftype : ftype1}
          comment={toggle ? cmt : cmt1}
        />

        {isLoading && <LoadingScreen />}
      </pre>
    </div>
  );
}
interface LabelProps5 {
  id: string;
  script: string | undefined;
  script2: string | undefined;
  type: string;
  comment: string;
}

export function SearchSingle({
  id,
  script,
  script2,
  type,
  comment,
}: LabelProps5) {
  const [search, setSearch] = useState("");
  const [ftype, setFtype] = useState(type);
  const [cmt, setCmt] = useState(comment);

  const [result, setResult] = useState<any | null>();
  const [isLoading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (script && script !== "") {
      setSearch(script);
    }

    if (script2) {
      executeHidden(script2);
    }
    async function fetch() {
      setLoading(true);
      const rtn = await fetchCommand(script, type);
      setLoading(false);
      console.log(script, type);
      setResult(rtn);
    }
    if (script && script !== "") fetch();
  }, []);

  const fetchCommand = async (
    script: String | null | undefined,
    filetype: String
  ) => {
    if (!script) return;
    let rtn = await winProcess({ script });

    hljs.registerLanguage("javascript", javascript);

    if (filetype === "json") {
      return JSON.parse(rtn.result);
    }
    const highlighted = hljs.highlight(rtn.result, {
      language: "javascript",
    }).value;

    return highlighted;
  };

  return (
    <div className="w-full">
      <pre className="bg-[#011627]">
        <Display id={id} data={result} type={ftype} comment={cmt} />
        {isLoading && <LoadingScreen />}
      </pre>
    </div>
  );
}
export function SearchSingle1({
  id,
  script,
  script2,
  type,
  comment,
}: LabelProps5) {
  return (
    <SearchSingle
      id={id}
      script={script}
      script2={script2}
      type={type}
      comment={comment}
    />
  );
}
const executeHidden = async (script: string) => {
  const rtn = await winProcess({ script });
  return rtn;
};
/**
 * return값없이 백그라운드에서 실행만되는 serarch
 * comment는 화면에 출력될 수 있다.
 * @param param0
 * @returns
 */
export function SearchHidden({ script, comment }: LabelProps) {
  const [cmt, setCmt] = useState(comment);

  useEffect(() => {
    async function fetch() {
      await winProcess({ script });
    }
    fetch();
  }, []);

  return (
    // {comment ?<Display data="undefined" type="undefined" comment={comment} />

    // :null}
    null
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
interface ItemObj {
  id: string;
  label: string;
  content: Iterable<ItemObj1>;
}
interface ItemObj1 extends ItemObj {
  icon: string;
}

export function SearchTab({ arr }: any) {
  const [tabs, setTabs] = useState(arr);
  return (
    <div className="dark flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item: ItemObj1) => (
          <Tab key={item.id} title={item.label}>
            {/* @ts-ignore */}
            <div className="mt-[-35px] ml-[-5px]">{item.content}</div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export function SearchSubTab({ arr }: any) {
  const [tabs, setTabs] = useState(arr);
  return (
    <div className="dark flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item: ItemObj) => (
          <Tab key={item.id} title={item.label}>
            <Tabs
              aria-label="subtabs"
              variant="light"
              radius="none"
              // @ts-ignore
              items={item.content}
            >
              {(item: ItemObj1) => (
                <Tab
                  key={item.id}
                  title={
                    <div className="flex items-center space-x-2 mt-[-35px]">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  }
                >
                  {/* @ts-ignore */}
                  <div className="mt-[-5px] ml-[-5px]">{item.content}</div>
                </Tab>
              )}
            </Tabs>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export function SearchAntTab({ arr }: any) {
  const [tabs, setTabs] = useState(arr);

  return (
    <div className="dark flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item: ItemObj) => {
          return (
            <Tab key={item.id} title={item.label}>
              {Array.isArray(item.content) ? (
                <TabssCompare data={item.content}> </TabssCompare>
              ) : (
                // @ts-ignore
                <div className="mt-[-35px] ml-[-5px]">{item.content}</div>
              )}
            </Tab>
          );
        }}
      </Tabs>
    </div>
  );
}

export function SearchStep({ items }: any) {
  return <Stepp item={items} />;
}
