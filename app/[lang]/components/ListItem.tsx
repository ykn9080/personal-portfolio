import Link from "next/link";
import Image from "next/image";
import getFormattedDate from "@/lib/getFormattedDate";

type Props = {
  post: Meta;
};

export default function ListItem({ post }: Props) {
  const { id, title, date, featureImage, excerpt } = post;
  const formattedDate = getFormattedDate(date);

  const lang = id.split(".")?.[1];

  return (
    <div className="ImgContainer">
      <Link
        className="underline hover:text-black/70 dark:hover:text-white"
        href={`/posts/${id}`}
      >
        {title}
        <Image src={featureImage} alt={title} width={300} height={400} />
        <p className="text-sm mt-1">{formattedDate}</p>
        <p className="text-sm mt-1">{excerpt}</p>
      </Link>
    </div>
  );
}
