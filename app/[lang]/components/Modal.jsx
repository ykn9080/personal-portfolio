"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import MyListBox from "./ListBox";
import Link from "next/link";
import _ from "lodash";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateValue } from "@/redux/features/globalSlice";

const filterTags = (taglist, data) => {
  if (taglist.length === 0) return data;
  let newdata = [];
  data.map((k, i) => {
    const intersect = _.intersectionWith(k.tags, taglist, _.isEqual);
    if (intersect.length > 0) newdata.push(k);
  });
  return newdata;
};
export default function MyDialog({ data, language, icon, list }) {
  let [isOpen, setIsOpen] = useState(false);
  const [allData, setAllData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);

  const dispatch = useAppDispatch();
  const taglist = useAppSelector((state) => state.global).tags;

  useEffect(() => {
    const fil = filterTags(taglist, allData);
    console.log("filtered list", fil, taglist);
    setFilteredData(fil);
  }, [taglist]);

  useEffect(() => {
    dispatch(updateValue({ tags: [] }));
  }, []);
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

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{icon}</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4 min-h-fit">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-5  dark:bg-slate-700 dark:text-white">
            <Dialog.Title className="flex justify-between">
              <p className="text-xl font-bold ">Interest List</p>
              {list && list}
              <button onClick={() => setIsOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                  className="stroke-black-900 hover:stroke-cyan-700 dark:stroke-black-200"
                >
                  <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z" />
                </svg>
              </button>
            </Dialog.Title>
            <nav className="mt-4 -mx-3 space-y-3 flex flex-wrap">
              {filteredData.map((k, i) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Link
                    className=" hover:text-black/170 dark:hover:text-grey max-w-[33%] min-w-[33%] truncate"
                    href={`${language}/blogs/${k.slug}.${language}`}
                  >
                    <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                      <div className="flex items-center gap-x-2 ">
                        <span className={bullet + colors[i % 10]}></span>
                        <span>{k.title}</span>
                      </div>
                    </button>
                  </Link>
                );
              })}
            </nav>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}