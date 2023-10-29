"use client";
import React, { useEffect, useState } from "react";
import { Chip, Snippet, Code } from "@nextui-org/react";
import { Steps, Button } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";

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

export function Stepp({ item }: any) {
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState(item);
  const [maxnum, setMaxnum] = useState(0);

  const onChange = (value: number) => {
    setCurrent(value);
    if (maxnum < items.length - 1) {
      delete items[value].status;
      if (value < items.length - 1) items[value + 1].disabled = false;
      setItems(items);
      if (maxnum < value) setMaxnum(value);
    }
  };

  return (
    <div>
      <Steps
        size="small"
        current={current}
        items={items}
        onChange={onChange}
        className="site-navigation-steps"
      />
      <div>{items[current].content}</div>
    </div>
  );
}