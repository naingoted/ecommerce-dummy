"use client";

import Image from "next/image";
import Currency from "@/components/ui/currency";
import Link from "next/link";
import { Product } from "@/types";
import StarRating from "./star-rating";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  return (
    <Link
      href={`/product/${data?.id}`}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      data-testid="product-card"
      role="link"
      aria-label="product-card"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.thumbnail}
          alt={data?.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="aspect-square object-cover rounded-md"
        />
      </div>
      <div>
        <p className="font-semibold text-lg">{data?.title}</p>
        <p className="text-sm text-gray-500">{data?.category}</p>
        <StarRating rating={data?.rating} />
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />{" "}
        <span className="ml-2 text-sm text-green-600 font-medium bg-green-200 px-2 py-1 rounded-full">
          {`${data?.discountPercentage}% off`}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
