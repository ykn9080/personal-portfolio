"use client";
import React, { useState } from "react";
import { Avatar, List } from "antd";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const AntTable = ({ blogs, lang }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <List
        pagination={{
          position: "bottom",
          align: "center",
        }}
        dataSource={blogs}
        renderItem={(blog, index) => (
          <List.Item
            extra={<img src={blog.meta.featureImage} width={200} alt="" />}
          >
            <List.Item.Meta
              //avatar={<Avatar src={blog.meta.featureImage} />}
              //   avatar={
              //     <Image
              //       className="rounded-lg border-solid border border-black-100 dark:border-white-500 bg-white"
              //       layout="responsive"
              //       width={300}
              //       height={100}
              //       src={blog.meta.featureImage}
              //       alt=""
              //     />
              //   }
              title={<a href="https://ant.design"> {blog.meta.title}</a>}
              description={blog.meta.excerpt}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default AntTable;
