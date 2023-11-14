import React, { useEffect } from "react";
import Link from "next/link";
import { localBlogList, localBlog } from "../../../lib/blogs.js";
import { Locale } from "@/i18n.config";
import MyDialog from "./Modal.jsx";
import { BiWindowOpen } from "react-icons/bi";
import MyListBox from "@/app/[lang]/components/ListBox";
import { uniqTags } from "@/app/[lang]/interest/page";

type Props = {
  slug: string;
  lang: Locale;
  meta: Meta;
};
const bullet = "w-2 h-2 rounded-full ";
const colors = [
  "bg-gray-500",
  "bg-pink-500",
  "bg-slate-500",
  "bg-indigo-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-fuchsia-500",
];

const sideItems = [
  { title: "github", url: "github" },
  { title: "npm", url: "npmorg" },
  { title: "demo", url: "demo" },
];
export default function SideLocalbar({ slug, lang, meta }: Props) {
  const blogs = localBlogList(slug);
  const language = meta.language === "kr" ? "ko" : "en";

  if (!blogs) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  return (
    <div>
      <aside className="flex flex-col pt-4 overflow-hidden h-full">
        <div className="text-right">
          <MyDialog
            data={blogs}
            language={language}
            icon={
              <div className="flex text-red-600 hover:text-blue-600 hover:bg-slate-200 mt-1">
                <BiWindowOpen
                  className={` h-4 w-4`}
                  aria-hidden="true"
                ></BiWindowOpen>
                <p className="text-xs ml-1 hover:underline">List</p>
              </div>
            }
            list={<MyListBox tags={uniqTags(blogs)} />}
          />
        </div>

        {/* <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold ">Other List</h2>
        </div>

        <nav className="mt-4 -mx-3 space-y-3 ">
          {blogs.map((k, i) => {
            if (i > 6) return null;
            return (
              // eslint-disable-next-line react/jsx-key
              <Link
                className=" hover:text-black/170 dark:hover:text-grey "
                href={`${language}/blogs/${k.slug}.${language}`}
              >
                <button className="w-full px-3 py-2 text-xs font-medium  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                  <div className="flex  gap-x-2 ">
                    <span className={bullet + colors[i % 10]}></span>
                    <span className="truncate">{k.title}</span>
                  </div>
                </button>
              </Link>
            );
          })}
        </nav>
      </div> */}

        <div>
          <div className="mt-3">
            <h2 className="text-base font-semibold ">Github</h2>
            <div className="text-sm break-words px-1  hover:text-blue-500">
              <a href={meta.github} target="blank" title="github">
                {meta.github}
              </a>
            </div>
          </div>

          <div className="mt-3">
            <h2 className="text-base font-semibold">npm</h2>
            <div className="text-sm break-words  px-1 hover:text-blue-500">
              <a href={meta.npmorg} target="blank" title="npm">
                {meta.npmorg}
              </a>
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-base font-semibold ">Demo</h2>
            <div className="text-sm break-words px-1   hover:text-blue-500">
              <a href={meta.demo} target="blank" title="demo">
                {meta.demo}
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
