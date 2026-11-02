import React, { useState } from "react";
import StarRating from "./StarRating";

/**
 * MovieForm
 * A form for adding a new movie: title, year, rating, and a review comment.
 */
export default function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Give the movie a title before adding it.");
      return;
    }

    onAddMovie({
      id: crypto.randomUUID(),
      title: title.trim(),
      year: year.trim(),
      rating,
      comment: comment.trim(),
      watchedOn: new Date().toISOString(),
    });

    setTitle("");
    setYear("");
    setRating(0);
    setComment("");
    setError("");
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="movie-form__row">
        <div className="field field--grow">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Paddington 2"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
          />
        </div>
        <div className="field field--narrow">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="text"
            inputMode="numeric"
            placeholder="2017"
            maxLength={4}
            value={year}
            onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
      </div>

      <div className="field">
        <label>Your rating</label>
        <StarRating rating={rating} onChange={setRating} size="lg" />
      </div>

      <div className="field">
        <label htmlFor="comment">Review</label>
        <textarea
          id="comment"
          placeholder="What did you think?"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn btn--primary">
        Add to watchlist
      </button>
    </form>
  );
}
