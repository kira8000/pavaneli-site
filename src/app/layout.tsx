import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HtmlLangSync } from "@/components/layout/HtmlLangSync";
import { JsonLd } from "@/components/layout/JsonLd";
import { Sidebar } from "@/components/layout/Sidebar";
import { SkipLink } from "@/components/layout/SkipLink";
import { PROFILE } from "@/content/profile";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_TITLE = `${PROFILE.name} | ${PROFILE.role}`;
const SITE_DESCRIPTION = `${PROFILE.name} — ${PROFILE.role}. Web applications in React.js, Next.js, TypeScript and Node.js.`;

// Metadata is static (English): the visitor's language is only known on the client.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${PROFILE.name}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: PROFILE.name, url: PROFILE.links.linkedin }],
  creator: PROFILE.name,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: PROFILE.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["pt_BR"],
  },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the init script sets data-theme before React hydrates.
    <html
      lang={DEFAULT_LOCALE}
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <SkipLink />
        <JsonLd />
        <HtmlLangSync />
        <div className="flex min-h-dvh">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header />
            <main
              id="main"
              tabIndex={-1}
              className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 focus:outline-none sm:px-6 sm:py-12 lg:px-10"
            >
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
