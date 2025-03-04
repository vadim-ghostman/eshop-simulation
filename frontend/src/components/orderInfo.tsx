'use client';

interface OrderInfoProps {
  products: { [key: string]: string | number }[];
}

const OrderInfo = ({ products }: OrderInfoProps) => {
  return (
    <div className="flex items-center bg-[var(--secondary-aqua)] rounded-[20px] p-[25px] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)] gap-[200px]">
      <div className="flex flex-col gap-[10px]">
        {products.map((product) => (
          <div className="flex gap-[30px] items-center">
            <h1 className="text-[var(--strict-white)] text-[32px] font-bold">{product.title}</h1>
            <p className="text-[var(--light-lime)] italic text-[20px]">count: {product.count} ({product.id})</p>
          </div>
        ))}
      </div>
      <div className="cursor-pointer bg-[var(--restricted-red)] rounded-full flex items-center justify-center size-[60px]">
        <img src="/icons/trash.svg" alt="delete" className="size-[36px]"/>
      </div>      
    </div>
  );
}

export default OrderInfo;
