import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <section className="py-24">
      <h1 className="text-3xl font-bold ml-10">{page.about["about-head"]}</h1>
      <div className="flex flex-row">
        <Image
          src="/yknam.jpg"
          alt="mypic"
          width={300}
          height={200}
          className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8 ml-5"
        ></Image>
        <div>
          <p className="text-gray-500">{page.about["about-sub"]}</p>
          <p className="text-gray-500">{page.about["about-body"]}</p>
        </div>
      </div>
    </section>
  );
}
