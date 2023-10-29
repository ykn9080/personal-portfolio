"use client";
import React, { useEffect, useState } from "react";
import { Chip, Snippet, Code } from "@nextui-org/react";
import { Steps, Button } from "antd";

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
export function Stepp({ items }: any) {
  const [current, setCurrent] = useState(1);
  const item = [
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
  ];
  return (
    <>
      <Steps current={current} items={items} />
      <div style={{ marginTop: 24 }}>
        {current < items.length - 1 && (
          <Button type="primary" onClick={() => setCurrent(current + 1)}>
            Next
          </Button>
        )}

        {current > 0 && (
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => setCurrent(current - 1)}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
}
