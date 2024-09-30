import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Home",
  description: "Fell at home, away from home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={" min-h-[100vh]"}>
        <Providers>
          <NavBar />
          <main className="container py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
