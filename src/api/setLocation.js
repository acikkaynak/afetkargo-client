import api from "../config/api";

const setLocationRequest = async (data) => {
  const res = await api.post("cargo/driver/set-location", data);
  return res?.data;
};

export default setLocationRequest;
