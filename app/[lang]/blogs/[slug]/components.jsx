import dynamic from "next/dynamic";

export const MyPopOver = dynamic(
  () => import("@/app/[lang]/components/PopOver"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export const Button = dynamic(() => import("@/app/[lang]/components/Button"));
