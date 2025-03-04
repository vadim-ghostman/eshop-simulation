'use client';

import Header from '../layout/header/header'
import OrderInfo from '../components/orderInfo';
import EmailForm from '../components/emailForm';

const Profile = () => {
  const products = [
    {
      title: 'pants',
      description: 'these panties is very good for everyday use',
      count: 7,
      id: 1,
      imageUrl: '/pants.jpg'
    },
    {
      title: 't-shirt',
      description: 'this tshirts is very good for everyday use',
      count: 10,
      id: 3,
      imageUrl: '/tshirt.jpg'
    },
    {
      title: 'mikina',
      description: 'this mikina is very good for everyday use',
      count: 3,
      id: 2,
      imageUrl: '/sweatshirt.jpg'
    },
    {
      title: 'cap',
      description: 'this cap is very good for everyday use',
      count: 5,
      id: 4,
      imageUrl: '/cap.jpg'
    }
  ]
  return (
    <div className='bg-[var(--strict-white)] min-h-screen flex gap-[40px] flex-col w-full'>
      <Header />
      <div className='flex w-full px-[200px] justify-between'>
        <div className='flex flex-col w-full gap-[20px]'>
          <h1 className='text-[var(--primary-dark)] text-[32px] font-bold'>Profile</h1>
          <div className='flex gap-[20px] flex-col items-start'>
            <OrderInfo
              products={products.slice(0, 2)}
            />
            <OrderInfo
              products={products.slice(2)}
            />
          </div>
        </div>
        <EmailForm />
      </div>
    </div>
  )
}

export default Profile
