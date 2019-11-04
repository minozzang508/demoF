import { instance } from "../shared/utils/http";

const PaymentRepository = {
  getOrder: async (id) => {
    const response = await instance.get("/order?"+id);
    return response.data;
  },
  deleteOrder: async (id) => {
    const response = await instance.delete("/order/"+id);
    return response;
  },
  putOrder: async (id, order) => {
    const response = await instance.put("/order/"+id, order);
    return response;
  }
};

export default PaymentRepository;
