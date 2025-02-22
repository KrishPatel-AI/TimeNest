"use client";

// import type { Metadata } from "next";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",

  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Wealth Radar",
//   description: "Your Complete Wealth in your Radar",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (loading) return; // Avoid redirecting while checking auth state

    if (!user && pathname !== "/register" && pathname !== "/login" && pathname !== "/") {
      router.push("/register"); // Redirect to register if not logged in
    }

    if (user && (pathname === "/register" || pathname === "/login")) {
      router.push("/"); // Redirect logged-in users away from register/login
    }
  }, [user, loading, pathname, router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="mt-16">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
