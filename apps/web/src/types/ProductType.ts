export enum ProductType {
  Furniture = "furniture",
  Planter = "planter",
  Plant = "plant",
  Lighting = "lighting",
  Decor = "decor",
  Feature = "feature"
}

export interface Product {
  id: string;
  name: string;
  price: string;
  type: ProductType;
}

export interface ProductUI extends Product {
  isSelected: boolean;
}

export type ProductGroup = {
  [key in ProductType]?: Product[];
}

export type ProductGroupUI = {
  [key in ProductType]: ProductUI[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  totalPrice: number;
  cartItems: CartItem[]
}
