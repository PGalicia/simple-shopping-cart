import { PrismaClient, ProductType } from "../src/generated/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Teak Garden Bench",
    price: 299.99,
    type: ProductType.furniture,
  },
  {
    name: "Ceramic Plant Pot - Large",
    price: 45.99,
    type: ProductType.planter,
  },
  {
    name: "Japanese Maple Tree",
    price: 89.99,
    type: ProductType.plant,
  },
  {
    name: "Solar Path Lights (Set of 6)",
    price: 79.99,
    type: ProductType.lighting,
  },
  {
    name: "Weather-Resistant Outdoor Rug",
    price: 129.99,
    type: ProductType.decor,
  },
  {
    name: "Stone Fire Pit",
    price: 249.99,
    type: ProductType.feature,
  },
  {
    name: "Adirondack Chair",
    price: 159.99,
    type: ProductType.furniture,
  },
  {
    name: "Herb Garden Starter Kit",
    price: 34.99,
    type: ProductType.plant,
  },
  {
    name: "Outdoor String Lights",
    price: 49.99,
    type: ProductType.lighting,
  },
  {
    name: "Bamboo Privacy Screen",
    price: 189.99,
    type: ProductType.feature,
  },
];

async function main() {
  console.log("Start seeding...");

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${createdProduct.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
