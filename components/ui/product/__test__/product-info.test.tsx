import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import useCart from "@/hooks/use-cart";
import Info from "@/components/info";
import { cartData, productsData } from "@/test-mocks/data";

describe("ProductInfo", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/product/1");
    render(<Info data={productsData[0]} />);
  });
  test("should render successfully", async () => {
    expect(await screen.findByText(/^iPhone 9$/)).toBeInTheDocument();
    expect(screen.getByTestId("product-add-to-cart")).toBeInTheDocument();
  });

  test("add to cart store when add to cart is clicked", async () => {
    const user = userEvent.setup();

    expect(useCart.getState().items.length).toEqual(0);
    await user.click(screen.getByTestId("product-add-to-cart"));
    expect(useCart.getState().items.length).toEqual(1);
  });
});
