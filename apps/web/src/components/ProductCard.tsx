import type { ProductUI } from '@web/types/ProductType';

interface ProductCardProps {
  product: ProductUI;
};

export default function ProductCard ({ product }: ProductCardProps) {
  const { name, price, type, isSelected } = product;

  const selectedSpecificClasses = isSelected
    ? 'bg-[#FFA705] shadow-[4px_4px_0_0_rgb(0,0,0)]'
    : 'bg-white hover:shadow-[4px_4px_0_0_rgb(0,0,0)]';

  return (
    <div className={`p-4 rounded-2xl border border-black max-w-96 cursor-pointer transition-all h-full ${selectedSpecificClasses}`}>
      <div className="rounded-xl border border-black w-full bg-[#F6F6F6] h-32 mb-2" />
      <h3 className="font-black">{name}</h3>
      <div className="text-black/50 text-sm mb-4">{type}</div>
      <div className="font-mono text-xl font-bold">${price}</div>
    </div>
  );
}