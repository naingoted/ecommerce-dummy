import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { cartData, productsData } from "../../test-mocks/data";
import mockRouter from "next-router-mock";
import useCart from "@/hooks/use-cart";
import NavbarActions from "@/components/navbar-actions";

describe("NavbarActions", () => {
  beforeEach(() => {
    useCart.setState({
      items: cartData,
    });
    mockRouter.setCurrentUrl("/");
    render(<NavbarActions />);
  });
  it("should render successfully", async () => {
    expect(screen.getByTestId("go-to-cart")).toBeInTheDocument();
    expect(await screen.findByText("4")).toBeInTheDocument();
  });

  it("should go to cart page on click", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByTestId("go-to-cart"));
    expect(mockRouter.pathname).toEqual("/cart");
  });
});
