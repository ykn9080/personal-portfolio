"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function App({ tabs }: any) {
  //   let tabs = [
  //     {
  //       id: "photos",
  //       label: "Photos",
  //       content: { script: "console.log('hi')", script1: "console.log('hi')," },
  //     },
  //     {
  //       id: "music",
  //       label: "Music",
  //       content: {
  //         filename: "mappings_update",
  //         type: "json",
  //         script1: "console.log('hi'),",
  //       },
  //     },
  //     {
  //       id: "videos",
  //       label: "Videos",
  //       content:
  //         "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     },
  //   ];

  return (
    <div className="dark flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <div className="mt-[-35px] ml-[-5px]">
              {item.content}
              {/* <CardBody>{item.content}</CardBody> */}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
