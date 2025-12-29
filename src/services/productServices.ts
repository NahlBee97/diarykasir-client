import api from "../lib/axios";

export const getProducts = async (page: number = 1) => {
  const response = await api.get("/api/products", {
    params: {
      page: page.toString(),
    },
  });

  return response.data.productsData;
};

export const getLowStockProducts = async () => {
  const response = await api.get("/api/products/low");

  return response.data.products;
};

export const getTopProducts = async (
  start: string,
  end: string,
  userId?: number
) => {
  const response = await api.get("/api/products/top", {
    params: { start, end, userId },
  });
  return response.data.products;
};

export async function getProductById(id: number) {
  const response = await api.get(`/api/products/${id}`);

  return response.data.product;
}

export async function createProduct(data: FormData) {
  const response = await api.post("/api/products", data);

  return response.data.newProduct;
}

export async function updateProduct(id: number, data: FormData) {
  const response = await api.put(`/api/products/${id}`, data);

  return response.data.updatedProduct;
}

export async function deleteProduct(id: number) {
  await api.delete(`/api/products/${id}`);
}
