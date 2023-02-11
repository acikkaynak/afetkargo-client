import { create } from "apisauce";

const API = create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
});

API.addRequestTransform((request) => {
  request.headers["X-API-KEY"] = process.env.REACT_APP_API_KEY;
  request.headers["Content-Type"] = "application/json;charset=UTF-8";
});

API.addMonitor((response) => {
  console.log("api response:", response);
});

export default API;
