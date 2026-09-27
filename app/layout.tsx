import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google"; // پیشنهاد: استفاده از فونت فارسی استاندارد
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { cacheRtlOptions, theme } from "./theme";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "ملکینو",
  description: "سایت خرید و فروش آنلاین ملک",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>
        <AppRouterCacheProvider options={cacheRtlOptions}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}