"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"; // Add this line
// import "@/app/[lang]/globals.css";

export const InterestList = ({ blogs, lang }) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    return () => {unimport("bootstrap/dist/js/bootstrap");};
  }, []);
  return (
    <div>
      {blogs.map((blog) => {
        if (blog.slug.endsWith(lang) && blog.meta.type === "interest")
          return (
            <div className="flex flex-row  hover:bg-slate-200 dark:hover:bg-slate-600">
              <div className="flex-none w-14 md:w-20 pt-2">
                <Image
                  className="rounded-lg border-solid border border-black-100 dark:border-white-500 bg-white"
                  layout="responsive"
                  width={300}
                  height={100}
                  src={blog.meta.featureImage}
                  alt=""
                />
              </div>
              <div className="grow flex flex-col justify-between lg:mx-6">
                <Link
                  className=" hover:text-black/170 dark:hover:text-grey "
                  href={`${lang}/blogs/${blog.slug}`}
                >
                  <div className="text-lg font-bold hover:underline">
                    {blog.meta.title}
                  </div>
                  <div className="text-sm">{blog.meta.excerpt}</div>
                </Link>
              </div>
            </div>
          );
      })}
      <h1>hello</h1>
      <div className="dropdown m-3 ">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          id="dropdownMenuButton1"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Option 1
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Option 2
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Option 3
            </a>
          </li>
        </ul>
      </div>
      <button className="btn btn-primary m-3 dark:bg-red-400">
        Button Primary
      </button>
    </div>
  );
};
