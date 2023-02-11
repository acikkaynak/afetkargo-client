import api from "../config/api";

const getRecieverInfosRequest = async (data) => {
  const res = await api.post("cargo/receiver/cargo", data);
  return res?.data;
};

export default getRecieverInfosRequest;
