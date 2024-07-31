import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";


export const Addcategory = async (data) => {
    
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/staff/create/staff/Categories`, {
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
  
  

  export const GetAllcategory = async () => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/staff/get/staff/Categories`, {
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


  
//   /staff/create/staff
export const Createstaffapi = async (data) => {
    
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/staff/create/staff`, {
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


  // /staff/get/staff/:branch
  export const GetStaffbyBranch = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/staff/get/staff/${id}`, {
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



  // /staff/getsingle/staff/

  export const GetStaffbyid = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/staff/getsingle/staff/${id}`, {
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


  export const Upadtstaffapi = async (data,id) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/staff/update/staff/${id}`, {
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