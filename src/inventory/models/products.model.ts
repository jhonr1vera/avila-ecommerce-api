interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string | null | undefined;
  createdAt?: Date | undefined;
}

interface CreateProduct {
  name: string;
  price: number;
  quantity: number;
  description?: string | null | undefined;
}

interface UpdateProduct {
  name?: string | undefined;
  description?: string | null | undefined;
  price?: number | undefined;
  quantity?: number | undefined;
}

export { Product, UpdateProduct, CreateProduct };
