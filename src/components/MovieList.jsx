import React from "react";
import MovieCard from "./MovieCard";

/**
 * MovieList
 * Renders the list of watched movies, or an empty state if there are none.
 */
export default function MovieList({ movies, onRemove, onUpdate }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon" aria-hidden="true">🎬</span>
        <p>Your watchlist is empty.</p>
        <p className="empty-state__sub">Add a movie you've watched to get started.</p>
      </div>
    );
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onRemove={onRemove} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}
