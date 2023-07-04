const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products/categories`;

const getCategories = async (): Promise<string[]> => {
  const res = await fetch(URL);

  const categories = await res.json();

  if (res.ok) {
    return categories;
  } else {
    throw new Error("products api failed");
  }
};

export default getCategories;
