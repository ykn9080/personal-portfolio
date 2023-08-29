import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import LocaleSwitcher from "./locale-switcher";
import { ThemeButton } from "@/app/[lang]/components/ThemeButton";
//import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default async function Navbar({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);

  return (
    <nav className=" bg-sky-900 p-3">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href={`/${lang}`} className="font-bold text-xl">
            Youngki Nam
          </Link>
        </div>

        <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="text-sm sm:flex-grow">
            <Link
              href={`/${lang}`}
              className="block mt-3 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {navigation.home}
            </Link>
            <Link
              href={`/${lang}/work`}
              className="block mt-3 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {navigation.work}
            </Link>
            <Link
              href={`/${lang}/interest`}
              className="block mt-3 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {navigation.interest}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="block mt-3 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {navigation.about}
            </Link>
          </div>
          <div className="mt-3 sm:flex sm:space-x-1">
            <LocaleSwitcher />
            <ThemeButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
