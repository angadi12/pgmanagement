import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";



  
  

  export const GetTicketsbyBranch = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/ticket/get/ticket/branch/${id}`, {
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


  export const GetTicketsbyStatus = async (status) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/ticket/get/ticket/status/${status}`, {
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



  export const ResolveTicketapi = async (data,id) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/ticket/resolve/ticket/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };


