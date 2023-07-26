import { FC } from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  rating?: number;
}

const StarRating: FC<RatingProps> = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);

  const halfStars = Math.ceil(rating) - fullStars;

  const emptyStars = 5 - fullStars - halfStars;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        size={19}
        className={"fill-current text-yellow-500"}
        key={`full_${i}`}
        data-testid="full-star"
      />
    );
  }

  for (let i = 0; i < halfStars; i++) {
    stars.push(
      <StarHalf
        size={19}
        className={"fill-current text-yellow-500"}
        key={`half_${i}`}
        style={{ transform: "scaleX(1)" }}
        data-testid="half-star"
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star size={19} data-testid="empty-star" key={i} />);
  }

  return (
    <div className="flex">
      <span className="pr-2 text-lg font-semibold text-red-500">{rating}</span>
      <span className="flex pt-1 text-gray-300">{stars}</span>
    </div>
  );
};

export default StarRating;
