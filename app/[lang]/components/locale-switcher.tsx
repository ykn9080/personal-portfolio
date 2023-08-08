"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <ul className="flex gap-x-3">
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className="rounded-md border bg-black px-3 py-2 text-white"
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
