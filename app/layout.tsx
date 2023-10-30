// Import required dependencies and components
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

// Create a custom font using the Inter font family with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata: Metadata = {
  title: "Next.js + Clerk Starter",
  description: "A starter for Next.js + Clerk",
};

// Define the RootLayout component, which wraps the entire application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap the entire application with ClerkProvider to enable Clerk functionality
    <ClerkProvider
      appearance={{
        baseTheme: dark, // Use the dark theme from Clerk
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          {/* Main content container */}
          <main className="2xl:container mx-auto dark:bg-indigo-900 dark:text-indigo-50 text-indigo-50">
            {/* Include the Header component */}
            <Header />

            {/* Content area */}
            <div className="flex items-start justify-center min-h-screen">
              <div className="mt-20">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
