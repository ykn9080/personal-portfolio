import Image from "next/image";

export default function MyProfilePic() {
  return (
    <section className="w-full mx-auto">
      {/* <Image
        className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        src="/images/profile-photo-600x600.png"
        width={200}
        height={200}
        alt="Dave Gray"
        priority={true}
      /> */}
      <Image
        src="https://raw.githubusercontent.com/ykn9080/personal-contents/main/images/yknam1.jpg"
        alt="mypic"
        width={800}
        height={200}
        className="hero-img"
      ></Image>
    </section>
  );
}
