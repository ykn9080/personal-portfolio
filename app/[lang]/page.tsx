import Posts from "./components/Posts";
import MyProfilePic from "./components/MyProfilePic";
import { Locale } from "@/i18n.config";

export const revalidate = 80000;

export default function Home({ params }: { params: { lang: Locale } }) {
  return (
    <div className="mx-auto">
      <MyProfilePic />
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Dave</span>.
        </span>
      </p>
      {/* @ts-expect-error Server Component */}
      <Posts params={params} part="work" />
      {/* @ts-expect-error Server Component */}
      <Posts params={params} part="interest" />
    </div>
  );
}
