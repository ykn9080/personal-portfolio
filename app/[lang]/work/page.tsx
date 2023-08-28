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
      <section>
        <div className="container py-10 mx-auto">
          <h1 className="text-2xl font-semibold  capitalize lg:text-3xl">
            {page.work.head}
          </h1>
          <p>{page.work.sub}</p>
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            {blogs.map((blog) => {
              if (blog.slug.endsWith(lang) && blog.meta.type === "work")
                return (
                  <div className="lg:flex">
                    <Image
                      className="object-cover w-full h-56 rounded-lg lg:w-64 border-solid border border-black-100 dark:border-white-500"
                      width={200}
                      height={100}
                      src={blog.meta.featureImage}
                      alt=""
                    />

                    <div className="flex flex-col justify-between lg:mx-6">
                      <Link
                        className=" hover:text-black/170 dark:hover:text-grey "
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
