import React from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localBlog } from "@/lib/blogs";
import ReactTable from "@/lib/react-table/page";

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
    return null;
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
        <ReactTable blogs={tableblogs} />
      </div>
    </div>
  );
}
