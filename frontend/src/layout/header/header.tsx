const Header = () => {
  const currentPage = window.location.pathname;
  console.log(currentPage);

  const menu = [
    {
      name: 'home',
      url: '/',
      isSelect: currentPage === '/',
    },
    {
      name: 'cart',
      url: '/cart',
      isSelect: currentPage === '/cart',
    },
    {
      name: 'profile',
      url: '/profile',
      isSelect: currentPage === '/profile',
    },
  ]

  return (
    <div className='flex px-[200px] h-[100px] border-b-[2px] border-[var(--primary-dark)] justify-between items-center w-full'>
      <h1 className="text-5xl text-[var(--primary-dark)] font-bold">smart<span className="text-[var(--secondary-aqua)]">Shop</span></h1>
      <div className='flex gap-[30px] text-[28px]'>
        {menu.map((item, index) => (
          <a key={index} href={item.url} className={`${item.isSelect ? 'text-[var(--secondary-aqua)] font-bold' : 'text-[var(--primary-dark)]'}`}>{item.name}</a>
        ))}
      </div>
    </div>
  );
}

export default Header;
