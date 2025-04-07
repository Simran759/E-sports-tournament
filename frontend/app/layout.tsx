import "./globals.css";
import { Rajdhani } from "next/font/google";
import { ReactNode } from "react";  // Import ReactNode type

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-rajdhani",
});

// Add typing for children
interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={rajdhani.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
