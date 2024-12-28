import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppCalendar } from "@/components/app-calendar";
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
  title: "uniVision",
  description: "Studying Dashboard",
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
              <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
              </div>
              {children}
            </main>
          </VisionImpairmentProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
