import "./globals.css";
import Navbar from "./components/Navbar";
import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n.config";

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
    <html lang={params.lang}>
      <body className="dark:bg-slate-800">
        {/* @ts-expect-error async server component */}
        <Navbar lang={params.lang} />
        <main className="px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
