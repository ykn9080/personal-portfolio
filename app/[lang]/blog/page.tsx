// app/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ListLocal from "@/app/[lang]/components/ListLocal";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import Image from "next/image";
import { localBlog } from "../../../lib/blogs.js";

// app/page.tsx
export default async function Blog({
  params,
  part,
}: {
  params: { lang: Locale };
  part: string;
}) {
  const { page } = await getDictionary(params.lang);
  const blogs = localBlog();
  return (
    <>
      <section className="mt-16">
        <h2 className="text-4xl font-bold">{part}</h2>
        <p className="mb-5 text-lg">
          {part === "interest"
            ? page.home["index-interest"]
            : page.home["index-work"]}
        </p>
        <div className="gap-4 flex flex-row flex-wrap">
          {blogs.map((blog) => {
            if (blog.slug.endsWith(params.lang) && blog.meta.type === part)
              return (
                <div className="box-border md:box-content w-full lg:w-64 md:w-80">
                  <Link
                    className=" hover:text-black/170 dark:hover:text-grey"
                    passHref
                    href={{
                      pathname: `${params.lang}/blogs/${blog.slug}`,
                      query: { part, lang: params.lang },
                    }}
                  >
                    <div className="overflow-hidden border-2 block border-indigo-500/50 bg-white rounded-lg shadow-lg mb-4">
                      <Image
                        src={blog.meta.featureImage}
                        // className="object-cover object-center w-full h-44 rounded-lg md:h-100"
                        className={
                          blog.meta.type === "work"
                            ? "object-cover object-center w-full h-44 rounded-lg md:h-100"
                            : "object-contain object-center w-full h-44"
                        }
                        alt={blog.meta.title}
                        width={250}
                        height={100}
                      />

                      <div className="py-5 text-center">
                        <p className="block text-xl font-bold text-gray-800">
                          {blog.meta.title}
                        </p>
                        <span className="px-2 text-sm truncate md:text-ellipsis">
                          {blog.meta.excerpt}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
          })}
        </div>
      </section>
    </>
  );
}
