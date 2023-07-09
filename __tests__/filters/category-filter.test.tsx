import { render, screen, waitFor } from "@testing-library/react";
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

    const selectButton = screen.getByRole("combobox");
    userEvent.click(selectButton);

    await waitFor(() => {
      // should open dropdown
      expect(screen.getAllByRole("option")[0]).toBeInTheDocument();
      // should see the option in the dropdown
      expect(screen.queryByText("Books")).toBeInTheDocument();
    });

    const booksOption = screen.getByText("Books");
    await userEvent.click(booksOption);
    // should close the dropdown
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    // should call onChange after the option is clicked
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("Books");
    });
  });
});
