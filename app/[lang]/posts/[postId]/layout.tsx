import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n.config";
import Providers from "@/app/[lang]/providers";
import { Inter } from "next/font/google";
import Link from "next/link";
import Sidebar from "@/app/[lang]/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dave's Blog",
  description: "Created by Dave Gray",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    // <section>
    //   {/* Include shared UI here e.g. a header or sidebar */}
    //   <nav>hihihi</nav>

    //   {children}
    // </section>
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
      <div className="col-span-3">{children}</div>
      <div className="p-3">
        <Sidebar />
      </div>
    </div>
  );
}
