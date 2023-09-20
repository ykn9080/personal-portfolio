"use client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { consumer } from "@/lib/flask";
import Image from "next/image";

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);
  // const rtn = await consumer();
  // console.log(rtn);
  return (
    <div className="md:container md:mx-auto py-14 ">
      <h1 className="text-3xl font-bold  mt-10">{page.about["about-sub"]}</h1>
      <div className="lg:float-left ml-10 ">
        <Image
          src="/yknam.jpg"
          alt="mypic"
          width={300}
          height={200}
          className="border-4 float-left border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full"
        ></Image>
      </div>
      <div className=" ml-10">
        <p className="text-gray-500">{page.about["about-body"]}</p>
      </div>

      <div className="clear-both" />

      <h3 className="text-3xl font-bold my-10">My Skill Set</h3>
      <Image
        src="/images/Myskills.png"
        alt="myskill"
        width={800}
        height={400}
        className=" mx-auto mt-8 ml-5"
      ></Image>

      <div className="my-10">
        <h3 className="text-3xl font-bold mb-3">Resume</h3>
        <div className="underline ">
          <Image
            src="/images/pdf.png"
            width={16}
            height={12}
            alt="pdf"
            className="float-left align-top"
          />
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
