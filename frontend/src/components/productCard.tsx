'use client';

import { useState } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  count: number;
  id: number;
  errorMessage?: string;
  successMessage?: string;
  imageUrl?: string;
}

const ProductCard = ({ title, description, count, id, errorMessage, successMessage, imageUrl }: ProductCardProps) => {
  const [, setClicked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [orderedCount, setOrderedCount] = useState(0);

  const click = () => {
    if (!showInput) {
      setClicked(true);
      setShowInput(true);
    } else {
      setClicked(false);
      setShowInput(false);
      const products = localStorage.getItem('cartProducts');
      if (!products) {
        localStorage.setItem(
          'cartProducts',
          JSON.stringify({
            email: '',
            products: [{count: orderedCount, id}]
          })
        );
      } else {
        const cartProducts = JSON.parse(products);
        cartProducts.products.push({count: orderedCount, id});
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-[300px] bg-[var(--secondary-aqua)] rounded-[20px] p-[15px] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)] gap-[10px]">
      <img src={imageUrl} className="w-full aspect-square rounded-[20px] shadow-[0_2px_4px_0_rgba(0,0,0,0.15)]" alt="" />
      <div className="flex w-full justify-between items-center">
        <h1 className="text-[var(--strict-white)] text-[24px] font-bold">{title}</h1>
        <p className="text-[var(--light-lime)] italic text-[12px]">count: {count} ({id})</p>
      </div>
      <p className="text-[var(--strict-white)] text-[16px] w-full">{description}</p>

      <div
        className="size-[40px] cursor-pointer bg-[var(--light-orange)] rounded-full flex items-center justify-center"
        onClick={click}
      >
        {!showInput && <img src="/icons/cart.svg" alt="cart" className="size-[20px]"/>}
        {showInput && <img src="/icons/plus.svg" alt="plus" className="size-[20px]"/>}
      </div>
      
      {showInput &&
        <input
          type="number"
          value={orderedCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderedCount(parseInt(e.target.value))}
          className="focus:outline-none focus:ring-[var(--light-orange)] focus:ring-2 bg-[var(--strict-white)] rounded-[10px] text-[18px] text-[var(--primary-dark)] text-center w-[150px]"
        />
      }
      
      {errorMessage && <p className="italic text-[16px] text-[var(--restricted-red)]">{errorMessage}</p>}
      {successMessage && <p className="italic text-[16px] text-[var(--light-lime)]">{successMessage}</p>}
    </div>
  );
}

export default ProductCard;
