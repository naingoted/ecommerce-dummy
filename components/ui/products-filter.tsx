"use client";
import React, { FC, useState, useEffect, useCallback } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import LoadingSpinner from "./spinner";
import Select from "./select";

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

interface FilterProps {
  categories: string[];
  priceRange: PriceRangeFilterProps["value"];
}

const CategoryFilter: FC<{
  categories: string[];
  value: string;
  onChange: (category: string) => void;
}> = ({ categories, value = "all", onChange }) => {
  const [isPending, startTransition] = React.useTransition();

  const handleOptionSelect = (selectedValue: string) => {
    startTransition(() => {
      onChange(selectedValue);
    });
  };

  return (
    <div>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700"
      >
        Category
      </label>
      <Select
        options={["all", ...categories]}
        value={value}
        id="category"
        loading={isPending}
        onOptionSelect={handleOptionSelect}
      />
    </div>
  );
};

const PriceRangeFilter: FC<PriceRangeFilterProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  const debouncedPrice = useDebounce(localValue);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  /**
   * @todo only validate after debounce is over.
   */
  const handleMinValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    setLocalValue([newMin, localValue[1]]);
  };

  const handleMaxValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    setLocalValue([localValue[0], newMax]);
  };

  // Notify the parent about the change
  useEffect(() => {
    onChange(debouncedPrice);
  }, [debouncedPrice, onChange]);

  return (
    <div className="flex gap-4">
      <div>
        <label
          htmlFor="priceMin"
          className="block text-sm font-medium text-gray-700"
        >
          Min Price
        </label>
        <input
          type="number"
          id="priceMin"
          value={localValue[0]}
          onChange={handleMinValChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="priceMax"
          className="block text-sm font-medium text-gray-700"
        >
          Max Price
        </label>
        <input
          type="number"
          id="priceMax"
          value={localValue[1]}
          onChange={handleMaxValChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

const StarsFilter: FC<{
  value: number | null;
  onChange: (stars: number) => void;
}> = ({ value, onChange }) => {
  const [isPending, startTransition] = React.useTransition();

  function isStarActive(star: number, value: number) {
    return value && star <= value;
  }

  const handleOnClick = (star: number) => {
    startTransition(() => {
      onChange(star);
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Stars</label>
      <div className="flex gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleOnClick(star)}
            className={`text-lg cursor-pointer ${
              isStarActive(star, value) ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            <Star
              className={
                isStarActive(star, value) ? "fill-current text-yellow-500" : ""
              }
            />
          </button>
        ))}
        {isPending && <LoadingSpinner />}
      </div>
    </div>
  );
};

const ProductsFilter: FC<FilterProps> = ({ categories, priceRange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = qs.parse(searchParams.toString());

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
    handleQueryChange({ category });
  };

  const handlePriceChange = (price: PriceRangeFilterProps["value"]) => {
    handleQueryChange({ price });
  };

  const handleStarsChange = (stars: number) => {
    handleQueryChange({ stars });
  };

  return (
    <div className="flex gap-4 mt-4">
      <CategoryFilter
        categories={categories}
        value={current.category as string}
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
      <StarsFilter value={Number(current.stars)} onChange={handleStarsChange} />
    </div>
  );
};

export default ProductsFilter;
