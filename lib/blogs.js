// app/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDictionary } from "@/lib/dictionary";
import React from "react";

export function localBlogList(slug) {
  const blogs = localBlog("blogs");

  let type;
  blogs.map((k, i) => {
    if (k.slug === slug) {
      type = k.meta.type;
    }
  });
  const lang = slug.split(".")[1];
  let list = [];
  blogs.map((k, i) => {
    if (k.meta.type === type && k.slug.endsWith(lang)) {
      list.push(k.meta);
    }
  });

  return list;
}
export function localBlog(blogDir) {
  // 1) Set blogs directory
  if (!blogDir) blogDir = "blogs";

  // 2) Find all files in the blog directory
  const files = fs.readdirSync(path.join(blogDir));

  // 3) For each blog found
  const returns = files.map((filename) => {
    // 4) Read the content of that blog
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");

    // 5) Extract the metadata from the blog's content
    const { data: frontMatter } = matter(fileContent);

    // 6) Return the metadata and page slug
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });
  return returns;
}
