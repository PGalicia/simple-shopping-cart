import { useEffect, useState } from 'react';

import { getCartItems } from '@web/app/actions';

import type { Cart, CartItem as CartItemType } from '@web/types/ProductType';

import CartItem from '@web/components/CartItem';

interface ModalDefaultProps {
  onCloseClick: () => void;
}

export default function ModalDefault({ onCloseClick }: ModalDefaultProps) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    getCartItems()
      .then(({ totalPrice, cartItems }: Cart) => {
        setTotalPrice(totalPrice);
        setCartItems(cartItems);
      })
  }, []);

  return (
    <div className="fixed flex justify-center top-0 left-0 h-screen w-screen bg-[#F6F6F6] z-[100] overflow-hidden u-slideUp">
      <div className="max-w-xl w-full bg-red px-4 py-8 md:py-12 overflow-y-scroll">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-4xl font-bold mb-4">Cart</div>
          <button className="uppercase cursor-pointer underline-offset-2 hover:underline" onClick={() => onCloseClick()}>Close cart</button>
        </div>

        {/* Total price */}
        <div className="text-xl mb-4">Total: <span className="font-bold font-mono">${totalPrice.toFixed(2)}</span></div>

        {/* Cart list */}
        <div className="flex flex-col gap-2">
          {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          }
        </div>
      </div>
    </div>
  );
}