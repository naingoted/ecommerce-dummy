import Gallery from "@/components/ui/gallery";
import Info from "@/components/info";
import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import NotFound from "@/components/ui/not-found";

interface ProductPageProps {
  params: {
    productId: number;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  if (!product || product?.message) {
    return <NotFound />;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product?.images} title={product?.title} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
