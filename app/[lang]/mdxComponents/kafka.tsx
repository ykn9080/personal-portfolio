"use client";

import React, { useState } from "react";
import FileInput from "@/app/[lang]/components/form";
import { TableWithData } from "@/app/[lang]/components/tableData";

export function KafkaDemo() {
  const [load, setLoad] = useState(0);
  const onChange = () => {
    setLoad(load + 1);
  };
  return (
    <>
      <FileInput onChange={onChange} />
      <div className="flex flex-row items-center ">
        <div className="basis-1/2">
          <h3>Producer</h3>
          <TableWithData apiUrl="mysql/users" method="get" reload={load} />
        </div>
        <div className="ml-5 mr-5 inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
        <div className="basis-1/2">
          <h3>Consumer</h3>
          <TableWithData apiUrl="mongo/users" method="get" reload={load} />
        </div>
      </div>
    </>
  );
}
