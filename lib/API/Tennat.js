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
  
  export const GetfloorbyBranch = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/rooms/allfloor/${id}`, {
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
  


  export const Getsingletennatbyid = async (tenantid) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/users/get/Singleuser/${tenantid}`, {
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
  


  export const UpadteTenantapi = async (data,id) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/users/update/user/${id}`, {
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


  export const Removetenantapi = async (id) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/users/remove/user/${id}`, {
        method: "PUT",
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




  export const Uploaddocapi = async (data,id,filetype) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/users/add/file/${id}/${filetype}`, {
        method: "PATCH",
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



  export const Changeroomapi = async (userid,roomid) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/users/chageroom/user/${userid}/${roomid}`, {
        method: "PUT",
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