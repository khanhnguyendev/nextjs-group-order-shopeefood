# Simple Next.js & React Authentication With Clerk

[![CodeQL](https://github.com/milliorn/nextjs-clerk-auth-starter/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/milliorn/nextjs-clerk-auth-starter/actions/workflows/github-code-scanning/codeql)

## Table of Contents

- [Introduction](#introduction)
- [Installation and Setup](#installation-and-setup)
  - [Clean Up](#clean-up)
- [Install Clerk](#install-clerk)
- [Create Clerk Account](#create-clerk-account)
- [Create Clerk Provider](#create-clerk-provider)
- [Header Component](#header-component)
- [Create a Protected Page](#create-a-protected-page)
  - [Create Middleware File](#create-middleware-file)
- [.env.local file](#envlocal-file)
- [Redirect Login Page](#redirect-login-page)
- [Create a Signup Page](#create-a-signup-page)
- [Update Header Based on Auth Status](#update-header-based-on-auth-status)
- [UserButton Component](#userbutton-component)
- [Create Profile Page](#create-profile-page)
- [Test Email Signup & Verification Code Flow](#test-email-signup--verification-code-flow)
- [Custom Themes](#custom-themes)
- [Conclusion](#conclusion)

This guide explains the process of adding secure authentication to your Next.js application using [Clerk](https://clerk.com). Clerk is a secure authentication platform that allows you to add secure authentication to your application in minutes. Clerk is a great alternative to Auth0, Firebase, and other authentication platforms. Clerk is free for up to 100 users.

## Introduction

Welcome to a comprehensive guide on integrating secure authentication into your Next.js application using Clerk. Clerk is a cutting-edge authentication platform designed to simplify the process of fortifying your web application's security. With Clerk, you can seamlessly incorporate essential authentication features like user sign-up, login, and profile management.

### Why Clerk?

Clerk offers a robust alternative to established authentication platforms such as Auth0 and Firebase. It stands out for its simplicity, flexibility, and robust security features. Even better, Clerk is ffree for up to 100 users, making it an attractive option for startups and small projects.

In this guide, you'll use Clerk in your Next.js project. Walk you through every step, from initial installation to crafting custom themes. By the end, you'll have a Next.js application fortified with secure authentication, freeing you to focus on building the features for your project.

## Installation and Setup

This section will guide you through the installation and setup process step by step. If you're new to these tools and technologies don't worry, an explanations will follow.

1. **Create a New Next.js Project**: To start, let's create a new Next.js project. Open your terminal and run the following command:

```bash
npx create-next-app@latest
```

- `npx` is a package runner tool that comes with npm. It allows you to run commands provided by packages that aren't globally installed.
- `create-next-app` is a Next.js utility for creating new projects.
- `@latest` Uses the latest release of create-next-app.

It will prompt you a series of questions.

2. **Customize Your Project**: After creating your project, you'll be prompted with a series of questions. Let's go through them:

`What is your project named?`: Enter the name you want for your project. I named mine `clerk-starter`.

`Would you like to use TypeScript?`: Choose whether you want to use TypeScript in your project. If you're new to TypeScript, you can select "No" for simplicity.

`Would you like to use ESLint?`: ESLint helps you maintain code quality. You can choose to enable it or not, depending on your preference.

`Would you like to use Tailwind CSS?`: Tailwind CSS is a utility-first CSS framework. You can enable it for styling your app.

`Would you like to use src/ directory?`: Using a src/ directory is a good practice for organizing your code. You can choose "Yes" to enable it.

`Would you like to use App Router? (recommended)`: Next.js recommends using their built-in routing. Select "Yes" for better routing support.

`Would you like to customize the default import alias?`: You can choose "No" for simplicity.

I chose to enable TypeScript, ESLint, Tailwind CSS, said no to the `src/` directory, included App Router, and stuck with the default import alias.

Feel free to name your project according to your preference. Afterward, navigate to the project directory:

```bash
cd clerk-starter
```

3. **Install Clerk Package**: Now that your project is set up, navigate to its directory:

```bash
cd clerk-starter
```

Next, install the Clerk package:

```bash
npm i @clerk/nextjs
```

This command installs Clerk, a powerful authentication and user management package for Next.js applications. Clerk simplifies the process of adding secure authentication features to your app.

4. **Setting Up Your Clerk Account**: To use Clerk, you need to set up an account.

Follow these steps:

- `Visit Clerk`: Go to Clerk's website to get started.

- `Create an Account`: If you don't already have one, sign up for a Clerk account.

- `Add a New Application`: After logging in, go to `https://dashboard.clerk.com/` and click "Add Application."

- A`pplication Name`: Give your application a name.

- `Sign-In Options`: Choose how you want your users to sign in. Clerk offers various sign-in methods.

- `Create Application`: Click "Create Application" to generate your new Clerk application.

- `Retrieve Keys`: In your new application's settings, you'll find your API Key and Public Key. Keep these keys safe; they're essential for your app's authentication.

- `Configure Environment Variables`: Create a new file in your project's root directory named .env.local. Paste the API Key and Public Key into this file. Make sure you choose the correct framework if you're not using Next.js.

5. **Integrate Clerk Provider**: To set up the ClerkProvider in your app's layout, follow these steps.

- Open your `app/layout.tsx` file.

- Import the ClerkProvider component:

```tsx
import { ClerkProvider } from "@clerk/nextjs";
```

- Wrap your entire page content (the children prop) with the ClerkProvider component:

```tsx
<ClerkProvider>{/* Your page content */}</ClerkProvider>
```

This setup allows you to seamlessly integrate Clerk's authentication features into your Next.js app.

These steps cover the initial setup of your Next.js project and the integration of Clerk for authentication. Continue with the rest of the guide to learn how to create a header component, protected pages, and more.

## Clean Up

To clean up the default code, replace the content in `app/index.tsx` with the following:

```tsx
export default function Home() {
  return (
    <main className="">
      <h1 className="">Hello World</h1>
    </main>
  );
}
```

Next, open `app/globals.cs`s and retain only the Tailwind CSS directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

These steps provide the initial setup for your Next.js project. For more instructions on integrating Clerk and establishing a secure authentication system.

## Install Clerk

To integrate Clerk into your project:

```bash
npm i @clerk/nextjs
```

This command installs the Clerk package into your project, allowing you to leverage its powerful authentication and user management features seamlessly.

## Create Clerk Account

Follow these steps to create a Clerk account and set up your application:

1. **Visit Clerk**: Go to [Clerk](https://clerk.com) to get started.

2. **Create an Account**: Sign up for a Clerk account if you haven't already.

3. **Add a New Application**: After logging in, navigate to https://dashboard.clerk.com/ and click on "Add Application."

4. **Application Name**: Name your application as per your preference.

5. **Sign-In Options**: Select how you want your users to sign in. Clerk offers various sign-in methods.

6. **Create Application**: Click "Create Application" to generate your new Clerk application.

7. **Retrieve Keys**: In your newly created application's settings, scroll down to locate your `API Key` and `Public Key`.

8. **Configure Environment Variables**: Create a new file in your project root directory named `.env.local`. Paste the `API Key` and `Public Key` into this file. Ensure that you choose the correct framework if you're not using Next.js.

Following these steps will set up your Clerk application and allow you to securely manage user authentication in your project.

## Create Clerk Provider

To set up the ClerkProvider in your `layout.tsx` file located at `app\layout.tsx`. Wrap the entire content of your page (the children prop) with the ClerkProvider component and import the ClerkProvider from `@clerk/nextjs`.

```tsx
import { ClerkProvider } from "@clerk/nextjs";

<ClerkProvider>
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
</ClerkProvider>;
```

The final code at this point for `app\layout.tsx` should look like this:

```tsx
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js + Clerk Starter",
  description: "A starter for Next.js + Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="container mx-auto">
            <div className="flex items-start justify-center min-h-screen">
              <div className="mt-20">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

This setup allows you to integrate Clerk's authentication features seamlessly into your Next.js application.

## Header Component

To create a header component for your Next.js application, follow these steps:

1. **Create Header Component**: Create a new file called `Header.tsx` in the `app\components` directory. Add the following code to create a basic header:

```tsx
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <div>
      <nav className="bg-indigo-900 p-4 flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-sm uppercase font-bold text-indigo-50">
              Clerk Starter
            </div>
          </Link>
        </div>
        <div className="text-indigo-50">
          <Link
            href="/login"
            className="text-indigo-100 hover:text-indigo-300 mr-4"
          >
            LogIn
          </Link>
          <Link
            href="/registration"
            className="text-indigo-100 hover:text-indigo-300 mr-4"
          >
            Signup
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
```

2. **Import Header Component**: Import the Header component into your `app\layout.tsx` file.

```tsx
import Header from "./components/Header";
```

3. **Add Header to Layout**: Place the Header component after the main component in your `app\layout.tsx` file:

```tsx
<main className="container mx-auto">
  <Header />
  <div className="flex items-start justify-center min-h-screen">
    <div className="mt-20">{children}</div>
  </div>
</main>
```

With these steps, you've created a header component with navigation links for your Next.js application.

Currently, no pages but the home page exist.

## Create a Protected Page

To create a protected page in your Next.js application, follow these steps:

1. **Create a Protected Page**: Create a new file called `page.tsx` in the `app\dashboard` directory (or any directory you prefer). Add the following code to create a basic protected page:

   ```tsx
   type Props = {};

   const Dashboard = (props: Props) => {
     return (
       <>
         <h1 className="text-2xl font-bold mb-5">Welcome</h1>
         <p className="mb-5">Welcome User!</p>
       </>
     );
   };

   export default Dashboard;
   ```

2. **Verify Page Functionality**: To check if the page is working, open your web browser and go to `http://localhost:3000/dashboard`. You should see the content of the protected page.

3. **Visit Clerk Documentation**: Go to the [official Clerk documentation](https://clerk.com/docs/references/nextjs/auth-middleware#auth-middleware) to find the code for the `authMiddleware` function.

4. **Create Middleware File**: Create a new file called `middleware.ts` in the root of your project and paste the authMiddleware code you copied in the previous step.

5. **Test Redirect**: Now, if you visit `http://localhost:3000/dashboard` without being logged in, you should be automatically redirected to the login page.

With these steps, you've created a protected page and implemented authentication middleware to control access to it.

## .env.local file

To configure your Next.js project for Clerk authentication, follow these steps:

1. **Create a .env.local File**: In the root of your project directory, create a new file called `.env.local`.

2. **Add Environment Variables**: Open the `.env.local` file and add the following environment variables:

```md
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
```

These variables specify the URLs to redirect users after signing in or signing up. Make sure they match the routes you've set up in your application.

By configuring these environment variables, you ensure that Clerk knows where to redirect users after specific actions, providing a smooth user experience.

## Redirect Login Page

To customize your login and signup pages, follow these steps:

1. **Create Login Page**: Inside your project directory, create a new file at `app\login\[[...login]]\page.tsx`. Add the following code to create a basic login page:

```tsx
import { SignIn } from "@clerk/nextjs";

type Props = {};

const Login = (props: Props) => {
  return <SignIn />;
};

export default Login;
```

This code imports and renders the default Clerk SignIn component, providing a standard login form. You can further customize this page or add your components as needed.

2. **Access Login Page**: To access the login page, click on the Login link or navigate to `localhost:3000/login`. The `[...login]` dynamic route ensures that this page captures all routes starting with `/login`.

3. **Create a Signup Page**: To create a custom signup page, follow the same steps as above. However, use the Signup component from Clerk instead of SignIn. Here's an example:

```tsx
import { SignUp } from "@clerk/nextjs";

type Props = {};

const Signup = (props: Props) => {
  return <SignUp />;
};

export default Signup;
```

Customize this page as needed to match your application's design and requirements.

You can now go to `https://dashboard.clerk.com/` and confirm that sign in and sign up work.

With these steps, you can easily create custom login and signup pages in your Next.js application, leveraging Clerk's authentication components while maintaining full flexibility for customization.

## Update Header Based on Auth Status

To dynamically update the header based on the user's authentication status, follow these steps:

1. **Import Auth**: Import the auth function from `@clerk/nextjs` in your `Header` component.

```tsx
import { auth } from "@clerk/nextjs";
```

2. **Destructure the userId**: Inside the Header component, use destructuring to get the `userId` from the `auth()` function:

```tsx
const { userId } = auth();
```

3. **Update the Header Logic**: Now, you can use the userId to conditionally display header links based on the user's authentication status. For example, you can show the LogIn and Signup links if the user is not logged in:

```tsx
{
  !userId && (
    <>
      <Link
        href="/login"
        className="text-indigo-100 hover:text-indigo-300 mr-4"
      >
        LogIn
      </Link>
      <Link
        href="/registration"
        className="text-indigo-100 hover:text-indigo-300 mr-4"
      >
        Signup
      </Link>
    </>
  );
}
```

If the user is logged in, you can customize the header to display the Dashboard link or other authenticated content.

With these changes, your Header component now dynamically adapts its content based on whether the user is logged in or not. This ensures a seamless user experience and appropriate navigation options.

## UserButton Component

To add a user button for authentication actions in your Header component, follow these steps:

1. **Import Clerk's UserButton and auth Functionality**: Import the `UserButton` component and auth function from `@clerk/nextjs` into your Header component:

```tsx
import { auth, UserButton } from "@clerk/nextjs";
```

2. **Add the UserButton Component**: Place the `UserButton` component in your Header where you want it to appear:

```tsx
<div className="mx-auto">
  <UserButton afterSignOutUrl="/" />
</div>
```

The `UserButton` component automatically handles user authentication actions such as sign-in and sign-out.

With these changes, your Header component now includes the `UserButton`, allowing users to perform authentication actions conveniently. It enhances the user experience by providing easy access to authentication-related functions.

## Create Profile Page

To create a profile page using Clerk, follow these steps:

1. **Create a Profile Page Component**: Create a new file, such as `page.tsx`, in the `app\profile` directory or your preferred location. Then, add the following code:

```tsx
import { UserProfile } from "@clerk/nextjs";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default Profile;
```

This component leverages `UserProfile` from Clerk to display the user's profile information.

2. **Access the Profile Page**: To access the profile page, navigate to `http://localhost:3000/profile` in your web browser. You should see the user's profile details.

3. **Update the Header**: To provide a link to the profile page in your header, modify the Header component. Add the following code within the header's TSX:

```tsx
{
  userId && (
    <Link href="/profile" className="hover:text-indigo-300 mr-4">
      Profile
    </Link>
  );
}
```

This code checks if the user is authenticated (userId exists) and, if so, displays a "Profile" link that redirects the user to their profile page.

Now, your Header component is updated to include a link to the user's profile page based on their authentication status.

```tsx
import { auth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const { userId } = auth();

  return (
    <div>
      <nav className="bg-indigo-900 text-indigo-50 p-4 flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link href="/">
            <div className="hover:text-indigo-300 text-sm uppercase font-bold">
              Clerk Starter
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {!userId && (
            <>
              <Link href="/login" className="hover:text-indigo-300 mr-4">
                LogIn
              </Link>
              <Link href="/registration" className="hover:text-indigo-300 mr-4">
                Register
              </Link>
            </>
          )}
          {userId && (
            <Link href="/profile" className="hover:text-indigo-300 mr-4">
              Profile
            </Link>
          )}
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
```

With these changes, your Next.js application now includes a profile page accessible from the header when the user is authenticated.

## Test Email Signup & Verification Code Flow

To test the email signup and verification code flow in your Clerk-based application, follow these steps:

1. **Sign Out (If Signed In)**: Ensure you are signed out of your Clerk account before proceeding.

2. **Access Signup Page**: Click on the Signup link in your application and sign up using your email. Upon successful submission, you should receive an email containing a verification code.

3. **Retrieve Verification Code**: Check your email for the verification code sent by Clerk. Copy this code as you'll need it for the next step.

4. **Verify Email**: In your application, locate the input field for the verification code. Paste the code you copied from the email into this input field. Afterward, click the Verify button.

5. **Redirect to Dashboard**: Upon successful verification, you should be automatically redirected to the Dashboard page.

6. **Update Public Routes (if needed)**: Ensure that your public routes are correctly configured in the `middleware.ts` file to include the Register page or any other relevant pages. Below is an example configuration of public routes in `middleware.ts`:

```tsx
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/login", "/registration"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

This setup allows you to test the email signup and verification code flow in your Clerk-based application, ensuring that users can register, verify their email, and access protected pages like the Dashboard upon successful verification.

## Custom Themes

To set up custom themes in your Clerk-powered application, follow these steps:

1. **Install Clerk Themes**: Open your console and run the following command to install the Clerk Themes package:

```bash
npm i @clerk/clerk-react
```

2. **Update layout.tsx**: Go to the `layout.tsx` file located at `app\layout.tsx`. Add the following import statement to include the dark theme:

```tsx
import { dark } from "@clerk/themes";
```

3. **Apply the Dark Theme**: Inside the ClerkProvider component, configure the appearance settings to use the dark theme:

```tsx
<ClerkProvider
  appearance={{
    baseTheme: dark,
  }}
></ClerkProvider>
```

Your updated ClerkProvider component should look like this:

```tsx
<ClerkProvider
  appearance={{
    baseTheme: dark,
  }}
>
  <html lang="en">
    <body className={inter.className}>
      <main className="2xl:container mx-auto">
        <Header />
        <div className="flex items-start justify-center min-h-screen">
          <div className="mt-20">{children}</div>
        </div>
      </main>
    </body>
  </html>
</ClerkProvider>
```

By following these steps, you'll enable the dark theme in your ClerkProvider component, allowing your application to automatically switch to dark mode when users have dark mode enabled on their devices in Next.js.

# Conclusion

In this comprehensive guide, you've learned how to enhance the security and functionality of your Next.js application by integrating secure authentication using Clerk. Here's a brief summary of the key takeaways:

- **Why Clerk?**: Clerk offers a robust and user-friendly alternative to established authentication platforms like Auth0 and Firebase. It stands out for its simplicity, flexibility, and robust security features. Plus, it's free for up to 100 users, making it an excellent choice for startups and small projects.

- **Installation and Setup**: Step-by-step installation of Clerk into your Next.js project, from project creation to configuring environment variables. This laid the foundation for secure authentication.

- **Creating Key Components**: You learned how to create essential components like the header, protected pages, and user profile page. These components enable seamless navigation and secure user interactions.

- **Customization and Theming**: Clerk allows you to customize the authentication process and themes, covering setting up custom themes to match your application's design.

- **Testing and Verification**: Discussed how to test the email signup and verification code flow in your Clerk-based application, ensuring a smooth user registration process.

By following this guide, you now have a Next.js application fortified with secure authentication, empowering you to build feature-rich web applications with confidence. Clerk's flexibility and robust features provide a strong foundation for your project's authentication needs.

If you encounter any issues or need further assistance, refer to Clerk's documentation for in-depth resources.
