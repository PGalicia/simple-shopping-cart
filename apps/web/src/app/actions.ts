import type { ProductGroup, Cart } from '@web/types/ProductType';

type HelloResponse = {
  message: string;
  stats: {
    products: number;
    carts: number;
  };
};

interface ProductResponse {
  products: ProductGroup;
}

export async function getHello(): Promise<HelloResponse> {
  try {
    const response = await fetch("http://localhost:3333/hello");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching hello:", error);
    return {
      message: "Error fetching message",
      stats: { products: 0, carts: 0 },
    };
  }
}

export async function getProducts(): Promise<ProductResponse> {
  try {
    const response = await fetch("http://localhost:3333/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching hello:", error);
    return {
      products: {}
    };
  }
}

export async function getCartItems(): Promise<Cart> {
  try {
    const response = await fetch("http://localhost:3333/cart");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching hello:", error);
    return {
      totalPrice: 0,
      cartItems: []
    };
  }
}

export async function addProductsToCart(productIds: string[]) {
  try {
    const response = await fetch("http://localhost:3333/cart/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productIds
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add products to cart');
    }

    const result = await response.json();
    console.log('Cart upserted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error upserting cart:', error);
  }
}