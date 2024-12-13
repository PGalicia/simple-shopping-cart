interface FilterPillProps {
  text: string;
  isSelected?: boolean
  onClick: (type: string) => void;
}

export default function FilterPill({ text, isSelected = false, onClick }: FilterPillProps) {
  return (
    <button className={`${ isSelected ? 'bg-[#7ABD7E]' : 'bg-[#FF6961]' } px-4 py-2 capitalize rounded-full border border-black transition-all hover:shadow-[4px_4px_0_0_rgb(0,0,0)]`} onClick={() => onClick(text)}>{text}</button>
  );
}