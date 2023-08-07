import Link from "next/link";
import Image from "next/image";
import getFormattedDate from "@/lib/getFormattedDate";

type Props = {
  post: Meta;
};

export default function ListItem({ post }: Props) {
  const { id, title, date, featureImage, excerpt } = post;
  // const formattedDate = getFormattedDate(date);

  return (
    <li className="mt-4 text-2xl dark:text-white/90">
      <Link
        className="underline hover:text-black/70 dark:hover:text-white"
        href={`/posts/${id}`}
      >
        <Image src={featureImage} alt={title} width={100} height={50} />
        {title}
      </Link>
      <br />
      {/* <p className="text-sm mt-1">{formattedDate}</p> */}
    </li>
  );
}
