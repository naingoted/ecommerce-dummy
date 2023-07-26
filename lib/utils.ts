import { Product } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "react-hot-toast";
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
  if (minRating < 1 || minRating > 5 || typeof minRating !== 'number') {
    toast.error("Invalid rating. Rating must be between 1 and 5 and a number");
    return products;
  }

  return products.filter(
    (product) => product.rating <= minRating
  );
}

export function filterProductsByPriceRange(
  products: Product[],
  priceRange: [number, number] | null
): Product[] {
  if (Array.isArray(priceRange)) {
    return products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }
  return products;
}

export function getUrlbyEnv(url: string | undefined) {
  if (!url) {
    return "";
  }
  if (process.env.NODE_ENV === 'development') {
    return `http://${url}`
  }
  return `https://${url}`
}