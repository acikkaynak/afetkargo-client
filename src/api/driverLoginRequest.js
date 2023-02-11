import api from "../config/api";

const driverLoginRequest = async (data) => {
  const res = await api.post("cargo/driver/cargo", data);
  return res?.data;
};

export default driverLoginRequest;
