import {
  filterProductsByPriceRange,
  filterProductsByRating,
} from "@/lib/utils";
import { Product } from "@/types";
import qs from "query-string";

interface Query {
  limit?: number;
  skip?: number;
  price?: [number, number];
  category?: string;
  stars?: number;
}

const getUrl = (category?: string) => {
  let URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/products`;
  // let LOCAL_URL = `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/v1/products`;
  if (category && category !== "all") {
    URL = URL + `/category/${category}`;
  }
  return URL;
};

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: getUrl(query.category),
    query: {
      limit: query.limit,
      skip: query.skip,
    },
  });
  const res = await fetch(url);

  const { products } = await res.json();
  if (res.ok) {
    let filtered = [...products];
    if (query.stars) {
      filtered = filterProductsByRating(filtered, Number(query.stars));
    }

    if (Array.isArray(query.price)) {
      filtered = filterProductsByPriceRange(filtered, query.price);
    }

    return filtered;
  } else {
    return [];
  }
};

export default getProducts;
