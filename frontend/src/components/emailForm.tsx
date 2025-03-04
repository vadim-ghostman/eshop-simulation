const EmailForm = ({ email = '', setEmail, onClick }: { email?: string, setEmail: (e: string) => void, onClick: () => void}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-[var(--secondary-aqua)] rounded-[20px] p-[30px] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)] gap-[30px] h-fit">
      <h1 className="text-[var(--strict-white)] font-bold text-[32px]">Vyplnte mailovu adresu</h1>
      <div className="flex flex-col gap-[15px] items-center">
        {email === '' && 
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="enter email address..."
            className="w-[400px] px-2 py-1 rounded-[10px] text-[18px] text-[var(--primary-dark)] focus:outline-none focus:ring-[var(--light-orange)] focus:ring-2 bg-[var(--strict-white)]"
          />
        }
        {email !== '' && 
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="enter email address..."
            className="w-[400px] px-2 py-1 rounded-[10px] text-[18px] text-[var(--primary-dark)] focus:outline-none focus:ring-[var(--light-orange)] focus:ring-2 bg-[var(--strict-white)]"
          />
        }
        <button
          onClick={onClick}
          className="bg-[var(--light-orange)] text-[var(--strict-white)] text-[20px] px-4 py-2 rounded-[10px]"
        >
          vytvorit objednavku
        </button>
      </div>
    </div>
  );
}

export default EmailForm;
