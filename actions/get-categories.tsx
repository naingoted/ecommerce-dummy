const URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/products/categories`;
// const LOCAL_URL = `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/v1/products/categories`;
const getCategories = async (): Promise<string[]> => {
  try {
    const res = await fetch(URL);
    const categories = await res.json();

    return categories;
  } catch (error) {
    return [];
  }
};

export default getCategories;
