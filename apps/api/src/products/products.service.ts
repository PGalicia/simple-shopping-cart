import { Injectable } from "@nestjs/common";
import { prisma } from "@repo/database";

@Injectable()
export class ProductsService {
  async getAllProducts() {
    const products = await prisma.product.findMany();

    // Group all the products via its "type"
    const groupedProducts = products.reduce((acc, product) => {
      const { type } = product;

      // If type doesn't exists, add it in
      if (!acc[type]) {
        acc[type] = [];
      }

      // Add in the product in the proper typing
      acc[type].push(product);

      return acc;
    }, {})

    return {
      products: groupedProducts
    };
  }
}
