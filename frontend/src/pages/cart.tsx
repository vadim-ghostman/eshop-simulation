'use client';

import Header from '../layout/header/header'
import CardProductInfo from '../components/cartProductInfo';
import EmailForm from '../components/emailForm';
import { useEffect, useState } from 'react';
import { createOrder, getProducts, Product } from '../utils/api';

interface CartProduct {
  product_id: number,
  title: string,
  ordered_count: number
}

interface CartProductsProps {
  email: string;
  products: {
    count: number,
    id: number
  }[];
}

const Cart = () => {
  const [email, setEmail] = useState<string>('');
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const fillProducts = async () => {
      await getProducts().then((data: Product[]) => {
        const newData = [];
        const order = localStorage.getItem('cartProducts');
        if (!order) return;
        const orderObject: CartProductsProps = JSON.parse(order);

        for (const product of data) {
          const ordered_product = orderObject.products.filter(
            (p) => p.id == product.product_id
          )[0];
          if (!ordered_product) continue;
          newData.push({
            product_id: product.product_id,
            title: product.title,
            ordered_count: ordered_product.count
          })
        }
        newData.push();
        setProducts(newData);
      }).catch((err) => {
        console.error(err);
      });
    };
    fillProducts();
  }, []);

  const images = [
    '/pants.jpg',
    '/tshirt.jpg',
    '/sweatshirt.jpg',
    '/cap.jpg'
  ]

  const makeOrderWithEmail = async () => {
    const order = localStorage.getItem('cartProducts');
    if (!order) {
      console.error("your cart is empty");
      return;
    }

    const orderObject: CartProductsProps = JSON.parse(order);

    if (orderObject.products) {
      localStorage.removeItem('cartProducts');
      await createOrder(email, orderObject.products).catch((err) => {
        console.error(err);
      });
      setEmail('');
      setProducts([]);
    }
  }

  const removeFromCart = (id: number) => {
    const order = localStorage.getItem('cartProducts');
    if (!order) {
      console.error("there is no products in cart yet");
      return;
    }

    const orderObject: CartProductsProps = JSON.parse(order);

    if (orderObject.products) {
      orderObject.products = orderObject.products.filter((p) => p.id !== id);
      localStorage.setItem('cartProducts', JSON.stringify(orderObject));
      setProducts([]);
    }
  }

  return (
    <div className='bg-[var(--strict-white)] min-h-screen flex gap-[40px] flex-col w-full'>
      <Header />
      <div className='flex w-full px-[200px] justify-between'>
        <div className='flex flex-col w-full gap-[20px]'>
          <h1 className='text-[var(--primary-dark)] text-[32px] font-bold'>Cart</h1>
          <div className='flex gap-[20px] flex-col items-start'>
            {products.length === 0 && <p className='text-gray-500 italic'>there are no products in cart</p>}
            {products.map((product, index) => (
              <CardProductInfo
                onClick={() => removeFromCart(product.product_id)}
                key={index}
                title={product.title}
                count={product.ordered_count}
                id={product.product_id}
                imageUrl={images[product.product_id - 1]}
              />
            ))}
          </div>
        </div>
        <EmailForm isInCart={true} onClick={makeOrderWithEmail} email={email} setEmail={setEmail}/>
      </div>
    </div>
  )
}

export default Cart
