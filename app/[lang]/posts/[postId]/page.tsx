import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import Image from "next/image";

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

export default async function Post({ params: { postId, type } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); //deduped!

  if (!post) notFound();

  const { meta, content } = post;

  // const pubDate = getFormattedDate(meta.date);

  // const tags = meta.tags.map((tag, i) => (
  //   <Link key={i} href={`/tags/${tag}`}>
  //     {tag}
  //   </Link>
  // ));

  return (
    <>
      <div className="work">
        <section>
          <article className="gridtwo">
            <p>{meta.excerpt}</p>
          </article>

          <article className="text-black dark:text-white">{content}</article>
        </section>
      </div>
    </>
  );
}
