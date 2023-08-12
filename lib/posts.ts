import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
import Video from "@/app/[lang]/components/Video";
import CustomImage from "@/app/[lang]/components/CustomImage";
import { Locale } from "@/i18n.config";

export async function getPostListSameTypeByName(
  fileName: string
): Promise<Meta[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/ykn9080/personal-contents/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        //Authorization: "Bearer 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",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return undefined;

  const repoFiletree: Filetree = await res.json();

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(`.mdx`));

  const posts: Meta[] = [];

  for (const file of filesArray) {
    const post = await getPostByName(file);

    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  //fileName += "interests/";

  const res = await fetch(
    `https://raw.githubusercontent.com/ykn9080/personal-contents/main/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        //Authorization: "Bearer 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",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
    type: string;
    language: string;
    featureImage: string;
    excerpt: string;
  }>({
    source: rawMDX,
    components: {
      Video,
      CustomImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  const id = fileName.replace(/\.mdx$/, "");

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
      type: frontmatter.type,
      language: frontmatter.language,
      featureImage: frontmatter.featureImage,
      excerpt: frontmatter.excerpt,
    },
    content,
  };

  return blogPostObj;
}
type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};
export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/ykn9080/personal-contents/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        //Authorization: "Bearer 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",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return undefined;

  const repoFiletree: Filetree = await res.json();

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(`.mdx`));

  const posts: Meta[] = [];

  for (const file of filesArray) {
    const post = await getPostByName(file);

    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
