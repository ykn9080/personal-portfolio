import Link from "next/link";
import { FaYoutube, FaTwitter, FaGithub, FaLaptop } from "react-icons/fa";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import LocaleSwitcher from "./locale-switcher";
import { ThemeButton } from "@/app/[lang]/components/ThemeButton";

export default async function Navbar({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="font-bold text-xl">
          Youngki Nam Blog
        </Link>
      </div>

      <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="text-sm sm:flex-grow">
          <a
            href="#"
            className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Your Business
          </a>
          <a
            href="#"
            className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Networking
          </a>
          <Link
            href="/about"
            className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white"
          >
            {navigation.about}
          </Link>
        </div>
        <div className="inline-block  mr-2 leading-none">
          <LocaleSwitcher />
        </div>
        <div className="inline-block ">
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
}
