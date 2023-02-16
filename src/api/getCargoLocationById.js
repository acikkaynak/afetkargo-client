import api from "../config/api";

const getCargoLocationById = async (cargoId) => {
  const res = await api.get(`admin/cargo-location/${cargoId}`);
  return res?.data;
};

export default getCargoLocationById;
