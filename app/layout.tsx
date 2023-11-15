// Import required dependencies and components
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import StyledComponentsRegistry from "@/libs/AntdRegistry";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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
        <body className={`${inter.className} overflow-hidden`}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Include the Header component */}
          <Header />
          <div className="flex flex-wrap">
            {/* Main content container */}
            <main className="text-black w-full h-screen overflow-auto">
              {/* Content area */}
              <div className="flex items-start justify-center mt-[40px] mb-[100px] mx-auto">
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
              </div>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
