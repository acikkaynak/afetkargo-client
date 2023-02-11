import api from "../config/api";

const getCitiesRequest = async (id) => {
  const res = await api.get(`common/cities`);
  return res?.data;
};

export default getCitiesRequest;
