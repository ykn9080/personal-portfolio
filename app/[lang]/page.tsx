import Blog from "./blog/page";
import MyProfilePic from "./components/MyProfilePic";
import { Locale, i18n } from "@/i18n.config";

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
    </div>
  );
}
