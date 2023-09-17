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
            <div className="flex hover:bg-slate-200">
              <Image
                // width={150}
                // height={100}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 150, height: 50 }}
                src={value.thumb}
                alt={value.title}
                className="flex-none object-contain"
              />
              <div className="ml-5 max-w-4xl">
                <Link
                  className=" hover:text-black/170 dark:hover:text-black"
                  href={`${value.lang}/blogs/${value.slug}.${value.lang}`}
                >
                  <p className="text-lg font-bold hover:underline">
                    {value.title}
                  </p>
                  <p className="text-sm max-w-xl truncate"> {value.excerpt}</p>
                </Link>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return columns;
}
