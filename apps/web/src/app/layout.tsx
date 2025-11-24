import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { SanityLive } from "@/sanity/live";
import { FaviconUpdater } from "@/components/FaviconUpdater";

const lato = Lato({
  subsets: ["latin"],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: "Tech Glossary - Code Tutorials & Technical Articles",
  description: "Learn programming through comprehensive tutorials and technical articles covering modern web development, frameworks, and best practices.",
  keywords: "programming, tutorials, web development, javascript, typescript, react, nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans`}>
        <FaviconUpdater />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <SanityLive />
      </body>
    </html>
  );
}
