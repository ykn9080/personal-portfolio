import "./globals.css";
import Navbar from "./components/Navbar";
import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n.config";
import ThemeProviders from "@/app/[lang]/themeProvider";
import { ReduxProviders } from "./reduxProvider";

import { Inter } from "next/font/google";

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
    <html lang={params.lang}>
      <body className={inter.className}>
        <ReduxProviders>
          <ThemeProviders>
            {/* @ts-expect-error async server component */}
            <Navbar lang={params.lang} />
            <main>{children}</main>
          </ThemeProviders>
        </ReduxProviders>
      </body>
    </html>
  );
}
