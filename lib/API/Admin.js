import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const GetAdminbybranch = async (branchid) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/admin/get/admin/${branchid}`, {
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
export const GetAdminbyid = async (Adminid) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/admin/getsingle/admin/${Adminid}`, {
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

export const Createadminapi = async (data) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/admin/create/admin`, {
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

export const Updateadminapi = async (formData,selectedAdminid) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/admin/update/admin/${selectedAdminid}`, {
        method: "PUT",
        body: JSON.stringify(formData),
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
  