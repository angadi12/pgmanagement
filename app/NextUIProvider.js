"use client";
import React, { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import Navbarr from "@/components/Navbarcomponents/Navbar";
import Sidenav from "@/components/Navbarcomponents/Sidenav";
import Loginpage from "@/components/Logincomponents/Loginpage";
import { Store } from '../lib/Store'
import { Provider } from 'react-redux'
import Cookies from "js-cookie";
import { Getbranch } from "@/lib/API/Branch";
import { useDispatch, useSelector } from "react-redux";
import { setBranches, setBranchError } from "./../lib/BranchSlice"; 

export default function NextuiProviderWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.branches);
  const branchStatus = useSelector((state) => state.branches.status);
  const branchError = useSelector((state) => state.branches.error);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
      if (pathname === '/Signin') {
        router.push('/');
      }
    } else {
      setIsAuthenticated(false);
      if (pathname !== '/Signin') {
        router.push('/Signin');
      }
    }
  }, [pathname, router]);

   useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const result = await Getbranch();
          if (result.status) {
            dispatch(setBranches(result.data));
          } else {
            dispatch(setBranchError(result.message || "An error occurred"));
          }
        } catch (error) {
          dispatch(setBranchError(error.message || "An error occurred"));
        }
      }
    };

    fetchData();
  }, [isAuthenticated, dispatch]);

  if (isAuthenticated && pathname === '/Signin') {
    // Render nothing or a loading state while redirecting
    return <div className="flex justify-center items-center h-screen backgroundlayer">Loading...</div>;
  }

  if (!isAuthenticated && pathname !== '/Signin') {
    // Render nothing or a loading state while redirecting
    return <div className="flex justify-center flex-col gap-4 text-white items-center h-screen backgroundlayer"><span className="loader"></span>Loading...</div>;
  }



console.log(branches)

  return (
    
    <NextUIProvider>
      <main className="flex sticky top-0">
        {pathname !== '/Signin' && (
          <div className="sticky top-0">
            <Sidenav/>
          </div>
        )}
        <div className="flex flex-col w-full bg-white">
        {pathname !== '/Signin' && (<Navbarr/>)}
           
          {children}
        </div>
      </main>
    </NextUIProvider>
  );
}
