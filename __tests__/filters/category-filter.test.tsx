import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "@/components/ui/products-filter/category-filter";

describe("CategoryFilter", () => {
  it("calls onChange handler with new value when an option is selected", async () => {
    const mockOnChange = jest.fn();
    render(
      <CategoryFilter
        categories={["Electronics", "Books", "Clothing"]}
        value="all"
        onChange={mockOnChange}
      />
    );

    const categoryFilter = screen.getByTestId("category-select");
    const selectButton = within(categoryFilter).getByRole("button");
    userEvent.click(selectButton);

    await waitFor(() =>
      expect(screen.queryByText("Books")).toBeInTheDocument()
    );

    const booksOption = screen.getByText("Books");
    userEvent.click(booksOption);
  });
});
