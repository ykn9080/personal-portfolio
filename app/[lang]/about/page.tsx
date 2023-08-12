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
      <div className="flex flex-row">
        <div>
          <h1 className="text-3xl font-bold">{page.about["about-head"]}</h1>
          <p className="text-gray-500">{page.about["about-sub"]}</p>
          <p className="text-gray-500">{page.about["about-body"]}</p>
        </div>
        <Image
          src="/images/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <Image
          src="/profile-photo-600x600.png"
          className="img-fluid"
          alt="myself"
          width={400}
          height={300}
        ></Image>
      </div>
    </section>
  );
}
