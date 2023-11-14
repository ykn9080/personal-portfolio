"use client";

import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import _ from "lodash";
import { GrFormClose } from "react-icons/gr";
import { updateValue } from "@/redux/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Caroline Schultz",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer",
];
const sortByFrequency = (tags) => {
  const uniqtag = _.uniq(tags);
  let countArr = [];
  uniqtag.map((k, i) => {
    const num = _.size(
      _.filter(tags, (o) => {
        return o === k;
      })
    );
    countArr.push({ name: k, count: num });
  });
  const orderObj = _.orderBy(countArr, "count", "desc");
  const finalObj = othersLast(orderObj);
  return finalObj;
};
const othersLast = (tags) => {
  let others, newtags;

  tags.map((k, i) => {
    if (k.name === "others") {
      others = tags.splice(i, 1);
      newtags = tags.concat(others);
      return;
    }
  });
  return newtags;
};

export default function MyListBox({ tags }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState(sortByFrequency(tags));

  const dispatch = useAppDispatch();
  const taglist = useAppSelector((state) => state.global).tags;

  function isSelected(value) {
    return selectedTags.find((el) => el === value) ? true : false;
  }
  useEffect(() => {
    if (taglist.length === 0) setIsOpen(false);
  }, [taglist]);

  function handleSelect(value) {
    if (!isSelected(value)) {
      const findTag = allTags.find((el) => el.name === value);
      if (Object.keys(findTag).length > 0) {
        const newtags = [...selectedTags, findTag.name];
        setSelectedTags(newtags);
        dispatch(updateValue({ tags: newtags }));
      }
    } else {
      handleDeselect(value);
    }
    setIsOpen(false);
  }

  function handleDeselect(value) {
    const selectedTagsUpdated = selectedTags.filter((el) => el !== value);
    setSelectedTags(selectedTagsUpdated);
    dispatch(updateValue({ tags: selectedTagsUpdated }));
    setIsOpen(false);
  }

  return (
    <div className="flex w-52">
      <div className="w-full max-w-lg mx-auto">
        <Listbox
          as="div"
          value={selectedTags}
          onChange={(value) => handleSelect(value)}
          open={isOpen}
        >
          {() => (
            <>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button
                    className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => setIsOpen(!isOpen)}
                    open={isOpen}
                  >
                    <span className="truncate flex">
                      {taglist.length > 0 && (
                        <span className="mr-2 pt-1 align-base cursor-pointer hover:bg-slate-200">
                          <GrFormClose
                            onClick={() => {
                              setSelectedTags([]);
                              dispatch(updateValue({ tags: [] }));
                            }}
                          />
                        </span>
                      )}
                      {selectedTags.length < 1
                        ? "Select types "
                        : // : `Selected tags (${selectedTags.length})`
                          selectedTags.join(", ")}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-50"
                >
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5 hover:bg-slate-200"
                  >
                    {allTags.map((tag) => {
                      const selected = isSelected(tag.name);
                      return (
                        <Listbox.Option key={tag.name} value={tag.name}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "text-white bg-blue-600"
                                  : "text-gray-900"
                              } cursor-default select-none relative pl-2 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? "font-semibold" : "font-normal"
                                } ml-5 block truncate`}
                              >
                                {`${tag.name}(${tag.count})`}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-blue-600"
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
                {/* <div className="pt-1 text-sm">
                  {selectedTags.length > 0 && <>{selectedTags.join(", ")}</>}
                </div> */}
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}
