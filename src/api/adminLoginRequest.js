import api from "../config/api";

const adminLoginRequest = async (data) => {
  const res = await api.post("auth/login", data);
  return res?.data;
};

export default adminLoginRequest;
