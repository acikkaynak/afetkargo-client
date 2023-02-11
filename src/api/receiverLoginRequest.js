import api from "../config/api";

const receiverLoginRequest = async (data) => {
  const res = await api.post("cargo/receiver/cargo", data);
  return res?.data;
};

export default receiverLoginRequest;
