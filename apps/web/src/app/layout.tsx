import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { SanityLive } from "@/sanity/live";
import { FaviconUpdater } from "@/components/FaviconUpdater";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { sanityFetch } from "@/sanity/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

const lato = Lato({
  subsets: ["latin"],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
});

export async function generateMetadata(): Promise<Metadata> {
  // Fetch site settings for metadata
  let siteSettings = null;
  try {
    const { data } = await sanityFetch({ 
      query: SITE_SETTINGS_QUERY,
      tags: ['siteSettings']
    });
    siteSettings = data;
  } catch (error) {
    console.error('Failed to fetch site settings for metadata:', error);
  }

  const title = siteSettings?.title || "Glossifyd - Code Tutorials & Technical Articles";
  const description = siteSettings?.tagline || "Learn programming through comprehensive tutorials and technical articles covering modern web development, frameworks, and best practices.";

  return {
    title,
    description,
    keywords: "programming, tutorials, web development, javascript, typescript, react, nextjs",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site settings server-side to prevent flash of placeholder content
  let siteSettings = null;
  try {
    const { data } = await sanityFetch({ 
      query: SITE_SETTINGS_QUERY,
      tags: ['siteSettings']
    });
    siteSettings = data;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
  }

  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans`}>
        <SiteSettingsProvider initialSettings={siteSettings}>
          <FaviconUpdater />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SiteSettingsProvider>
        <SanityLive />
      </body>
    </html>
  );
}
