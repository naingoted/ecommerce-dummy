import { renderHook, act } from "@testing-library/react";
import useCart, { CartStore } from "../use-cart";
import { Product } from "@/types";

describe("#useCart", () => {
  let cart: { current: CartStore };
  beforeEach(() => {
    const { result } = renderHook(() => useCart());
    cart = result;
  });

  afterEach(() => {
    act(() => {
      cart.current.emptyCart();
    });
  });

  test("should add items to the cart", () => {

    act(() => {
      cart.current.addItem({ id: 1, name: "Test Product", price: 10 } as unknown as Product);
    });

    expect(cart.current.items).toEqual([
      { id: 1, name: "Test Product", price: 10, quantity: 1 },
    ]);
  });

  test("should remove items from the cart", () => {
    act(() => {
      cart.current.addItem({ id: 1, name: "Test Product", price: 10 } as unknown as Product);
    });
    act(() => {
      cart.current.removeItem(1);
    });
    expect(cart.current.items).toEqual([]);
  });

  test("should remove all items with a specific ID from the cart", () => {
    act(() => {
      cart.current.addItem({ id: 1, name: "Test Product 1", price: 10 } as unknown as Product);
      cart.current.addItem({ id: 2, name: "Test Product 2", price: 20 } as unknown as Product);
      cart.current.addItem({ id: 1, name: "Test Product 1", price: 10 } as unknown as Product);
    });

    act(() => {
      cart.current.removeAll(1);
    });

    expect(cart.current.items).toEqual([
      { id: 2, name: "Test Product 2", price: 20, quantity: 1 },
    ]);
  });

  test("should update item quantity in the cart", () => {
    act(() => {
      cart.current.addItem({ id: 1, name: "Test Product", price: 10 } as unknown as Product);
    });

    act(() => {
      cart.current.addItem({ id: 1, name: "Test Product", price: 10 } as unknown as Product);
    });

    expect(cart.current.items).toEqual([
      { id: 1, name: "Test Product", price: 10, quantity: 2 },
    ]);
  });

  test("should empty the cart", () => {
    act(() => {
      cart.current.addItem({ id: 1, name: "Test Product 1", price: 10 } as unknown as Product);
      cart.current.addItem({ id: 2, name: "Test Product 2", price: 20 } as unknown as Product);
    });

    act(() => {
      cart.current.emptyCart();
    });

    expect(cart.current.items).toEqual([]);
  });
});
