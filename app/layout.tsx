import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tchil App - Prototype",
  description: "Prototype web mobile de Tchil App V1",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <div className="mx-auto max-w-[420px] min-h-screen bg-white md:shadow-lg md:my-4">
          {children}
        </div>
      </body>
    </html>
  );
}
