import axios from "axios";
const requestTimeout = 10000;
export class RestUtils {
  static get(restPath, headers) {
    if (!headers) {
      headers = {
        Accept: "application/vnd.github.v3+json",
      };
    }

    console.log("headers for GET ", headers);
    let url = RestUtils.getBaseUrl();
    let axiosInstance = axios.create({ timeout: requestTimeout });

    return axiosInstance.get(url + restPath, { headers: headers });
  }

  static getBaseUrl() {
    let origin = "";
    // if (DEV_MODE) {
    //   origin = "http://localhost:8888";
    // }
    // if (!origin) {
    //   origin = "http://127.0.0.1:8888";
    // }
    return origin;
  }
}
