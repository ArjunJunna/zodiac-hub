import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/utils/ReactQueryClientProvider";
import Hydration from "@/lib/Hydration";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSection from "@/components/RightSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Zodiac",
    template: "%s - Zodiac",
  },
  description: "Place for all zodiacs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Hydration>
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body className={inter.className} >
          <ReactQueryClientProvider>
            <ThemeProvider>
              <div
                className="flex flex-col h-screen relative overflow-y-auto "
              >
                <Navbar />
                <div className="flex h-screen ">
                  <LeftSidebar />
                  {children}
                  <RightSection />
                </div>
              </div>
            </ThemeProvider>
          </ReactQueryClientProvider>
        </body>
      </html>
    </Hydration>
  );
}
