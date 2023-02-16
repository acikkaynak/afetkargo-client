import api from "../config/api";

const getCargoListWithPagination = async (pagination, filter) => {
  const res = await api.post(
    `admin/cargo?page=${pagination.page}&limit=${pagination.limit}`,
    filter
  );
  return res?.data;
};

export default getCargoListWithPagination;
