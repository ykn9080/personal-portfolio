// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import notFound from "./not-found";
import SideLocalbar from "@/app/[lang]/components/SideLocalbar";
import { Locale } from "@/i18n.config";

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

export default function Post({ params }: any, lang: Locale) {
  const props = getPost(params);
  const { frontMatter, content } = props;
  return (
    <div className="md:container md:mx-auto lg py-14">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 ml-3">
        <div className="col-span-3">
          <div className="prose dark:prose-invert max-w-none">
            <h1>{props.frontMatter.title}</h1>
            <div className="lg:float-right ml-10 ">
              <Image
                src={props.frontMatter.featureImage}
                width={400}
                height={100}
                alt="featureImage"
              />
            </div>
            <p>{props.frontMatter.excerpt}</p>

            <div className="clear-both" />
            {props.frontMatter.videoSourceURL && (
              <div className="embed-responsive aspect-ratio-16/9 my-5 py-10  w-full">
                <h3>{props.frontMatter.videoTitle}</h3>
                <iframe
                  className="embed-responsive-item w-full"
                  src={props.frontMatter.videoSourceURL}
                  height={600}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
            picture-in-picture allowfullscreen"
                ></iframe>
              </div>
            )}
            <div className="prose-lg ">
              {/* @ts-expect-error Server Component*/}
              <MDXRemote source={props.content} />
            </div>
          </div>
        </div>
        <div className="p-3">
          {/* @ts-expect-error Server Component */}
          <SideLocalbar slug={props.slug} lang={lang} meta={frontMatter} />
        </div>
      </div>
    </div>
  );
}
