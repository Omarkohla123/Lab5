import React, { useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import StatsBar from "./components/StatsBar";
import "./App.css";

const SEED_MOVIES = [
  {
    id: crypto.randomUUID(),
    title: "Paddington 2",
    year: "2017",
    rating: 5,
    comment: "Pure joy from start to finish. Hugh Grant steals every scene.",
    watchedOn: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Arrival",
    year: "2016",
    rating: 4,
    comment: "Slow burn but the ending recontextualizes everything.",
    watchedOn: new Date(Date.now() - 86400000 * 11).toISOString(),
  },
];

export default function App() {
  const [movies, setMovies] = useState(SEED_MOVIES);

  const addMovie = (movie) => {
    setMovies((prev) => [movie, ...prev]);
  };

  const removeMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMovie = (id, updates) => {
    setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">Your personal</p>
        <h1 className="app__title">Movie Watchlist</h1>
        <p className="app__subtitle">Keep a record of what you've watched, rated, and thought about it.</p>
      </header>

      <main className="app__main">
        <section className="app__panel app__panel--form">
          <h2 className="panel-heading">Add a movie</h2>
          <MovieForm onAddMovie={addMovie} />
        </section>

        <section className="app__panel app__panel--list">
          <div className="panel-heading-row">
            <h2 className="panel-heading">Watched</h2>
          </div>
          <StatsBar movies={movies} />
          <MovieList movies={movies} onRemove={removeMovie} onUpdate={updateMovie} />
        </section>
      </main>
    </div>
  );
}
