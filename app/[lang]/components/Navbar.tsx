import Link from "next/link";
import { FaYoutube, FaTwitter, FaGithub, FaLaptop } from "react-icons/fa";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import LocaleSwitcher from "./locale-switcher";
import { ThemeButton } from "@/app/[lang]/components/ThemeButton";

export default async function Navbar({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);
  console.log(navigation);
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link
            href="/"
            className="text-white/90 no-underline hover:text-white"
          >
            Youngki Nam
          </Link>
        </h1>
        <div className="flex flex-row justify-center  align-middle gap-4">
          <h4 className="font-bold grid place-content-center">
            <Link href={`/${lang}`}>{navigation.home}</Link>
          </h4>
          <h4 className="font-bold grid place-content-center">
            <Link href={`/${lang}/about`}>{navigation.about}</Link>
          </h4>
          <LocaleSwitcher />
          {/* <Link
            className="text-white/90 hover:text-black"
            href="https://www.youtube.com/@DaveGrayTeachesCode"
          >
            <FaYoutube />
          </Link>
          <Link
            className="text-white/90 hover:text-white"
            href="https://courses.davegray.codes/"
          >
            <FaLaptop />
          </Link>
          <Link
            className="text-white/90 hover:text-white"
            href="https://github.com/gitdagray"
          >
            <FaGithub />
          </Link>
          <Link
            className="text-white/90 hover:text-white"
            href="https://twitter.com/yesdavidgray"
          >
            <FaTwitter />
          </Link> */}
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
}
