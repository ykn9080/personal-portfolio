"use client";
import React, { useEffect, useState } from "react";
import { Chip, Snippet, Code } from "@nextui-org/react";
import { Steps } from "antd";

export function Chipp() {
  return (
    <div>
      <Chip>Chip</Chip>
    </div>
  );
}
export function Snippett({ children }: any) {
  return <Snippet>{children}</Snippet>;
}

export function Codee({
  children,
  size,
}: {
  children: any;
  size: "sm" | "md" | "lg";
}) {
  const [siz, setSiz] = useState<"sm" | "md" | "lg">();
  useEffect(() => {
    if (size) setSiz(size);
  }, []);
  return <Code size={siz}>{children}</Code>;
}
const description = "This is a description.";
export const Stepp: React.FC = () => (
  <Steps
    current={1}
    items={[
      {
        title: "Finished",
        description,
      },
      {
        title: "In Progress",
        description,
        subTitle: "Left 00:00:08",
      },
      {
        title: "Waiting",
        description,
      },
    ]}
  />
);
