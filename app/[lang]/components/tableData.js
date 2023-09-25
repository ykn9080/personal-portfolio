"use client";
import React, { useEffect, useState } from "react";
import { getKafkaGet } from "@/lib/kafka.ts";
import SimpleTable from "@/app/[lang]/components/table";
import _ from "lodash";

export const TableWithData = ({ apiUrl, method, reload }) => {
  const [data, setData] = useState();
  const [column, setColumn] = useState();
  const [localreload, setLocalreload] = useState(0);

  useEffect(() => {
    getdata();
  }, [reload, localreload]);
  const getdata = async () => {
    const rtn = await getKafkaGet(apiUrl, method);

    setData(rtn.slice(-3));

    let arr = [];
    Object.keys(rtn[0]).map((k, i) => {
      arr.push({ key: k, label: k });
    });
    console.log(rtn, arr);
    setColumn(arr);
  };
  return (
    <div>
      {data && (
        <>
          <button
            onClick={() => {
              setLocalreload(localreload + 1);
            }}
          >
            reload
          </button>
          <SimpleTable rows={data} columns={column} />
        </>
      )}
    </div>
  );
};
