import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { cacheRtlOptions, theme } from "./theme";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

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
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider options={cacheRtlOptions}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Navbar />

              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>

              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}