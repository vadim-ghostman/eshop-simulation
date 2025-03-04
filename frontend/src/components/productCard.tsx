'use client';

interface ProductCardProps {
  title: string;
  description: string;
  count: number;
  id: number;
  errorMessage?: string;
  successMessage?: string;
  showInput?: boolean;
  setCount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
}

const ProductCard = ({ title, description, count, id, errorMessage, successMessage, showInput = false, setCount, imageUrl }: ProductCardProps) => {
  return (
    <div className="flex flex-col items-center w-[300px] bg-[var(--secondary-aqua)] rounded-[20px] p-[15px] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)] gap-[10px]">
      <img src={imageUrl} className="w-full aspect-square rounded-[20px] shadow-[0_2px_4px_0_rgba(0,0,0,0.15)]" alt="" />
      <div className="flex w-full justify-between items-center">
        <h1 className="text-[var(--strict-white)] text-[24px] font-bold">{title}</h1>
        <p className="text-[var(--light-lime)] italic text-[12px]">count: {count} ({id})</p>
      </div>
      <p className="text-[var(--strict-white)] text-[16px] w-full">{description}</p>

      <div className="size-[40px] cursor-pointer bg-[var(--light-orange)] rounded-full flex items-center justify-center">
        {!showInput && <img src="/icons/cart.svg" alt="cart" className="size-[20px]"/>}
        {showInput && <img src="/icons/plus.svg" alt="plus" className="size-[20px]"/>}
      </div>
      
      {showInput && <input type="number" onChange={setCount} className="focus:outline-none focus:ring-[var(--light-orange)] focus:ring-2 bg-[var(--strict-white)] rounded-[10px] text-[18px] text-[var(--primary-dark)] text-center w-[150px]" />}
      
      {errorMessage && <p className="italic text-[16px] text-[var(--restricted-red)]">{errorMessage}</p>}
      {successMessage && <p className="italic text-[16px] text-[var(--light-lime)]">{successMessage}</p>}
    </div>
  );
}

export default ProductCard;
