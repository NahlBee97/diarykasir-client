export interface NewOrder {
  userId: number;
  totalAmount: number;
  paymentCash: number;
  paymentChange: number;
}

export interface NewOrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}