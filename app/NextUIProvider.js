"use client";
import React, { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import Navbarr from "@/components/Navbarcomponents/Navbar";
import Sidenav from "@/components/Navbarcomponents/Sidenav";
import Loginpage from "@/components/Logincomponents/Loginpage";
// import Cookies from "js-cookie";

export default function NextuiProviderWrapper({ children }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get('Token');
//     console.log('Token:', token);
//     if (token) {
//       setIsAuthenticated(true);
//       if (pathname === '/Signin') {
//         router.push('/');
//       }
//     } else {
//       setIsAuthenticated(false);
//       if (pathname !== '/Signin') {
//         router.push('/Signin');
//       }
//     }
//   }, [pathname, router]);

//   if (isAuthenticated && pathname === '/Signin') {
//     // Render nothing or a loading state while redirecting
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated && pathname !== '/Signin') {
//     // Render nothing or a loading state while redirecting
//     return <div>Loading...</div>;
//   }

  return (
    <NextUIProvider>
      <main className="flex sticky top-0">
        {/* {pathname !== '/Signin' && ( */}
          <div className="sticky top-0">
            <Sidenav/>
          </div>
        {/* )} */}
        <div className="flex flex-col w-full bg-white">
        {/* {pathname !== '/Signin' && (<Navbar />)} */}
           <Navbarr/>
          {children}
        </div>
      </main>
    </NextUIProvider>
  );
}