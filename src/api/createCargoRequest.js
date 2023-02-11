import api from "../config/api";

const createCargoRequest = async (data) => {
  const res = await api.post("cargo", data);
  return res?.data;
};

export default createCargoRequest;
