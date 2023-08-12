import Link from "next/link";
import Image from "next/image";
import getFormattedDate from "@/lib/getFormattedDate";

type Props = {
  post: Meta;
  lang: string;
};
export default function ListItem({ post, lang }: Props) {
  const { id, title, date, featureImage, excerpt, type } = post;
  const formattedDate = getFormattedDate(date);

  return (
    <>
      <Link
        className=" hover:text-black/170 dark:hover:text-grey dark:text-white"
        href={`${lang}/posts/${id}`}
      >
        <div className="w-full max-w-xs overflow-hidden border-2 block border-indigo-500/50 bg-white rounded-lg shadow-lg dark:bg-gray-800 mb-4">
          <Image
            src={featureImage}
            className="rounded-lg lg:w-64"
            alt={title}
            layout="responsive"
            width={250}
            height={100}
          />

          <div className="py-5 text-center">
            <p className="block text-xl font-bold text-gray-800 dark:text-white">
              {title}
            </p>
            <span className="px-2 text-sm truncate md:text-ellipsis text-gray-700 dark:text-gray-200">
              {excerpt}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}
