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
      <body className="scroll-smooth bg-zinc-100 font-body text-base text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
