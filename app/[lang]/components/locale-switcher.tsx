"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { i18n } from "@/i18n.config";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;

    const newsegments = synchronizeLang(locale, segments);
    return newsegments.join("/");
  };
  /**
   *
   * @param locale
   * @param segments
   * @returns segments의 마지막 mdx문서의 en, ko를 lang과 일치시켜줌
   */
  const synchronizeLang = (locale: string, segments: string[]): string[] => {
    let lastStr = segments[segments.length - 1];
    let arr = lastStr.split(".");

    if (arr.length > 1 && arr[1] !== locale) {
      arr[1] = locale;
      segments[segments.length - 1] = arr.join(".");
    }

    return segments;
  };
  let language = "ko";
  let items = pathName.split("/");
  if (items.length > 0) language = items[1];

  return (
    <div className="flex gap-x-1">
      <Link
        href={redirectedPathName("ko")}
        className="mr-2 transition-colors hover:bg-slate-500"
      >
        <Image
          alt="Korean"
          width={language === "ko" ? 32 : 25}
          height={10}
          src="https://cdn.ipregistry.co/flags/noto/kr.png"
        />
      </Link>
      <Link
        href={redirectedPathName("en")}
        className="transition-colors hover:bg-slate-500"
      >
        <Image
          alt="United States"
          width={language === "en" ? 32 : 25}
          height={30}
          src="https://cdn.ipregistry.co/flags/noto/us.png"
        />
      </Link>
    </div>
  );
}
