"use client"

import { useState, useEffect } from "react";
import { getProducts, addProductsToCart } from "./actions";

import type { ProductGroup, ProductGroupUI, ProductType } from '@web/types/ProductType';

import ButtonDefault from '@web/components/ButtonDefault';
import ModalDefault from '@web/components/ModalDefault';
import ProductCard from '@web/components/ProductCard';
import FilterPill from '@web/components/FilterPill';

export default function Home() {
  const [products, setProducts] = useState<ProductGroupUI>({} as ProductGroupUI);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areFetchingProducts, setAreFetchingProducts] = useState(true);
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getProducts()
      .then(({ products: initialProducts }: { products: ProductGroup }) => {
        // Mark that you were able to fetch the products fine
        setAreFetchingProducts(false);

        // Create filters
        const initialFilters = Object.keys(initialProducts)
          .map((type) => ([type, true]));
        setFilters(Object.fromEntries(initialFilters));

        /**
         * Update the data to include isSelected property.
         * This is done so that we can keep track which products are selected
         */
        const updatedData = Object.entries(initialProducts)
          .reduce((result: ProductGroupUI, [type, products]) => {
            result[type as keyof ProductGroupUI] = products.map(product => ({
              ...product,
              isSelected: false
            }))

            return result;
          }, {} as ProductGroupUI);

        setProducts(updatedData);
      })
  }, []);

  /**
   * When a product is clicked, update the isSelected value for that specific object.
   * In addition, adjust total selected count
   */
  function handleProductClick(type: ProductType, id: string): void {
    setProducts(prevGroupedItems => {
      // Update isSelected for the target product
      const updatedProducts = prevGroupedItems[type].map(product => {
        return product.id === id
          ? { ...product, isSelected: !product.isSelected }
          : product;
      });

      // Create a new product list with the updated data
      const newProductList = {
        ...prevGroupedItems,
        [type]: updatedProducts
      }

      // Count how many products are selected
      const newSelectedCount = Object.values(newProductList)
        .flat()
        .filter(product => product.isSelected).length;
      
      // Update selected count
      setSelectedCount(newSelectedCount);

      // Update products
      return newProductList;
    });
  }

  function addToCartText(): string {
    const itemText = selectedCount <= 1
      ? 'item'
      : 'items';

    return `Add ${selectedCount} ${itemText} to cart`;
  }

  function resetProduct() {
      setProducts((prevProductList) => {
        const updatedData = Object.entries(prevProductList)
          .reduce((result: ProductGroupUI, [type, products]) => {
            result[type as keyof ProductGroupUI] = products.map(product => ({
              ...product,
              isSelected: false
            }))

            return result;
          }, {} as ProductGroupUI);
    
        return updatedData;
      });

      // Reset selected count
      setSelectedCount(0);
  }

  function handleAddToCartClick(): void {
    // Grab selected products
    const productIds = Object.values(products)
      .flat()
      .filter(product => product.isSelected)
      .map(product => product.id);

    // If there are ids to add, add it
    if (productIds) {
      // Unselect all products
      resetProduct();

      addProductsToCart(productIds)
        .then(() => {
          alert('Product(s) successfully added');
        });
    }
  }
  
  function handleFilterClick(filterType: string) {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: !prevFilters[filterType]
    }));

    // Unselect all products (for now)
    resetProduct();
  }

  return (
    <main className="max-w-5xl mx-auto pb-36">
      {areFetchingProducts && <div className="text-center italic p-12">Fetching products</div>}

      {/* Filters */}
      <div className="flex gap-2 p-4 flex-wrap">
        {Object.entries(filters).map(([type, isSelected]) => (
            <FilterPill key={type} text={type} onClick={handleFilterClick} isSelected={isSelected} />
          ))
        }
      </div>

      {/* Product list */}
      {!areFetchingProducts &&
        <div className="p-4">
          {Object.entries(products).map(([type, productList]) => (filters[type] &&
            <div className="py-4" key={type}>
              <h2 className="font-bold text-xl mb-2 uppercase">{type}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
                {productList.map(product => (
                  <div key={product.id} onClick={() => handleProductClick(type as ProductType, product.id)}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))
          }
        </div>
      }

      {/* Buttons */}
      <div className="fixed flex flex-col md:flex-row gap-4 bottom-0 left-0 w-screen z-50 bg-white p-4 border-t border-t-black">
        <ButtonDefault buttonText={addToCartText()} isDisabled={selectedCount === 0} onClick={handleAddToCartClick} extraClasses="w-full" />
        <ButtonDefault buttonText="View cart" onClick={() => setIsModalOpen(true)} extraClasses="w-full" />
      </div>

      {/* Modal */}
      {isModalOpen && <ModalDefault onCloseClick={() => setIsModalOpen(false)} />}
    </main>
  );
}
