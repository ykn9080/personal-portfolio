import Link from "next/link";
import Image from "next/image";
// import getFormattedDate from "@/lib/getFormattedDate";

type Props = {
  blog: Meta;
  slug: string;
  lang: string;
};
export default function ListItem({ blog, slug, lang }: Props) {
  const { id, title, date, featureImage, excerpt, type } = blog;
  // const formattedDate = getFormattedDate(date);

  return (
    <>
      <div className="box-border md:box-content w-full lg:w-64 md:w-80">
        <Link
          className=" hover:text-black/170 dark:hover:text-grey dark:text-white"
          passHref
          key={slug}
          href={{ pathname: `${lang}/blogs/${slug}` }}
        >
          <div className="overflow-hidden border-2 block border-indigo-500/50 bg-white rounded-lg shadow-lg dark:bg-gray-800 mb-4">
            <Image
              src={featureImage}
              // className="object-cover object-center w-full h-44 rounded-lg md:h-100"
              className={
                type === "work"
                  ? "object-cover object-center w-full h-44 rounded-lg md:h-100"
                  : "object-contain object-center w-full h-44"
              }
              alt={title}
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
      </div>
    </>
  );
}
