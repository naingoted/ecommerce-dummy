import ProductList from "@/components/ui/product-list";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { productsData } from "../../test-mocks/data";
import mockRouter from "next-router-mock";
import ProductCard from "@/components/ui/product-card";

describe("ProductCard", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
    render(<ProductCard data={productsData[0]} />);
  });
  it("should render successfully", async () => {
    expect(screen.getAllByTestId("product-card")).toHaveLength(1);
    expect(await screen.findByText("iPhone 9")).toBeInTheDocument();
  });

  it("should go to product page on click", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByTestId("product-card"));
    expect(mockRouter.pathname).toEqual("/product/1");
  });
});
