interface SaleSummary {
  id: number;
  saleDate: Date;
  totalAmount: number;
  customerId: number;
  status: string;
  user: {
    id: number;
    username: string;
  };
}

interface Sale {
  id: number;
  saleDate: Date;
  totalAmount: number;
  customerId: number;
  paymentMethod: string;
  status: string;
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };
  items: SaleItem[];
}

interface SaleItem {
  id: number;
  quantity: number;
  productId: number;
  salePrice: number;
  totalPrice: number;
  product: {
    id: number;
    name: string;
  };
}

interface CreateSaleItems {
  quantity: number;
  productId: number;
  salePrice: number;
}

interface CreateSale {
  customerId: number;
  paymentMethod: string;
  items: CreateSaleItems[];
}

interface CreateSaleWithoutItemsPrice {
  customerId: number;
  paymentMethod: string;
  items: {
    quantity: number;
    productId: number;
  }[];
}

interface UpdateStatus {
  status:  "Pendiente" | "En_camino" | "Entregado";
}


export {
  CreateSale,
  CreateSaleItems,
  Sale,
  SaleSummary,
  SaleItem,
  CreateSaleWithoutItemsPrice,
  UpdateStatus,
};
