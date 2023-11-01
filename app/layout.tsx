// Import required dependencies and components
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/common/Header";
import "@styles/globals.css";
import StyledComponentsRegistry from "@/libs/AntdRegistry";

// Create a custom font using the Inter font family with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata: Metadata = {
  title: "Group Order ShopeeFood",
  description: "Group Order ShopeeFood with NextJS",
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
        baseTheme: neobrutalism, // Use the dark theme from Clerk
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          {/* Main content container */}
          <main className="mx-auto dark:text-indigo-50 text-black">
            {/* Include the Header component */}
            <Header />

            {/* Content area */}
            <div className="flex items-start justify-center min-h-screen">
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
