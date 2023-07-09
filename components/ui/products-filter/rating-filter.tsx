import React, { FC } from "react";
import { Star } from "lucide-react";
import LoadingSpinner from "../spinner";

const RatingFilter: FC<{
  value: number;
  onChange: (stars: number) => void;
}> = ({ value, onChange }) => {
  const [isPending, startTransition] = React.useTransition();

  function isStarActive(star: number, value: number) {
    return value && star <= value;
  }

  const handleOnClick = (star: number) => {
    startTransition(() => {
      onChange(star);
    });
  };

  return (
    <div>
      <label
        htmlFor="rating"
        className="block text-sm font-medium text-gray-700"
      >
        Rating
      </label>
      <div
        className="flex gap-1 mt-3"
        role="radiogroup"
        aria-labelledby="rating"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleOnClick(star)}
            className={`text-lg cursor-pointer ${
              isStarActive(star, value) ? "text-yellow-500" : "text-gray-300"
            }`}
            role="radio"
            data-testid={`rating-${star}`}
            aria-checked={isStarActive(star, value) ? true : false}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
          >
            <Star
              className={
                isStarActive(star, value) ? "fill-current text-yellow-500" : ""
              }
            />
          </button>
        ))}
        {isPending && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default RatingFilter;
