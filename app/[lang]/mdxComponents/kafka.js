"use client";
import React, { useEffect, useState } from "react";
import { getMysql } from "@/lib/kafka.ts";
import SimpleTable from "@/app/[lang]/components/simpleTable";

export const Kafka = ({ apiUrl, method }) => {
  const [data, setData] = useState();
  const [column, setColumn] = useState();

  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const rtn = await getMysql(apiUrl, method);

    setData(rtn);
    let arr = [];
    Object.keys(rtn[0]).map((k, i) => {
      arr.push({ key: k, label: k });
    });
    console.log(rtn, arr);
    setColumn(arr);
  };
  return (
    <div>
      {/* <ul>
        {data &&
          data.map((k, i) => {
            return <li>{k}</li>;
          })}
      </ul> */}
      <div className="mt-4 md:mt-8 ">
        {data && <SimpleTable rows={data} columns={column} />}
      </div>
    </div>
  );
};
