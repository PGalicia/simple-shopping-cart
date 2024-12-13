interface ButtonDefaultProps {
  buttonText: string;
  onClick: () => void;
  isDisabled?: boolean;
  extraClasses?: string;
}

export default function ButtonDefault({ buttonText, onClick, isDisabled = false, extraClasses = '' }: ButtonDefaultProps) {
  const defaultClasses = 'border-2 border-black text-center p-2 rounded-xl font-bold transition-all';
  const buttonClasses = isDisabled
    ? `bg-gray-300 text-gray-500 border-2 border-gray-300 cursor-not-allowed ${defaultClasses}`
    : `bg-[#F68105] hover:shadow-[4px_4px_0_0_rgb(0,0,0)] ${defaultClasses}`;

  return (
    <button
      className={`${buttonClasses} ${extraClasses}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  )
}