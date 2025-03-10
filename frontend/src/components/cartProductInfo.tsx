'use client';

interface CardProductInfoProps {
  title: string;
  count: number;
  id: number;
  imageUrl?: string;
  onClick: () => void;
}

const CardProductInfo = ({ title, count, id, imageUrl, onClick }: CardProductInfoProps) => {
  return (
    <div className="flex items-center bg-[var(--secondary-aqua)] rounded-[20px] p-[15px] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)] gap-[200px]">
      <div className="flex gap-[20px] items-center">
        <img src={imageUrl} className="w-[150px] aspect-square rounded-[20px] shadow-[0_2px_4px_0_rgba(0,0,0,0.15)]" alt={title} />
        <div className="flex flex-col gap-2">
          <h1 className="flex gap-1 items-center text-[var(--strict-white)] text-[32px] font-bold">
            {title}{' | '}
            <span className="text-[var(--light-lime)] italic text-[20px]">
              id: {id}
            </span>
          </h1>
          <p className="text-[var(--light-lime)] italic text-[20px]">count: {count}</p>
        </div>
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

export default CardProductInfo;
