import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import Image from "next/image";

export default async function MyProfilePic({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);
  return (
    <div className="relative flex flex-col py-16 lg:pt-0 lg:flex-col lg:pb-0 ">
      <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
        <div className="max-w-xl mb-6">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900  dark:text-white uppercase rounded-full bg-teal-accent-400">
              {page.home.title}
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900  dark:text-gray-200 sm:text-4xl sm:leading-none">
            {page.home.subtitle}
          </h2>
          <p className="text-base text-gray-700  dark:text-white md:text-lg">
            {page.home.description}
          </p>
        </div>
      </div>

      <div className="inset-y-0 right-0 w-full max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
        <Image
          src="/yknam1.jpg"
          alt="mypic"
          width={300}
          height={200}
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full"
        ></Image>
      </div>
    </div>
  );
}
