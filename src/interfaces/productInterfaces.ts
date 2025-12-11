export interface NewProduct {
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string | null;
}

export interface UpdateProduct {
  name?: string;
  category?: string;
  price?: number;
  stock?: number;
  image?: string;
}
