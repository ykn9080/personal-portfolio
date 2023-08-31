"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";

export default function MyDialog({ data }) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>more</button>
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
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>Complete your order</Dialog.Title>
            <nav className="mt-4 -mx-3 space-y-3 ">
              {data.map((k, i) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Link
                    className=" hover:text-black/170 dark:hover:text-grey "
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
            <button onClick={() => setIsOpen(false)}>close</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
