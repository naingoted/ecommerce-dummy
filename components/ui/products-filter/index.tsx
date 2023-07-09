"use client";
import React, { FC, useCallback } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryFilter from "./category-filter";
import PriceRangeFilter from "./price-range-filter";
import RatingFilter from "./rating-filter";

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

interface FilterProps {
  categories: string[];
  priceRange: PriceRangeFilterProps["value"];
}

const ProductsFilter: FC<FilterProps> = ({ categories, priceRange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = qs.parse(searchParams.toString());

  let lastCategoryUpdate = React.useRef<string>();

  const handleQueryChange = useCallback(
    (newQueryValues: {
      category?: string;
      price?: PriceRangeFilterProps["value"];
      stars?: number;
    }) => {
      const query = {
        ...current,
        ...newQueryValues,
      };

      const url = qs.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true }
      );

      /**
       * @todo this is triggering multiple renders.
       */
      router.push(url);
    },
    [current, router]
  );

  const handleCategoryChange = (category: string) => {
    lastCategoryUpdate.current = category;
    handleQueryChange({ category });
  };

  const handlePriceChange = (price: PriceRangeFilterProps["value"]) => {
    handleQueryChange({ price });
  };

  const handleStarsChange = (stars: number) => {
    handleQueryChange({ stars });
  };
  console.log("helo");
  return (
    <div className="flex gap-4 mt-4 flex-col md:flex-row px-4 sm:px-6 lg:px-8">
      <CategoryFilter
        categories={categories}
        value={String(current.category)}
        onChange={handleCategoryChange}
      />
      <PriceRangeFilter
        value={
          Array.isArray(current.price)
            ? (current.price.map(Number) as PriceRangeFilterProps["value"])
            : priceRange
        }
        onChange={handlePriceChange}
      />
      <RatingFilter
        value={Number(current.stars)}
        onChange={handleStarsChange}
      />
    </div>
  );
};

export default ProductsFilter;
