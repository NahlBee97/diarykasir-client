import type { NewOrder } from "../interfaces/orderInterface";
import api from "../lib/axios";

export async function createOrder(orderData: NewOrder) {
  try {
    const response = await api.post("/api/orders", orderData);
    return response.data.order;
  } catch (error) {
    console.error("Error creating order:", error);
  }
}