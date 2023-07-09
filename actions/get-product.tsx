import { Product } from "@/types";

const URL = `${process.env.API_URL}/api/products`;

const getProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProduct;
