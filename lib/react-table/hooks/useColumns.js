import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Single",
        accessor: "single",
        Cell: ({ value, row }) => {
          if (!value) return null;
          return (
            <div className="flex hover:bg-sky-200">
              <Image
                width={150}
                height={100}
                src={value.featureImage}
                alt={value.title}
                className="flex-none"
              />
              <div className="ml-5 max-w-4xl">
                <Link
                  className=" hover:text-black/170 dark:hover:text-grey"
                  href={`${value.lang}/blogs/${value.slug}`}
                >
                  <p className="text-2xl font-bold hover:underline">
                    {value.title}
                  </p>
                  <p className="text-sm max-w-4xl"> {value.excerpt}</p>
                </Link>
              </div>
            </div>
          );
        },
      },
      // {
      //   Header: "Title",
      //   accessor: "title",
      // },
      // {
      //   Header: "Excerpt",
      //   accessor: "excerpt",
      // },
    ],
    []
  );

  return columns;
}
