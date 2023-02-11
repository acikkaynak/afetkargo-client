import api from "../config/api";

const registerRequest = async (data) => {
  const res = await api.post("auth/register", data);
  return res?.data;
};

export default registerRequest;
