import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluid Type Scale",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-100 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400 flex flex-col scroll-smooth overflow-x-clip min-h-screen font-body text-base">
        {children}
      </body>
    </html>
  );
}
