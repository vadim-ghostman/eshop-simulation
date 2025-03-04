export interface Product {
  id: number;
  name: string;
  description: string;
  count: number;
}

export interface OrderedProduct {
  id: number;
  count: number;
}

export interface OrderRequest {
  email: string;
  products: OrderedProduct[];
}
