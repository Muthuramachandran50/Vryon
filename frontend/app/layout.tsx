import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vryon – Virtual Try-On Store",
  description: "Try on clothes virtually before you buy. Powered by AI.",
  icons: {
    icon: '/vryon-logo.png',
    shortcut: '/vryon-logo.png',
    apple: '/vryon-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
