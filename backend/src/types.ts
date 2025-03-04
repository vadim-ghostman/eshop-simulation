export interface Product {
  product_id: number;
  title: string;
  description: string;
  left_count: number;
}

interface OrderedProduct {
  id: number;
  count: number;
}

export interface OrderRequest {
  email: string;
  products: OrderedProduct[];
}
