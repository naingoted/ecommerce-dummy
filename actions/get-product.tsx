import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`;

const getProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProduct;
