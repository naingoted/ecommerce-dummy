import { Product } from "@/types";
import {
  getProductsPriceRange,
  filterProductsByRating,
  filterProductsByPriceRange,
} from "./utils";

describe("#getProductsPriceRange", () => {
  it("should correctly determine the minimum and maximum price from a list of products", () => {
    const products = [
      {
        id: 4,
        price: 280,
      },
      {
        id: 5,
        price: 499,
      },
    ] as Product[];

    const result = getProductsPriceRange(products);

    expect(result).toEqual([280, 499]);
  });

  it("should correctly handle a list with one product", () => {
    const products = [
      {
        id: 4,
        price: 280,
      },
    ] as Product[];

    const result = getProductsPriceRange(products);

    expect(result).toEqual([280, 280]);
  });

  it("should throw error when list is empty", () => {
    const products = [] as Product[];
    const result = getProductsPriceRange(products);
    expect(result).toEqual([0, 0]);
  });
});

describe("#filterProductsByRating", () => {
  it("should correctly filter products based on rating", () => {
    const products = [
      { id: 1, rating: 3.5 },
      { id: 2, rating: 4.0 },
      { id: 3, rating: 4.5 },
      { id: 4, rating: 5.0 },
    ] as Product[];

    const result = filterProductsByRating(products, 4);
    expect(result).toEqual([
      { id: 2, rating: 4.0 },
      { id: 3, rating: 4.5 },
    ]);
  });

  it("should return all products with 5 stars rating", () => {
    const products = [
      { id: 1, rating: 5.0 },
      { id: 2, rating: 5.0 },
      { id: 3, rating: 5.0 },
    ] as Product[];

    const result = filterProductsByRating(products, 5);

    expect(result).toEqual(products);
  });

  it("should throw an error for invalid ratings", () => {
    const products = [{ id: 1, rating: 3.5 }] as Product[];

    expect(() => filterProductsByRating(products, 6)).toThrow();
    expect(() => filterProductsByRating(products, 0)).toThrow();
  });
});

describe("#filterProductsByPriceRange", () => {
  const products = [
    { id: 1, price: 100 },
    { id: 2, price: 200 },
    { id: 3, price: 300 },
    { id: 4, price: 400 },
  ] as Product[];

  it("returns all products if priceRange is null", () => {
    expect(filterProductsByPriceRange(products, null)).toEqual(products);
  });

  it("returns products within a specified price range", () => {
    expect(filterProductsByPriceRange(products, [150, 350])).toEqual([
      { id: 2, price: 200 },
      { id: 3, price: 300 },
    ]);
  });

  it("returns no products if none are within the specified price range", () => {
    expect(filterProductsByPriceRange(products, [500, 600])).toEqual([]);
  });

  it("returns products at the lower bound of the price range", () => {
    expect(filterProductsByPriceRange(products, [200, 300])).toEqual([
      { id: 2, price: 200 },
    ]);
  });

  it("excludes products at the upper bound of the price range", () => {
    expect(filterProductsByPriceRange(products, [100, 200])).toEqual([
      { id: 1, price: 100 },
    ]);
  });
});
