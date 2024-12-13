import { Controller, Post, Body, Get } from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addProductToCart(@Body() body: { productIds: string[] }) {
    const { productIds } = body;
    const cart = await this.cartService.addProductToCart(productIds);
    return cart;
  }

  @Get()
  async getCartItems() {
    return this.cartService.getCartItems();
  }
}
