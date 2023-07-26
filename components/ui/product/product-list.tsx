"use client";

import { FC } from "react";
import NoResults from "@/components/ui/no-results";
import { Product } from "@/types";
import ProductCard from "./product-card";

interface ProductList {
  products: Product[];
}

const ProductList: FC<ProductList> = ({ products }) => {
  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {products.length === 0 && <NoResults />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
