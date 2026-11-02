import React, { useState } from "react";

/**
 * StarRating
 * Displays a 5-star rating using emoji stars.
 * If `onChange` is provided, the stars become clickable/hoverable (interactive picker).
 * If not, it just renders a read-only emoji star display.
 */
export default function StarRating({ rating = 0, onChange, size = "md" }) {
  const [hovered, setHovered] = useState(0);
  const interactive = typeof onChange === "function";
  const displayValue = hovered || rating;

  const sizeClass = size === "lg" ? "star-lg" : size === "sm" ? "star-sm" : "star-md";

  return (
    <div
      className={`star-rating ${interactive ? "star-rating--interactive" : ""}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${rating} out of 5 stars`}
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const filled = starIndex <= displayValue;
        return (
          <span
            key={starIndex}
            className={`star ${sizeClass} ${filled ? "star--filled" : "star--empty"}`}
            onMouseEnter={() => interactive && setHovered(starIndex)}
            onClick={() => interactive && onChange(starIndex === rating ? 0 : starIndex)}
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? starIndex === rating : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={(e) => {
              if (interactive && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onChange(starIndex === rating ? 0 : starIndex);
              }
            }}
          >
            {filled ? "⭐" : "☆"}
          </span>
        );
      })}
    </div>
  );
}
