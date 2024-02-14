//@ts-nocheck
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import React, { useEffect } from "react";
// import "@/styles/highlight-js/atom-one-light.css";
import { serialize } from "next-mdx-remote/serialize";
import SideLocalbar from "@/app/[lang]/components/SideLocalbar";
import { Locale } from "@/i18n.config";
import { Button, MyPopOver } from "./components";
import { KafkaDemo } from "@/app/[lang]/mdxComponents/kafka";
import Search, {
  SearchLabel,
  SearchShow,
  SearchShow1,
  SearchScript,
  SearchTab,
  SearchSubTab,
  SearchAntTab,
  SearchAntTab1,
  SearchStep,
  SearchSingle,
  SearchSingle1,
  SearchHidden,
} from "@/app/[lang]/testbed/search/page";
import OpenAIPage from "@/app/[lang]/testbed/openai/page";
import Toc from "@/app/[lang]/components/Toc";

import {
  Chipp,
  Snippett,
  Codee,
  Tooltipp,
  Spacee,
  Dividerr,
  Cardd,
  Modall,
  Drawerr,
  Alertt,
  TabssCompare,
} from "@/app/[lang]/components/nextui";
import Diagram from "@/app/[lang]/components/Diagram";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}
export async function generateMetadata({ params }: any) {
  const blog = getPost(params);

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.excerpt,
  };
}
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
  console.log(props);
  const { frontMatter, content } = props;

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkToc],
      rehypePlugins: [
        rehypeSlug,
        rehypeHighlight,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
    },
  };

  return (
    <div className="md:container md:mx-auto lg py-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="col-span-3  border-r ltr:border-r-0 ltr:border-l pr-5 dark:border-gray-700">
          <div className="prose dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-3">
              {props.frontMatter.title}
            </h1>
            <div className="flex flex-row bg-white ">
              <p>{props.frontMatter.excerpt}</p>
              <Image
                src={props.frontMatter.featureImage}
                width={600}
                height={400}
                sizes="(min-width:480px) 50vw,
                (min-width:728px) 33vw,
                (min-width:976px) 25vw,
                100vw"
              />
            </div>

            <div className="clear-both" />
            {props.frontMatter.videoSourceURL && (
              <div className="embed-responsive aspect-ratio-16/9 my-5 py-10  w-full">
                <h3 className="text-xl font-bold">
                  {props.frontMatter.videoTitle}
                </h3>
                <iframe
                  className="embed-responsive-item w-full"
                  src={props.frontMatter.videoSourceURL}
                  height={600}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
            picture-in-picture allowfullscreen"
                ></iframe>
              </div>
            )}
            <div className="leading-5 ">
              {/* @ts-expect-error Server Component */}
              <MDXRemote
                source={props.content}
                options={options}
                components={{
                  Button,
                  MyPopOver,
                  SearchLabel,
                  SearchShow,
                  SearchShow1,
                  SearchScript,
                  Search,
                  SearchTab,
                  SearchSubTab,
                  SearchAntTab,
                  SearchAntTab1,
                  SearchStep,
                  SearchSingle,
                  SearchSingle1,
                  SearchHidden,
                  KafkaDemo,
                  Chipp,
                  Snippett,
                  Codee,
                  Diagram,
                  Tooltipp,
                  Spacee,
                  Dividerr,
                  Cardd,
                  Modall,
                  Drawerr,
                  Alertt,
                  TabssCompare,
                  OpenAIPage,
                }}
              />
            </div>
          </div>
        </div>

        <div className="pl-3">
          {/* @ts-expect-error Server Component */}
          <SideLocalbar slug={props.slug} lang={lang} meta={frontMatter} />
          <Toc />
        </div>
      </div>
    </div>
  );
}
