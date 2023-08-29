import { useMemo } from "react";
import { Image } from "@chakra-ui/react";
import Link from "next/link";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Single",
        accessor: "single",
        Cell: ({ value, row }) => {
          return (
            <div className=" grid grid-cols-1 md:mt-4 md:grid-cols-2 hover:bg-sky-200 ">
              <Image
                className="h-auto w-8 md:w-full"
                objectFit="contain"
                src={value.featureImage}
                alt={value.title}
              />
              <div>
                <Link
                  className=" hover:text-black/170 dark:hover:text-grey dark:text-white"
                  href={`${value.lang}/blogs/${value.slug}`}
                >
                  <p className="text-2xl font-bold hover:underline">
                    {value.title}
                  </p>
                  <p className="text-lg"> {value.excerpt}</p>
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
