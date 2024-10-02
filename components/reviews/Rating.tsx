import { FaRegStar, FaStar } from "react-icons/fa";

export default function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className="flex gap-1 items-center">
      {stars.map((star, i) => {
        return star ? (
          <FaStar key={i} className="text-primary w-3 h-3" />
        ) : (
          <FaRegStar key={i} className="text-gray-400 w-3 h-3" />
        );
      })}
    </div>
  );
}
