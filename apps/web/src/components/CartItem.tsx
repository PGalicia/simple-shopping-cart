import type { CartItem } from '@web/types/ProductType';

interface CartItemProps {
  cartItem: CartItem
}

export default function CartItem({ cartItem }: CartItemProps) {
  const { name, price, type, quantity } = cartItem;

  return (
    <div className="flex relative gap-4 p-4 rounded-2xl border border-black bg-white transition-all w-full">
      <div className="rounded-xl border border-black aspect-square bg-[#F6F6F6] h-24" />
      <div className="flex flex-col">
        <div className="font-black">{name}</div>
        <div className="text-black/50 text-sm mb-4">{type}</div>
        <div className="font-mono text-xl font-bold">${price}</div>
      </div>
      {quantity > 1 && <div className="absolute top-2 left-2 bg-[#F68105] text-xs p-2 aspect-square w-8 rounded-full font-bold">x{quantity}</div>}
    </div>
  )
}