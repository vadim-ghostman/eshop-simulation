import ky from 'ky';

export interface Product {
  product_id: number;
  title: string;
  description: string;
  left_count: number;
}

export interface OrderedProducts {
	product_id: number;
	ordered_count: number;
	product: {
		title: string,
		description: string,
		left_count: number
	}
}

export interface Order {
  order_id: number;
  customer_email: string;
  products: OrderedProducts[];
}

const api = ky.create({prefixUrl: 'http://localhost:8000/api'});
export const ordersApi = api.extend((options) => ({prefixUrl: `${options.prefixUrl}/orders`}));
export const productsApi = api.extend((options) => ({prefixUrl: `${options.prefixUrl}/products`}));

export const getOrders = async (email: string): Promise<Order[]> =>
	await ordersApi.get('', {searchParams: {email}}).json();
export const createOrder = async (email: string, products: {id: number, count: number}[]) =>
	await ordersApi.post('create', {json: {email, products}}).json();
export const deleteOrder = async (id: number) =>
	await ordersApi.delete(`delete/${id}`).json();

export const getProducts = async (): Promise<Product[]> =>
	await productsApi.get('').json();
export const refillProducts = async () =>
	await productsApi.post('refill').json();

export default api;