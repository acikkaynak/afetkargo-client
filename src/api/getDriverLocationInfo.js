import api from "../config/api";

const getDriverLocationInfoRequest = async (id) => {
  const res = await api.get(`cargo/receiver/${id}`);
  return res?.data;
};

export default getDriverLocationInfoRequest;
