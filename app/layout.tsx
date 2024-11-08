import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlobGoer",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen overflow-auto flex flex-col`}>
        <div className="bg-white relatiev z-[100] w-full sticky top-0 shadow-md flex items-center justify-center p-6">
          <h1 className="text-2xl font-bold text-[#482A89]">GlobGoer</h1>
        </div>
        {children}
      </body>
    </html>
  );
}
