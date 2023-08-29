import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localBlog } from "@/lib/blogs";

import ReactTable from "../testbed/react-table/page";
type tableblog = {
  single: {
    title: string;
    excerpt: string;
    featureImage: string;
    slug: string;
    lang: string;
  };
};
export default async function DetailPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);
  const blogs = localBlog("blogs");
  let tableblogs: tableblog[] = [];
  blogs.map((blog) => {
    if (blog.slug.endsWith(lang) && blog.meta.type === "interest")
      tableblogs.push({
        single: {
          title: blog.meta.title,
          excerpt: blog.meta.excerpt,
          featureImage: blog.meta.featureImage,
          slug: `${blog.meta.slug}.${lang}`,
          lang: lang,
        },
      });
  });

  if (!blogs) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold capitalize lg:text-3xl ">
        {page.interest.head}
      </h1>
      <p>{page.interest.sub}</p>
      <div className="mt-4 md:mt-8 ">
        <ReactTable blogs={tableblogs} lang={lang} />

        {/* {blogs.map((blog) => {
              if (blog.slug.endsWith(lang) && blog.meta.type === "interest")
                return (
                  <div className="flex flex-row  hover:bg-slate-200 dark:hover:bg-slate-600">
                    <div className="flex-none w-14 md:w-20 pt-2">
                      <Image
                        className="rounded-lg border-solid border border-black-100 dark:border-white-500 bg-white"
                        layout="responsive"
                        width={300}
                        height={100}
                        src={blog.meta.featureImage}
                        alt=""
                      />
                    </div>
                    <div className="grow flex flex-col justify-between lg:mx-6">
                      <Link
                        className=" hover:text-black/170 dark:hover:text-grey dark:text-white"
                        href={`${lang}/blogs/${blog.slug}`}
                      >
                        <div className="text-lg font-bold hover:underline">
                          {blog.meta.title}
                        </div>
                        <div className="text-sm">{blog.meta.excerpt}</div>
                      </Link>
                    </div>
                  </div>
                );
            })} */}
      </div>
    </div>
  );
}
