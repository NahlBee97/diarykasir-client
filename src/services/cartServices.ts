import api from "../lib/axios";

export async function getUserCart() {
  const response = await api.get("/api/carts");
  return response.data.cart;
}

export async function addItemToCart(productId: number, quantity: number) {
  const response = await api.post("/api/carts/items", {
    productId,
    quantity,
  });
  return response.data.cart;
}

export async function updateItemQuantity(itemId: number, quantity: number) {
  const response = await api.put(`/api/carts/items/${itemId}`, {
    quantity,
  });
  return response.data.cart;
}

export async function removeItemFromCart(itemId: number) {
  const response = await api.delete(`/api/carts/items/${itemId}`);
  return response.data.cart;
}
