import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trans_Tracker_101",
  description: "Tracking legislation, civil rights battles, and news.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Trans_Tracker_101",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-1">
          {children}
        </div>
        
        <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <p className="mb-3">
              <strong className="font-semibold text-slate-700 dark:text-slate-300">Analytics Disclaimer:</strong> We monitor basic site analytics to understand what articles are most read. This helps us curate and provide more of the relevant news and updates that you actually want to see.
            </p>
            <p className="mb-4">
              Curious about my other projects? Come see what Natalie Spiva is working on at <a href="https://acreetionos.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">AcreetionOS</a>.
            </p>
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Natalie Spiva. All rights reserved.
            </p>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}
