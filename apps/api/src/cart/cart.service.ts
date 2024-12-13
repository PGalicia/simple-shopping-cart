import { Injectable } from "@nestjs/common";
import { prisma } from "@repo/database";

@Injectable()
export class CartService {
  private readonly SINGULAR_CART_ID = '6ef734bc-3db2-440f-80bb-cb50b11856a3';

  async addProductToCart(productIds: string[]) {
    // Grab the cart OR Create one if nothing exists
    const cart = await prisma.cart.upsert({
      where: { id: this.SINGULAR_CART_ID },
      update: {},
      create: { id: this.SINGULAR_CART_ID },
    });

    // Add or update cart items
    const cartItems = productIds.map(productId => ({
      productId,
      cartId: cart.id,
    }));

    await prisma.cartItem.createMany({
      data: cartItems,
    });

    return cart;
  }

  async getCartItems() {
    // Check if cart exists
    let cart = await prisma.cart.findUnique({
      where: { id: this.SINGULAR_CART_ID },
      include: { cartItems: true },
    });

    if (!cart) {
      return {
        totalPrice: 0,
        cartItems: []
      };
    }

    const summarizedCartItems = {};

    // Grab the quantity of each item in the cart
    for (let i = 0; i < cart.cartItems.length; i++) {
      const current = cart.cartItems[i];
      summarizedCartItems[current.productId] = (summarizedCartItems[current.productId] || 0) + 1;
    }

    const updatedCartItemsWithQuantity = [];
    let totalPrice = 0;

    // Grab the products in the cart with the quantity property
    for (const [id, quantity] of Object.entries(summarizedCartItems)) {
      const targetProduct = await prisma.product.findUnique({
        where: { id }, 
      });

      if (targetProduct) {
        updatedCartItemsWithQuantity.push({
          ...targetProduct,
          quantity
        });

        totalPrice += (targetProduct.price.toNumber() * (quantity as number));
      }
    }

    return {
      totalPrice,
      cartItems: updatedCartItemsWithQuantity
    };
  }
}
