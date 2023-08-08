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
    <section className="mt-6 mx-auto max-w-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">{part}</h2>
      <div className="bodycontent">
        {posts.map((post) => {
          if (post.id.endsWith(params.lang) && post.type === part)
            return <ListItem key={post.id} post={post} />;
        })}
      </div>
    </section>
  );
}