import { NextResponse } from "next/server";
import { GetAdminbyid } from "./lib/API/Auth";
import { jwtDecode } from "jwt-decode";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  let adminId;
  try {
    const decodedToken = jwtDecode(token);
    adminId = decodedToken.id;
  } catch (error) {
    console.log(error);
    // return NextResponse.redirect(new URL('/signin', request.url));
  }

  try {
    const adminData = await GetAdminbyid(adminId);

    const role = adminData.role;
    const permissions = adminData.permission || [];

    if (role !== "admin") {
      return NextResponse.next();


     
    }


    const url = new URL(request.url);
    const pathname = url.pathname;

    if (role === "admin" && pathname === "/") {
        return NextResponse.redirect(new URL("/Unauthorized", request.url));
      }

    const hasAccess = permissions.some(
      (permission) =>
        (pathname.startsWith("/Rooms") && permission === "Rooms") ||
        (pathname.startsWith("/Expense") && permission === "Expense") ||
        (pathname.startsWith("/Tenants") && permission === "Tenants") ||
        (pathname.startsWith("/Payments") && permission === "Payments") ||
        (pathname.startsWith("/Maintenance") && permission === "Maintenance") ||
        (pathname.startsWith("/Ourstaff") && permission === "Staff") ||
        (pathname.startsWith("/Notifications") && permission === "Notifications") 

    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/Signin", request.url));
    }

   
  

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/Signin", request.url));
  }
}
