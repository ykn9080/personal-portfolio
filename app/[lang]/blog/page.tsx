// app/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ListItem from "@/app/[lang]/components/ListItem";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import Image from "next/image";
import { localBlog } from "@/lib/blogs";

// app/page.tsx
export default async function Blog({
  params,
  part,
}: {
  params: { lang: Locale };
  part: string;
}) {
  // // 1) Set blogs directory
  // const blogDir = "blogs";

  // // 2) Find all files in the blog directory
  // const files = fs.readdirSync(path.join(blogDir));
  // const { page } = await getDictionary(params.lang);
  // if (!files) {
  //   return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  // }

  // // 3) For each blog found
  // const blogs = files.map((filename) => {
  //   // 4) Read the content of that blog
  //   const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");

  //   // 5) Extract the metadata from the blog's content
  //   const { data: frontMatter } = matter(fileContent);

  //   // 6) Return the metadata and page slug
  //   return {
  //     meta: frontMatter,
  //     slug: filename.replace(".mdx", ""),
  //   };
  // });
  const { page } = await getDictionary(params.lang);
  const blogs = await localBlog();
  return (
    <>
      <section className="mt-16">
        <h2 className="text-4xl font-bold text-black dark:text-white/90 ">
          {part}
        </h2>
        <p className="mb-5 text-lg">
          {part === "interest"
            ? page.home["index-interest"]
            : page.home["index-work"]}
        </p>
        {/* <div className="gap-4 flex flex-row flex-wrap">
          {blogs.map((post) => {
            if (post.id.endsWith(params.lang) && post.type === part)
              return <ListItem key={post.id} post={post} lang={params.lang} />;
          })}
        </div> */}
      </section>
      <section className="py-10">
        <h2 className="text-2xl font-bold">Latest Blogs</h2>

        <div className="py-2">
          {blogs.map((blog) => {
            if (blog.slug.endsWith(params.lang) && blog.meta.type === part)
              return (
                //<ListItem key={blog.meta.id} post={blog} lang={params.lang} />
                //   <Link href={`/${params.lang}/blogs/${blog.slug}`} passHref key={blog.slug}>
                //     <div className="py-2 flex justify-between align-middle gap-2">
                //       <div>
                //         <h3 className="text-lg font-bold">{blog.meta.title}</h3>
                //         <p className="text-gray-400">{blog.meta.excerpt}</p>
                //       </div>
                //       {/* <div className="my-auto text-gray-400">
                //       <p>{blog.meta.date}</p>
                //     </div> */}
                //     </div>
                //   </Link>
                <div className="box-border md:box-content w-full lg:w-64 md:w-80">
                  <Link
                    className=" hover:text-black/170 dark:hover:text-grey dark:text-white"
                    passHref
                    href={{
                      pathname: `${params.lang}/blogs/${blog.slug}`,
                      query: { slug: blog.slug },
                    }}
                  >
                    <div className="overflow-hidden border-2 block border-indigo-500/50 bg-white rounded-lg shadow-lg dark:bg-gray-800 mb-4">
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
                        <p className="block text-xl font-bold text-gray-800 dark:text-white">
                          {blog.meta.title}
                        </p>
                        <span className="px-2 text-sm truncate md:text-ellipsis text-gray-700 dark:text-gray-200">
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

// export  async function Posts({
//   params,
//   part,
// }: {
//   params: { lang: Locale };
//   part: string;
// }) {
//   const posts = await getPostsMeta();

//   const { page } = await getDictionary(params.lang);
//   if (!posts) {
//     return <p className="mt-10 text-center">Sorry, no posts available.</p>;
//   }

//   return (
//     <section className="mt-16">
//       <h2 className="text-4xl font-bold text-black dark:text-white/90 ">
//         {part}
//       </h2>
//       <p className="mb-5 text-lg">
//         {part === "interest"
//           ? page.home["index-interest"]
//           : page.home["index-work"]}
//       </p>
//       <div className="gap-4 flex flex-row flex-wrap">
//         {posts.map((post) => {
//           if (post.id.endsWith(params.lang) && post.type === part)
//             return <ListItem key={post.id} post={post} lang={params.lang} />;
//         })}
//       </div>
//     </section>
//   );
// }
