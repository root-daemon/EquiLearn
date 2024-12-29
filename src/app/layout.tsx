import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { VisionImpairmentProvider } from "@/contexts/VisionImpairmentContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Equilearn",
  description: "Studying Dashboard",
  icons: {
    icon: "/favicon.png",
  },
  themeColor: "#160B38",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <VisionImpairmentProvider>
            <main className="flex relative w-full min-h-screen overflow-hidden">
              <SidebarProvider className=" relative  border w-fit">
                <AppSidebar />
                <SidebarTrigger className="z-10 fixed top-0 " />
              </SidebarProvider>

              {children}
            </main>
          </VisionImpairmentProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
