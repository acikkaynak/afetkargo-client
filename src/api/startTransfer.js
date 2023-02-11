import api from "../config/api";

const startTransferRequest = async (data) => {
  const res = await api.put("cargo/driver/start-transfer", data);
  return res?.data;
};

export default startTransferRequest;
