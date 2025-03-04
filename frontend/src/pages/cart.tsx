'use client';

import Header from '../layout/header/header'
import CardProductInfo from '../components/cartProductInfo';
import EmailForm from '../components/emailForm';
import { useEffect } from 'react';

const Cart = () => {
  const products = [
    {
      title: 'pants',
      count: 7,
      id: 1,
      imageUrl: '/pants.jpg'
    },
    {
      title: 't-shirt',
      count: 10,
      id: 3,
      imageUrl: '/tshirt.jpg'
    },
    {
      title: 'mikina',
      count: 3,
      id: 2,
      imageUrl: '/sweatshirt.jpg'
    },
    {
      title: 'cap',
      count: 5,
      id: 4,
      imageUrl: '/cap.jpg'
    }
  ]

  useEffect(() => {
    // fetch('http://localhost:8000/api/orders/create', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Allow-Control-Allow-Origin': '*'
    //   },
    //   body: JSON.stringify({
    //     email: 'example@example.com',
    //     products: [
    //       {
    //         id: 1,
    //         count: 7
    //       },
    //       {
    //         id: 3,
    //         count: 10
    //       },
    //       {
    //         id: 2,
    //         count: 3
    //       },
    //       {
    //         id: 4,
    //         count: 5
    //       }
    //     ]
    //   })
    // }).then(response => response.json()).then(data => console.log(data));

    fetch('http://localhost:8000/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*'
      }
    }).then(response => response.json()).then(data => console.log(data));
  }, []);

  return (
    <div className='bg-[var(--strict-white)] min-h-screen flex gap-[40px] flex-col w-full'>
      <Header />
      <div className='flex w-full px-[200px] justify-between'>
        <div className='flex flex-col w-full gap-[20px]'>
          <h1 className='text-[var(--primary-dark)] text-[32px] font-bold'>Cart</h1>
          <div className='flex gap-[20px] flex-col items-start'>
            {products.map((product, index) => (
              <CardProductInfo
                key={index}
                title={product.title}
                count={product.count}
                id={product.id}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>
        <EmailForm />
      </div>
    </div>
  )
}

export default Cart
