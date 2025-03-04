'use client';

import Header from '../layout/header/header'
import OrderInfo from '../components/orderInfo';
import EmailForm from '../components/emailForm';
import { getOrders, Order } from '../utils/api';
import { useEffect, useState } from 'react';

interface ErrorResponse {
  status: string;
  message: string;
}

const Profile = () => {
  const [orders, setOrders] = useState<Order[] | ErrorResponse>([]);
  const [email, setEmail] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');

  const fillOrders = async () => {
    await getOrders(email).then((data: Order[] | ErrorResponse) => {
      const errorData = data as ErrorResponse;
      if (errorData.status && errorData.status === 'error') {
        console.error(errorData.message);
        return;
      }
      setOrders(data);
    })
  }

  useEffect(() => {
    fillOrders();
  }, []);

  const removeOrder = async (id: number) => {
    await removeOrder(id);
    setOrders([]);
    setSuccessMessage("order has been removed successfully");
  }

  return (
    <div className='bg-[var(--strict-white)] min-h-screen flex gap-[40px] flex-col w-full'>
      <Header />
      <div className='flex w-full px-[200px] justify-between'>
        <div className='flex flex-col w-full gap-[20px]'>
          <h1 className='text-[var(--primary-dark)] text-[32px] font-bold'>Profile</h1>
          <div className='flex gap-[20px] flex-col items-start'>
            {successMessage !== '' && <p className='text-green-600 italic'>{successMessage}</p>}
            {(orders as Order[]) && (orders as Order[]).map((order, index) => (
              <OrderInfo
                onClick={() => removeOrder(order.order_id)}
                key={index}
                products={order.products}
              />
            ))}
          </div>
        </div>
        <EmailForm onClick={fillOrders} email={email} setEmail={setEmail}/>
      </div>
    </div>
  )
}

export default Profile
