import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RatingFilter from "@/components/ui/products-filter/rating-filter";

describe("RatingFilter", () => {
  it("renders with default value and options", () => {
    render(<RatingFilter value={3} onChange={jest.fn()} />);
    const starButtons = screen.getAllByTestId(/^rating-\d+$/);
    expect(starButtons).toHaveLength(5);

    expect(starButtons[2]).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange with the selected star value", async () => {
    const mockOnChange = jest.fn();
    render(<RatingFilter value={3} onChange={mockOnChange} />);

    const starButtons = screen.getAllByTestId(/^rating-\d+$/);
    await userEvent.click(starButtons[1]);
    expect(mockOnChange).toHaveBeenCalledWith(2);

    await userEvent.click(starButtons[4]);
    expect(mockOnChange).toHaveBeenCalledWith(5);
  });
});
