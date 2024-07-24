import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";


export const Creattennatmapi = async (data) => {
    
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/users/create/user`, {
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
  
  

  export const GettennatbyBranch = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/users/get/user/${id}`, {
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
  