import { getPostsMeta } from "@/lib/posts";
import ListItem from "./ListItem";
import { Locale } from "@/i18n.config";

export default async function Posts({
  params,
  part,
}: {
  params: { lang: Locale };
  part: string;
}) {
  const posts = await getPostsMeta();

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  return (
    <section className="mt-6">
      <h2 className="text-4xl font-bold text-black dark:text-white/90 mb-5 mt-10">
        {part}
      </h2>
      <div className="gap-4 flex flex-row flex-wrap">
        {posts.map((post) => {
          if (post.id.endsWith(params.lang) && post.type === part)
            return <ListItem key={post.id} post={post} lang={params.lang} />;
        })}
      </div>
    </section>
  );
}
