import Posts from "./components/Posts";
import Blog from "@/app/[lang]/blog/page";
import MyProfilePic from "./components/MyProfilePic";
import { Locale, i18n } from "@/i18n.config";
import { NextRequest, NextResponse } from "next/server";
import { request } from "http";

export const revalidate = 800;

export default function Home({ params }: { params: { lang: Locale } }) {
  return (
    <div className="container mx-auto">
      {/* @ts-expect-error Server Component */}
      <MyProfilePic params={params} />

      {/* @ts-expect-error Server Component */}
      <Blog params={params} part="work" />

      {/* @ts-expect-error Server Component */}
      <Blog params={params} part="interest" />
      {/* @ts-expect-error Server Component */}
      <Posts params={params} part="interest" />
      {/* @ts-expect-error Server Component */}
      <Posts params={params} part="work" />
    </div>
  );
}
