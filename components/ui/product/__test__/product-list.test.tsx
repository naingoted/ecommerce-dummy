import ProductList from "@/components/ui/product/product-list";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { productsData } from "@/test-mocks/data";
import mockRouter from "next-router-mock";

describe("ProductList", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
    render(<ProductList products={productsData} />);
  });
  it("should render successfully", async () => {
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(2);
  });
});
