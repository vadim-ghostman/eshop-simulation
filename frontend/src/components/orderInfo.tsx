'use client';

import { OrderedProducts } from "../utils/api";

interface OrderInfoProps {
  products: OrderedProducts[];
  onClick: () => void;
}

const OrderInfo = ({ products, onClick }: OrderInfoProps) => {
  return (
    <div className="flex items-center bg-[var(--secondary-aqua)] rounded-[20px] p-[25px] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)] gap-[200px]">
      <div className="flex flex-col gap-[10px]">
        {products.map((product, idx) => (
          <div key={idx} className="flex gap-[30px] items-center">
            <h1 className="flex gap-1 items-center text-[var(--strict-white)] text-[32px] font-bold">
              {product.product.title}{' | '}
              <span className="text-[var(--light-lime)] italic text-[20px]">
                id: {product.product_id}
              </span>
            </h1>
            <p className="text-[var(--light-lime)] italic text-[20px]">count: {product.ordered_count}</p>
          </div>
        ))}
      </div>
      <div
        onClick={onClick}
        className="cursor-pointer bg-[var(--restricted-red)] rounded-full flex items-center justify-center size-[60px]"
      >
        <img src="/icons/trash.svg" alt="delete" className="size-[36px]"/>
      </div>      
    </div>
  );
}

export default OrderInfo;
