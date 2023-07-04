import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product, CartProduct } from "@/types";

interface CartStore {
  items: CartProduct[];
  addItem: (data: Product) => void;
  removeItem: (id: number) => void;
  removeAll: (id: number) => void;
  emptyCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === data.id
        );

        if (existingItemIndex !== -1) {
          currentItems[existingItemIndex].quantity += 1;
          set({ items: currentItems });
          toast.success("Item quantity updated in cart.");
        } else {
          const newItem = { ...data, quantity: 1 };
          set({ items: [...currentItems, newItem] });
          toast.success("Item added to cart.");
        }
      },
      removeItem: (id: number) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === id
        );

        if (existingItemIndex !== -1) {
          if (currentItems[existingItemIndex].quantity > 1) {
            currentItems[existingItemIndex].quantity -= 1;
            set({ items: currentItems });
            toast.success("Item quantity decreased in cart.");
          } else {
            set({
              items: [
                ...currentItems.filter((item: Product) => item.id !== id),
              ],
            });
            toast.success("Item removed from cart.");
          }
        }
      },
      removeAll: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart.");
      },
      emptyCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
