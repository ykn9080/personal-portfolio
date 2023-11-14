import React from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localBlog } from "@/lib/blogs";
import ReactTable from "@/lib/react-table/page";
import MyDialog from "../components/Modal";
import { FaSearch } from "react-icons/fa";
import MyListBox from "../components/ListBox";

type tableblog = {
  single: {
    title: string;
    tags: string[];
    excerpt: string;
    featureImage: string;
    thumb: string;
    slug: string;
    lang: string;
  };
};
type searchblog = {
  title: string;
  tags: string[];
  excerpt: string;
  featureImage: string;
  thumb: string;
  slug: string;
  lang: string;
};
type tagslist = {
  tag: string;
};
const uniqTags = (searchblogs: searchblog[]): string[] => {
  let array: string[] = [];
  searchblogs.map((k, i) => {
    array = array.concat(k.tags);
  });
  return array;
};
export default async function DetailPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);
  const blogs = localBlog("blogs");
  let tableblogs: tableblog[] = [];
  let searchblogs: searchblog[] = [];

  blogs.map((blog) => {
    if (blog.slug.endsWith(lang) && blog.meta.type === "interest") {
      let content = {
        title: blog.meta.title,
        tags: blog.meta.tags,
        excerpt: blog.meta.excerpt,
        featureImage: blog.meta.featureImage,
        thumb: blog.meta.thumb,
        slug: `${blog.meta.slug}.${lang}`,
        lang: lang,
      };
      tableblogs.push({
        single: content,
      });
      content.slug = blog.meta.slug;
      searchblogs.push(content);
    }

    return null;
  });

  if (!blogs) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold capitalize lg:text-3xl flex justify-between">
        {page.interest.head}
        <MyDialog
          data={searchblogs}
          language={lang}
          icon={
            <div className="flex hover:text-blue-600 hover:bg-slate-200 mt-1">
              <FaSearch className={`h-6 w-6`} aria-hidden="true"></FaSearch>
              <p className=" text-sm hover:underline">Find</p>
            </div>
          }
          list={<MyListBox tags={uniqTags(searchblogs)} />}
        />
      </h1>
      <p>{page.interest.sub}</p>

      <div className="mt-4 md:mt-8 ">
        <ReactTable blogs={tableblogs} />
      </div>
    </div>
  );
}
