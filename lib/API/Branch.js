import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Getbranch = async () => {
  try {
    let result = await fetch(`${BaseUrl}/branch/get/branch`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
