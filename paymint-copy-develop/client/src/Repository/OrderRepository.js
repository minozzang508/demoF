import { instance } from "../shared/utils/http";

const OrderRepository = {
  postOrder: async (orderModel ) => {
    const response = await instance.post("/order",orderModel);
    //  console.log(response.data);
    return response;
  },
  getPaymentMethod: async () => {
    const response = await instance.get("/paymentMethod");
    //  console.log(response.data);
    return response.data;
  }
};

export default OrderRepository;
