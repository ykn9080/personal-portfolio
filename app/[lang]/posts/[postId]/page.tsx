import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import Image from "next/image";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import Sidebar from "@/app/[lang]/components/Sidebar";

export const revalidate = 80000;

type Props = {
  params: {
    postId: string;
    type: string;
    lang: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id,
    type: post.type,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { postId } = params;

  const post = await getPostByName(`${postId}.mdx`); //deduped!
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId, lang } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); //deduped!

  if (!post) notFound();

  const { meta, content } = post;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 ml-3">
      <div className="col-span-3">
        <section>
          <div className="text-2xl text-black dark:text-white my-5">
            {meta.title}
          </div>
          <article className="gridtwo">
            <Image
              src={meta.featureImage}
              width={400}
              height={100}
              alt="featureImage"
              className="float-right ml-10"
            />
            <p>{meta.excerpt}</p>
          </article>
          <div className="clear-both" />
          <article className="w-full aspect-video my-10">
            {meta.videoSourceURL && (
              <iframe
                src={meta.videoSourceURL}
                allowFullScreen
                width="100%"
                height="400"
              />
            )}
          </article>
          <article className="text-black dark:text-white">{content}</article>
        </section>
      </div>
      <div className="p-3">
        {/* @ts-expect-error Server Component */}
        <Sidebar postId={postId} lang={lang} meta={meta} />
      </div>
    </div>
  );
}
