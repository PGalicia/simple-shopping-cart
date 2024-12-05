import { Injectable } from "@nestjs/common";
import { prisma } from "@repo/database";

@Injectable()
export class HelloService {
  async getHello() {
    const productCount = await prisma.product.count();
    const cartCount = await prisma.cart.count();

    return {
      message: "Hello from NestJS!",
      stats: {
        products: productCount,
        carts: cartCount,
      },
    };
  }
}
