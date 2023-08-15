import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPostsMeta } from "@/lib/posts";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export default async function DetailPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);
  const posts = await getPostsMeta();

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            From the blog
          </h1>
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            {posts.map((post) => {
              if (post.id.endsWith(lang) && post.type === "interest")
                return (
                  <div className="lg:flex">
                    <Image
                      className="w-full max-w-xs overflow-hidden rounded-lg lg:w-64 border-solid border border-black-100 dark:border-white-500"
                      layout="responsive"
                      width={250}
                      height={100}
                      src={post.featureImage}
                      alt=""
                    />

                    <div className="flex flex-col justify-between lg:mx-6">
                      <Link
                        href={`${lang}/posts/${post.id}`}
                        className="text-gray-800 dark:text-white "
                      >
                        <div className="text-xl hover:underline">
                          {post.title}
                        </div>
                        <div className="text-sm mt-3">{post.excerpt}</div>
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
