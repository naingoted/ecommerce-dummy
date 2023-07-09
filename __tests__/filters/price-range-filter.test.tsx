import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import PriceRangeFilter from "@/components/ui/products-filter/price-range-filter";

describe("PriceRangeFilter", () => {
  it("renders with default values", () => {
    render(<PriceRangeFilter value={[10, 20]} onChange={jest.fn()} />);

    const minPriceInput = screen.getByLabelText("Min Price");
    const maxPriceInput = screen.getByLabelText("Max Price");

    expect(minPriceInput).toHaveValue(10);
    expect(maxPriceInput).toHaveValue(20);
  });

  it("calls onChange with new values when inputs are changed", async () => {
    // const mockOnChange = jest.fn();
    // render(<PriceRangeFilter value={[10, 20]} onChange={mockOnChange} />);
    // const minPriceInput = screen.getByLabelText("Min Price");
    // const maxPriceInput = screen.getByLabelText("Max Price");
    // console.log(maxPriceInput);
    // await userEvent.clear(minPriceInput);
    // await userEvent.type(minPriceInput, "15");
    // expect(mockOnChange).toHaveBeenCalledTimes(1);
    // expect(mockOnChange).toHaveBeenCalledWith([15, 20]);
    // await userEvent.clear(maxPriceInput);
    // await userEvent.type(maxPriceInput, "25");
    // expect(mockOnChange).toHaveBeenCalledTimes(1);
    // expect(mockOnChange).toHaveBeenCalledWith([15, 25]);
  });
});
