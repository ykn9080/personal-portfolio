import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { localBlog } from "@/lib/blogs";

export default async function DetailPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);
  const blogs = localBlog();
  if (!blogs) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            {page.interest.head}
          </h1>
          <p>{page.interest.sub}</p>
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => {
              if (blog.slug.endsWith(lang) && blog.meta.type === "interest")
                return (
                  <div className="lg:flex flex-row justify-between items-start shrink-0">
                    <div className="flex-none w-full md:w-40">
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
                        <div className="text-xl hover:underline">
                          {blog.meta.title}
                        </div>
                        <div className="text-sm mt-3">{blog.meta.excerpt}</div>
                      </Link>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
