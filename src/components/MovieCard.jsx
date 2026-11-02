import React, { useState } from "react";
import StarRating from "./StarRating";

/**
 * MovieCard
 * Shows one movie's title, year, star rating, and review comment.
 * Supports inline editing of the rating and comment, and removal.
 */
export default function MovieCard({ movie, onRemove, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftComment, setDraftComment] = useState(movie.comment);
  const [draftRating, setDraftRating] = useState(movie.rating);

  const watchedDate = new Date(movie.watchedOn).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const saveEdits = () => {
    onUpdate(movie.id, { comment: draftComment.trim(), rating: draftRating });
    setIsEditing(false);
  };

  const cancelEdits = () => {
    setDraftComment(movie.comment);
    setDraftRating(movie.rating);
    setIsEditing(false);
  };

  return (
    <li className="movie-card">
      <div className="movie-card__accent" aria-hidden="true" />
      <div className="movie-card__body">
        <div className="movie-card__header">
          <div>
            <h3 className="movie-card__title">
              {movie.title}
              {movie.year && <span className="movie-card__year"> ({movie.year})</span>}
            </h3>
            <p className="movie-card__meta">Watched {watchedDate}</p>
          </div>
          <div className="movie-card__actions">
            {!isEditing && (
              <button
                type="button"
                className="btn btn--ghost btn--small"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            <button
              type="button"
              className="btn btn--danger btn--small"
              onClick={() => onRemove(movie.id)}
            >
              Remove
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="movie-card__edit">
            <StarRating rating={draftRating} onChange={setDraftRating} size="md" />
            <textarea
              rows={3}
              value={draftComment}
              onChange={(e) => setDraftComment(e.target.value)}
              placeholder="What did you think?"
            />
            <div className="movie-card__edit-actions">
              <button type="button" className="btn btn--primary btn--small" onClick={saveEdits}>
                Save
              </button>
              <button type="button" className="btn btn--ghost btn--small" onClick={cancelEdits}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <StarRating rating={movie.rating} size="md" />
            {movie.comment ? (
              <p className="movie-card__comment">“{movie.comment}”</p>
            ) : (
              <p className="movie-card__comment movie-card__comment--empty">No review written yet.</p>
            )}
          </>
        )}
      </div>
    </li>
  );
}
