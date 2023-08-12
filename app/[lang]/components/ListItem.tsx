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
    <div className="ImgContainer1">
      <Link
        className="underline hover:text-black/170 dark:hover:text-grey dark:text-white"
        href={`/posts/${id}`}
      >
        {title}
        <Image src={featureImage} alt={title} width={800} height={300} />
        <p className="text-sm mt-1">{formattedDate}</p>
        {/* <p className="text-sm mt-1">{excerpt}</p> */}
      </Link>
    </div>
  );
}
