import { Product } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

export function getProductsPriceRange(products: Product[]): [number, number] {
  if (!products.length) {
    return [0, 0];
  }
  return products.reduce(
    (acc, cur) => {
      return [
        cur.price < acc[0] ? cur.price : acc[0],
        cur.price > acc[1] ? cur.price : acc[1],
      ];
    },
    [products[0].price, products[0].price]
  );
}

export function filterProductsByRating(
  products: Product[],
  minRating: number
): Product[] {
  if (minRating < 1 || minRating > 5) {
    throw new Error("Invalid rating. Rating must be between 1 and 5.");
  }

  return products.filter(
    (product) => product.rating >= minRating && product.rating < minRating + 1
  );
}

export function filterProductsByPriceRange(
  products: Product[],
  priceRange: [number, number] | null
): Product[] {
  if (Array.isArray(priceRange)) {
    return products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price < priceRange[1]
    );
  }
  return products;
}
