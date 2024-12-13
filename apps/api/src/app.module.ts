import { Module } from "@nestjs/common";
import { HelloModule } from "./hello/hello.module";
import { ProductsModule } from "./products/products.module";
import { CartModule } from "./cart/cart.module";

@Module({
  imports: [HelloModule, ProductsModule, CartModule],
})
export class AppModule {}
