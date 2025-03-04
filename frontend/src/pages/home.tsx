'use client';

import Header from '../layout/header/header'
import ProductCard from '../components/productCard'
import { getProducts, Product } from '../utils/api';
import { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fillProducts() {
      await getProducts().then((data) => {
        setProducts(data);
      })
    };
    fillProducts();
  }, []);

  const images = [
    '/pants.jpg',
    '/tshirt.jpg',
    '/sweatshirt.jpg',
    '/cap.jpg'
  ]
  return (
    <div className='bg-[var(--strict-white)] min-h-screen flex gap-[40px] flex-col w-full'>
    <Header />
      <div className='flex flex-col w-full px-[200px] gap-[20px]'>
        <h1 className='text-[var(--primary-dark)] text-[32px] font-bold'>Products</h1>
        <div className='flex gap-[40px] flex-wrap items-start'>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              count={product.left_count}
              id={product.product_id}
              imageUrl={images[product.product_id - 1]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
