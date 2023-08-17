import React from "react";
import Link from "next/link";
import { getPostListSameTypeByName } from "@/lib/posts";
import { Locale } from "@/i18n.config";

type Props = {
  postId: string;
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
export default async function Sidebar({ postId, lang, meta }: Props) {
  const posts = await getPostListSameTypeByName(postId, lang);

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  return (
    <aside className="flex flex-col  h-screen pl-2 py-8 overflow-y-hidden bg-white border-l rtl:border-l-0 rtl:border-r dark:bg-gray-900 dark:border-gray-700">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            Other List
          </h2>
        </div>

        <nav className="mt-4 -mx-3 space-y-3 ">
          {posts.map((k: Meta, i: number) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Link
                className=" hover:text-black/170 dark:hover:text-grey dark:text-white"
                href={`${lang}/posts/${k.id}`}
              >
                <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                  <div className="flex items-center gap-x-2 ">
                    <span className={bullet + colors[i]}></span>
                    <span>{k.title}</span>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <div className="mt-3">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            Github
          </h2>
          <div className="text-sm break-words px-1 text-gray-500 px-1 hover:text-blue-500">
            <a href={meta.github} target="blank" title="github">
              {meta.github}
            </a>
          </div>
        </div>

        <div className="mt-3">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            npm
          </h2>
          <div className="text-sm break-words text-gray-500 px-1 hover:text-blue-500">
            <a href={meta.npmorg} target="blank" title="npm">
              {meta.npmorg}
            </a>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            Demo
          </h2>
          <div className="text-sm break-words px-1  text-gray-500 px-1 hover:text-blue-500">
            <a href={meta.demo} target="blank" title="demo">
              {meta.demo}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
