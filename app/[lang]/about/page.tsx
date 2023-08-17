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
    <div className="md:container md:mx-autopy-14">
      <h1 className="text-3xl font-bold mt-10">{page.about["about-sub"]}</h1>
      <div className="flex flex-row flex-wrap">
        <div className="mx-auto mt-8 ml-5">
          <Image
            src="/yknam.jpg"
            alt="mypic"
            width={300}
            height={200}
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full"
          ></Image>
        </div>
        <div className=" ml-10">
          <p className="text-gray-500">{page.about["about-body"]}</p>
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold my-10">My Skill Set</h3>
        <Image
          src="/images/Myskills.png"
          alt="myskill"
          width={800}
          height={400}
          className=" mx-auto mt-8 ml-5"
        ></Image>
      </div>
      <div className="my-20">
        <h3 className="text-3xl font-bold my-10 mb-3">Resume</h3>
        <div className="underline flex flex-row">
          <Image src="/images/pdf.png" width={16} height={12} alt="pdf" />
          <a
            href="/yknam_resume.pdf"
            download
            className="ml-1  hover:bg-slate-200"
          >
            download
          </a>
        </div>
      </div>
    </div>
  );
}
