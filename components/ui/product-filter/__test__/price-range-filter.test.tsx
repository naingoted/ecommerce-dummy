import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PriceRangeFilter from "@/components/ui/product-filter/price-range-filter";

describe("PriceRangeFilter", () => {
  it("renders with default values", () => {
    render(<PriceRangeFilter value={[10, 20]} onChange={jest.fn()} />);

    const minPriceInput = screen.getByLabelText("Min Price");
    const maxPriceInput = screen.getByLabelText("Max Price");

    expect(minPriceInput).toHaveValue(10);
    expect(maxPriceInput).toHaveValue(20);
  });

  it("calls onChange with new values when inputs are changed", async () => {
    const mockOnChange = jest.fn();
    render(<PriceRangeFilter value={[10, 20]} onChange={mockOnChange} />);

    const minPriceInput = screen.getByRole("input", { name: "Min Price" });
    const maxPriceInput = screen.getByRole("input", { name: "Max Price" });

    await userEvent.clear(minPriceInput);
    await userEvent.type(minPriceInput, "15");
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([15, 20]);
    });
    await userEvent.clear(maxPriceInput);
    await userEvent.type(maxPriceInput, "25");
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([15, 25]);
    });
  });
});
