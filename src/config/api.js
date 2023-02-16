import { create } from "apisauce";

const API = create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
});

API.addRequestTransform((request) => {
  let store = localStorage.getItem("afetkargo_user");

  if (store) {
    store = JSON.parse(store);
    if (store?.token?.accessToken?.length > 0) {
      request.headers["Authorization"] = `Bearer ${store?.token?.accessToken}`;
    }
  }

  request.headers["X-API-KEY"] = process.env.REACT_APP_API_KEY;

  request.headers["Content-Type"] = "application/json;charset=UTF-8";

  request.headers["Access-Control-Allow-Origin"] = "*";

  request.headers["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";
});

API.addMonitor((response) => {
  console.log("api response:", response);
});

export default API;
