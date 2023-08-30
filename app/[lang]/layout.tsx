import "./globals.css";
import Navbar from "./components/Navbar";
import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n.config";
import ThemeProviders from "@/app/[lang]/themeProvider";
import { ReduxProviders } from "./reduxProvider";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youngki Nam's Blog",
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

            {/* @ts-expect-error async server component */}
            <Footer lang={params.lang} />
          </ThemeProviders>
        </ReduxProviders>
      </body>
    </html>
  );
}
