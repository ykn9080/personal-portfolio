import Blog from "./blog/page";
import MyProfilePic from "./components/MyProfilePic";
import { Locale, i18n } from "@/i18n.config";

export const revalidate = 800;

export default function Home({ params }: { params: { lang: Locale } }) {
  return (
    <div className="container mx-auto">
      <MyProfilePic params={params} />

      <Blog params={params} part="work" />

      <Blog params={params} part="interest" />
    </div>
  );
}
