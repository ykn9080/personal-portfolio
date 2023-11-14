import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import React from "react";

export default async function Footer({ lang }: { lang: Locale }) {
  const { page } = await getDictionary(lang);
  return (
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left ">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2023 Copyright:
        <Link
          className="text-neutral-800 dark:text-neutral-400"
          href="https://tailwind-elements.com/"
        >
          <div>Youngki Nam</div>
        </Link>
      </div>
    </footer>
  );
}
