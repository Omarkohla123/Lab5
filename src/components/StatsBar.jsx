import React from "react";

/**
 * StatsBar
 * Small summary strip: total movies watched and the average star rating.
 */
export default function StatsBar({ movies }) {
  const total = movies.length;
  const rated = movies.filter((m) => m.rating > 0);
  const average =
    rated.length > 0
      ? (rated.reduce((sum, m) => sum + m.rating, 0) / rated.length).toFixed(1)
      : "—";

  return (
    <div className="stats-bar">
      <div className="stats-bar__item">
        <span className="stats-bar__value">{total}</span>
        <span className="stats-bar__label">{total === 1 ? "movie watched" : "movies watched"}</span>
      </div>
      <div className="stats-bar__divider" aria-hidden="true" />
      <div className="stats-bar__item">
        <span className="stats-bar__value">{average} {average !== "—" && "⭐"}</span>
        <span className="stats-bar__label">average rating</span>
      </div>
    </div>
  );
}
