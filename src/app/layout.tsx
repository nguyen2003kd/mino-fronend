import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/app/_providers";
import { Toaster } from "@components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MINO club — Everyday essentials",
  description: "A configurable e-commerce storefront starter.",
};


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body suppressHydrationWarning>
        <Providers>
          {/* <Header/> */}
          {children}
          <Toaster
            richColors
            closeButton
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              className: "p-3 gap-2",
              classNames: {
                closeButton:
                  "left-auto right-0 top-0 -translate-y-1 translate-x-0",
              },
            }}
          />
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
