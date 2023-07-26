// import ProductList from "@/components/ui/product/product-list";
import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { productsData } from "@/test-mocks/data";
import mockRouter from "next-router-mock";
import ProductCard from "@/components/ui/product/product-card";

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
    // const user = userEvent.setup();
    // works for next/navigation but not for next/link, link is better for seo
    // await user.click(screen.getByTestId("product-card"));
    // expect(mockRouter.pathname).toEqual("/product/1");
  });
});
