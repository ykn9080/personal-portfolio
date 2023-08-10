import Link from "next/link";
import Image from "next/image";
import getFormattedDate from "@/lib/getFormattedDate";

type Props = {
  post: Meta;
};

export default function ListItem({ post }: Props) {
  const { id, title, date, featureImage, excerpt } = post;
  const formattedDate = getFormattedDate(date);

  const lang = id.split(".")?.[1];

  return (
    <>
      <Link
        className="underline hover:text-black/170 dark:hover:text-grey dark:text-white"
        href={`/posts/${id}`}
      >
        <div className="mt-5 mx-auto px-2">
          <div className="text-gray-700 text-center bg-gray-300 px-5 py-5 m-2 rounded">
            <div className="mt-4 lg:mt-0 lg:ml-6">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                {title}
              </div>
              {/* 
                  <p className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">
                    {formattedDate}
                  </p> */}
            </div>

            <div className="lg:items-center">
              <Image
                src={featureImage}
                className="rounded-lg lg:w-64"
                alt={title}
                width={300}
                height={100}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
