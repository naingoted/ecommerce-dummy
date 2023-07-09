import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "@/app/(routes)/cart/page";
import useCart from "@/hooks/use-cart";
import { cartData } from "@/test-mocks/data";

describe("CartPage", () => {
  beforeEach(() => {
    useCart.setState({
      items: cartData,
    });
    render(<CartPage />);
  });
  test("should render successfully", async () => {
    expect(await screen.findByText(/^Shopping Cart$/)).toBeInTheDocument();
    expect(await screen.findByText(/^Order summary$/)).toBeInTheDocument();
    expect(screen.getAllByTestId("cart-item")).toHaveLength(2);
    // totalPrice is 549+(899*3)
    expect(screen.getByTestId("order-summary")).toHaveTextContent("$3,246.00");
  });

  test("updates summary when removing first cart item", async () => {
    const user = userEvent.setup();

    await user.click(screen.getAllByTestId("cart-remove-all")[0]);

    // totalPrice is 549+(899*3) - first item (549)
    expect(screen.getByTestId("order-summary")).toHaveTextContent("$2,697.00");
  });

  test("removes first cart item if the quantity is zero", async () => {
    const user = userEvent.setup();

    await user.click(screen.getAllByTestId("cart-decrease")[0]);
    expect(screen.getAllByTestId("cart-item")).toHaveLength(1);
  });

  test("updates summary and quantity when adding or removing quantity", async () => {
    const user = userEvent.setup();

    await user.click(screen.getAllByTestId("cart-increase")[0]);
    expect(screen.getAllByTestId("cart-item-quantity")[0]).toHaveTextContent(
      "2"
    );
    // totalPrice is 549+(899*3) + increase first item (549)
    expect(screen.getByTestId("order-summary")).toHaveTextContent("$3,795.00");

    await user.click(screen.getAllByTestId("cart-decrease")[1]);
    expect(screen.getAllByTestId("cart-item-quantity")[1]).toHaveTextContent(
      "2"
    );
    // totalPrice is 3795.00 - decrease second item (899)
    expect(screen.getByTestId("order-summary")).toHaveTextContent("$2,896.00");
  });
});
