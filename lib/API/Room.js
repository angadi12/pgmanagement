import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";


export const Createroomapi = async (data) => {
    
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/rooms/add/room`, {
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
  
  

  export const GetRoomsbyBranch = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/rooms/branch/room/${id}`, {
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
  export const GetRoomsbyroomid = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/rooms/single/room/${id}`, {
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
  

  export const Upadteroomapi = async (data,id) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/rooms/update/room/${id}`, {
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



  export const Changeroomapi = async (userid,newroomid) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/users/chageroom/user/${userid}/${newroomid}`, {
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