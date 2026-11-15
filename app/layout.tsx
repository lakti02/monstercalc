import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ui/Theme";
import { SearchProvider } from "@/components/ui/Search";
import { SITE } from "@/lib/tools";
import { Analytics } from "@/components/Analytics";

// Self-hosted by next/font, so there is no render-blocking request to a font
// CDN and no layout shift once the file lands.
const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "MonsterCalc — Free Online Calculators, No Ads",
    template: "%s | MonsterCalc",
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "MonsterCalc — Free Online Calculators, No Ads",
    description: SITE.tagline,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "MonsterCalc — Free Online Calculators, No Ads",
    description: SITE.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${interTight.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint so a stored light theme never flashes dark first. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Warm the analytics connection without blocking anything. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>
            <SearchProvider>
              <div
                style={{
                  minHeight: "100vh",
                  background:
                    "radial-gradient(1100px 520px at 12% -10%, var(--glow-a), transparent 60%), radial-gradient(900px 480px at 92% 0%, var(--glow-b), transparent 60%), var(--bg)",
                  color: "var(--text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <a
                  href="#main"
                  style={{
                    position: "absolute",
                    left: -9999,
                    top: 8,
                    zIndex: 100,
                    padding: "10px 16px",
                    borderRadius: 10,
                    background: "var(--bg2)",
                    border: "1px solid var(--border2)",
                    color: "var(--text)",
                  }}
                  className="mc-skip"
                >
                  Skip to content
                </a>
                <Header />
                <div style={{ flex: 1 }}>{children}</div>
                <Footer />
              </div>
            </SearchProvider>
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
