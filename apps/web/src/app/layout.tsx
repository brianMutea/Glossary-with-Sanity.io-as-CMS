import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { SanityLive } from "@/sanity/live";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const firaCode = Fira_Code({ 
  subsets: ["latin"],
  variable: '--font-fira-code',
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
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <SanityLive />
      </body>
    </html>
  );
}
