// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import notFound from "./not-found";
import Sidebar from "@/app/[lang]/components/Sidebar";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}
// export async function generateMetadata({ params }: any) {
//   const blog = getPost(params);

//   return {
//     title: blog.frontMatter.title,
//     description: blog.frontMatter.excerpt,
//   };
// }
function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blogs", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default function Post({ params }: any) {
  const props = getPost(params);

  return (
    <div className="md:container md:mx-auto lg py-14">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 ml-3">
        <div className="col-span-3">
          <div className="prose dark:prose-invert">
            <h1>{props.frontMatter.title}</h1>

            <Image
              src={props.frontMatter.featureImage}
              width={400}
              height={100}
              alt="featureImage"
              className="float-right ml-10"
            />
            <p>{props.frontMatter.excerpt}</p>
            {props.frontMatter.videoSourceURL && (
              <iframe
                src={props.frontMatter.videoSourceURL}
                allowFullScreen
                width="100%"
                height="400"
              />
            )}
            <div>
              {/* @ts-expect-error Server Component*/}
              <MDXRemote source={props.content} />
            </div>
          </div>
          <div className="p-3">
            {/* @ts-expect-error Server Component */}
            <SideLocalbar slug={props.slug} lang={lang} meta={meta} />
          </div>
        </div>
      </div>
    </div>
  );
}

// export default async function Blog({ params }: any) {
//   console.log("slug::::", params.slug);
//   const props = getPost(params); //deduped!

//   if (!props) notFound();

//   return (
//     // <div className="md:container md:mx-auto lg py-14">
//     //   <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 ml-3">
//     //     <div className="col-span-3">
//     <>
//       <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
//         <h1>{props.frontMatter.title}</h1>

//         <Image
//           src={props.frontMatter.featureImage}
//           width={400}
//           height={100}
//           alt="featureImage"
//           className="float-right ml-10"
//         />
//         <p>{props.frontMatter.excerpt}</p>
//         {props.frontMatter.videoSourceURL && (
//           <iframe
//             src={props.frontMatter.videoSourceURL}
//             allowFullScreen
//             width="100%"
//             height="400"
//           />
//         )}
//         {/* <div className="text-2xl text-black dark:text-white my-5">
//               <h1>{props.frontMatter.title}</h1>
//             </div>
//             <article className="gridtwo">
//               <Image
//                 src={props.frontMatter.featureImage}
//                 width={400}
//                 height={100}
//                 alt="featureImage"
//                 className="float-right ml-10"
//               />
//               <p>{props.frontMatter.excerpt}</p>
//             </article>
//             <div className="clear-both" />
//             <article className="w-full aspect-video my-10">
//               {props.frontMatter.videoSourceURL && (
//                 <iframe
//                   src={props.frontMatter.videoSourceURL}
//                   allowFullScreen
//                   width="100%"
//                   height="400"
//                 />
//               )}
//             </article> */}
//       </article>
//       <article className="text-black dark:text-white">
//         {/* @ts-expect-error Server Component*/}
//         <MDXRemote source={props.content} />
//       </article>

//       {/* </div>
//         <div className="p-3"> */}
//       {/* @ts-expect-error Server Component */}
//       {/* <Sidebar postId={postId} lang={lang} meta={meta} /> */}
//       {/* </div>
//       </div>
//      </div>*/}
//     </>
//   );
//}
