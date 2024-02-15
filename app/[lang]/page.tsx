import Blog from "./blog/page";
import MyProfilePic from "./components/MyProfilePic";
import { Locale, i18n } from "@/i18n.config";

export const revalidate = 800;

export default function Home({ params }: { params: { lang: Locale } }) {
  return (
    <div className="container mx-auto">
      <MyProfilePic params={params} />

      <Blog lang={params.lang} part="work" />

      <Blog lang={params.lang} part="interest" />
    </div>
  );
}
