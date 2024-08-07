import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Getdashboarddata = async () => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/dashboard/dashboard/history`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };

export const Getdashboarearningddata = async () => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/dashboard/earning/history`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };

export const GetdashboarExpenseddata = async () => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/dashboard/expence/dashboard`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };

