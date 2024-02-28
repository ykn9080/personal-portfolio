"use client";

import React, { useEffect, useState } from "react";
import {
  Chip,
  Snippet,
  Code,
  Divider,
  Card,
  CardBody,
} from "@nextui-org/react";
import {
  Steps,
  Space,
  Tabs,
  Modal,
  Drawer,
  Button,
  Tooltip,
  Dropdown,
  ConfigProvider,
  theme,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { updateValue } from "@/redux/features/globalSlice";

import { useTheme } from "next-themes";
import $ from "jquery";
import { winProcess } from "@/lib/childprocess";
import hljs from "highlight.js";
import { Display, fetchCommand } from "../search/page";
import Alert from "antd/es/alert/Alert";

export function Chipp({ children, color, variant }: any) {
  const [colorr, setColorr] = useState<
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
  >("default");
  const [vari, setVari] = useState<
    | "solid"
    | "flat"
    | "light"
    | "shadow"
    | "dot"
    | "bordered"
    | "faded"
    | undefined
  >("solid");
  useEffect(() => {
    if (color) setColorr(color);
    if (variant) setVari(variant);
  }, []);
  return (
    <div>
      <Chip color={colorr} variant={vari}>
        {children}
      </Chip>
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

export function Tooltipp({ children, content }: any) {
  return (
    <div>
      <Tooltip title={content}>{children}</Tooltip>
    </div>
  );
}
export function Stepp({ item }: any) {
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState(item);
  const [maxnum, setMaxnum] = useState(0);
  const ctheme = useTheme();

  //const themechange = useAppSelector((state) => state.global).theme;

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
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm
          algorithm:
            ctheme.theme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,

          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <Steps
          current={current}
          items={items}
          onChange={onChange}
          className="site-navigation-steps"
        />
        <div>{items[current].content}</div>
      </ConfigProvider>
    </div>
  );
}

export function Spacee({ children }: any) {
  return (
    <div className="-mb-5">
      <Space>{children}</Space>
    </div>
  );
}
export function Dividerr() {
  return <Divider />;
}

export function Cardd({ children }: any) {
  return (
    <Card>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

interface ItemObj {
  id: string;
  label: string;
  script: string;
  content: any;
}
export function Tabss({ data, extraButton }: any) {
  const [dt, setDt] = useState(data);
  const ctheme = useTheme();
  useEffect(() => {
    $(".ant-tabs-content-holder").css("margin-top", "-35px");
    $(".ant-tabs-nav").css({
      "margin-top": "-35px",
      width: "25%",
      "margin-left": "75%",
      "z-index": 10,
    });
    $(".ant-tabs-nav-wrap").css("justify-content", "right");
    $('[role="tabpanel"]').css({
      "padding-left": "1px",
      "padding-right": "1px",
    });
    $('[role="tablist"]').css("z-index", 11);
  });

  return (
    <ConfigProvider
      theme={{
        algorithm:
          ctheme.theme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        components: {
          Tabs: {
            /* here is your component tokens */
            cardBg: "#FAFAFA",
            cardGutter: 5,
            cardHeight: 10,
            itemColor: "#a1a1aa",
            itemActiveColor: "#000",
            horizontalItemMargin: "0",
            horizontalItemPadding: "0 10px",
          },
        },
      }}
    >
      <Tabs
        type="card"
        tabBarExtraContent={extraButton}
        items={dt.map((k: ItemObj, i: number) => {
          if (!k) return;
          return {
            label: k.label,
            key: String(i + 1),
            children: k.content,
          };
        })}
      />
    </ConfigProvider>
  );
}

export function TabssCompare({ data }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState<JSX.Element>();
  const ctheme = useTheme();

  const fetchAll = async (data: any) => {
    return await Promise.all(
      data.map(async (k: ItemObj) => {
        return fetchCommand(k.script, "js");
      })
    );
  };
  useEffect(() => {
    async function fetchCode(data: any) {
      const rtn = await fetchAll(data);
      const modalDt = (
        <div className="flex ">
          <div className="w-1/2 pl-10">
            <p className="text-lg font-bold">Pyspark</p>
            <pre>
              <Display id="sideLeft" data={rtn[0]} type="" comment="" />
            </pre>
          </div>
          <div className="w-1/2 pl-10">
            <p className="text-lg font-bold">Scala</p>
            <pre>
              <Display id="sideRight" data={rtn[1]} type="" comment="" />
            </pre>
          </div>
        </div>
      );
      setModal(modalDt);
    }

    fetchCode(data);
  }, []);
  const extraButton = (
    <Tooltip title="Compare code">
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="hover:bg-gray-100 font-semibold border border-slate-300 dark:border-none rounded ml-2 mr-1"
      >
        🧑🏻‍🤝‍🧑🏻
      </button>
    </Tooltip>
  );

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="-mb-3">
      <ConfigProvider
        theme={{
          algorithm:
            ctheme.theme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
      >
        <Tabss data={data} extraButton={extraButton} />
        <Modal
          width={1500}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          {modal}
        </Modal>
      </ConfigProvider>
    </div>
  );
}
export function Modall({ title, data, open, width, onChange }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [wth, setWth] = useState();
  useEffect(() => {
    setIsModalOpen(open);
    if (title) setName(title);
    if (width) setWth(width);
  }, [open]);

  const handleCancel = () => {
    setIsModalOpen(false);
    onChange();
  };

  return (
    <>
      <Modal
        width={wth}
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {data}
      </Modal>
    </>
  );
}

export function Drawerr({ data, open, onChange }: any) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(open);
  }, [open]);

  const handleCancel = () => {
    setVisible(false);
    onChange();
  };

  return (
    <>
      <Drawer visible={visible} onClose={handleCancel} width="100VW">
        {data}
      </Drawer>
    </>
  );
}

export function Alertt({ title, shortmsg, longmsg }: any) {
  const [info, setInfo] = useState(shortmsg);
  const [detaill, setDetaill] = useState(false);
  const showDetail = () => {
    if (detaill) setInfo(shortmsg);
    else setInfo(longmsg);
    setDetaill(!detaill);
  };
  return (
    <Alert
      message={title}
      description={info}
      action={
        <Button size="small" type="text" onClick={showDetail}>
          {detaill ? "⬆️short" : "⬇️more"}
        </Button>
      }
      type="info"
    />
  );
}
