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
<<<<<<< HEAD
        <p className="text-xl mb-2 mt-2">{title}</p>
        <Image src={featureImage} alt={title} width={300} height={400} />
=======
        {title}
        <Image src={featureImage} alt={title} width={800} height={300} />
>>>>>>> 041cd78791149cadd0e2311cc41c666399d3c42e
        <p className="text-sm mt-1">{formattedDate}</p>
        {/* <p className="text-sm mt-1">{excerpt}</p> */}
      </Link>
    </div>
  );
}
