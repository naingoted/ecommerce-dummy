import { render, screen } from "@testing-library/react";
import StarRating from "@/components/ui/star-rating";

describe("StarRating", () => {
  it("renders 4 and a half star", async () => {
    render(<StarRating rating={4.69} />);

    const fullStars = screen.queryAllByTestId("full-star");
    const halfStars = screen.queryAllByTestId("half-star");
    const emptyStars = screen.queryAllByTestId("empty-star");

    // Check that the correct number of each type of star is rendered
    expect(fullStars).toHaveLength(4);
    expect(halfStars).toHaveLength(1);
    expect(emptyStars).toHaveLength(0);
  });

  it("renders 4 and a half star", async () => {
    render(<StarRating rating={4.1} />);

    const fullStars = screen.queryAllByTestId("full-star");
    const halfStars = screen.queryAllByTestId("half-star");
    const emptyStars = screen.queryAllByTestId("empty-star");

    // Check that the correct number of each type of star is rendered
    expect(fullStars).toHaveLength(4);
    expect(halfStars).toHaveLength(1);
    expect(emptyStars).toHaveLength(0);
  });

  it("renders 3 and a half star", async () => {
    render(<StarRating rating={3.9} />);

    const fullStars = screen.queryAllByTestId("full-star");
    const halfStars = screen.queryAllByTestId("half-star");
    const emptyStars = screen.queryAllByTestId("empty-star");

    // Check that the correct number of each type of star is rendered
    expect(fullStars).toHaveLength(3);
    expect(halfStars).toHaveLength(1);
    expect(emptyStars).toHaveLength(1);
  });
});
