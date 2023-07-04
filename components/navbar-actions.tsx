"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <Link
      href="/cart"
      className="ml-auto flex items-center gap-x-4"
      data-testid={"navbar-actions"}
    >
      <Button
        className="flex items-center rounded-full bg-black px-4 py-2"
        data-testid={"go-to-cart"}
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.reduce((total, item) => {
            return total + item.quantity;
          }, 0)}
        </span>
      </Button>
    </Link>
  );
};

export default NavbarActions;
