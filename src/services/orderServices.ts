import type { NewOrder } from "../interfaces/orderInterface";
import api from "../lib/axios";

export async function createOrder(orderData: NewOrder) {
  const response = await api.post("/api/orders", orderData);
  return response.data.order;
}

export async function getTodayOrders(userId?: number) {
  const response = await api.get(
    userId ? `/api/orders/today/${userId}` : `/api/orders/today`
  );
  return response.data.orders;
}

export const getOrders = async (
  start: string,
  end: string,
  page: number,
  userId?: number
) => {
  const response = await api.get("/api/orders", {
    params: {
      start,
      end,
      page, 
      userId, 
    },
  });

  // 3. Axios automatically parses JSON and returns the data object on the 'data' property
  return response.data.ordersData;
};

export const getOrderSummary = async (
  start: string,
  end: string,
  userId?: number
) => {
  const response = await api.get("/api/orders/summary", {
    params: { start, end, userId },
  });
  return response.data.summary;
};
