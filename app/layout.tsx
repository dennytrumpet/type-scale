import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluid Type Scale",
  description: ""
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col overflow-x-clip scroll-smooth bg-zinc-100 font-body text-base text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
        {children}
      </body>
    </html>
  );
}
