import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";


export const CreatNoticeapi = async (data) => {
    
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/notification/send/notification`, {
        method: "POST",
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


  // /notification/get/notification/

  export const GetnotificationbyBranch = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/notification/get/notification/${id}`, {
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


  // /notification/delete/notification/

  export const Deletenotification = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/notification/delete/notification/${id}`, {
        method: "DELETE",
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