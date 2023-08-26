"use client";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"; // Add this line
// import "@/app/[lang]/globals.css";

const Page = () => {
  //   useEffect(() => {
  //     import("bootstrap/dist/js/bootstrap");
  //     return () => {};
  //   }, []);
  return (
    <div className="dark:bg-black dark:text-white">
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

export default Page;
