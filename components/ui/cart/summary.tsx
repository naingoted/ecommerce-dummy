'use client';
import axios from 'axios';
import { useEffect, FC, useState } from "react";
import { useSearchParams } from "next/navigation";

import { toast } from "react-hot-toast";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import LoadingSpinner from "../spinner";

const Summary: FC = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const emptyCart = useCart((state) => state.emptyCart);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      emptyCart();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, emptyCart]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onCheckout = async () => {
    setIsLoading(true);
    const response = await axios.post(`api/v1/checkout`, {
      products: items,
    });
    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div
          className="flex items-center justify-between border-t border-gray-200 pt-4"
          data-testid="order-summary"
        >
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        <span className="flex justify-center gap-2">
          Checkout
          {isLoading && <LoadingSpinner size={15} />}
        </span>
      </Button>
    </div>
  );
};

export default Summary;
