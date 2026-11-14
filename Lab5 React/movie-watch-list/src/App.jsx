import { useState } from "react";
import {  } from "module";
import "./App.css";
function App() {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");

  function addMovie() {
    if (name.trim() === "") return;

    const movie = {
      id: Date.now(),
      name: name,
      review: "",
      rating: 0
    };

    setMovies([...movies, movie]);
    setName("");
  }

  function removeMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  function updateReview(id, review) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, review: review } : movie
      )
    );
  }

  function updateRating(id, rating) {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, rating: Number(rating) } : movie
      )
    );
  }

  return (
    <div className="app">
      <h1>🎬 My Movie Watch List</h1>
      <p>Save your movies and rate them!</p>

      <div className="add-movie">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter movie name"
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      {movies.length === 0 && <p>No movies added yet.</p>}

      {movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <h2>{movie.name}</h2>

          <button onClick={() => removeMovie(movie.id)}>
            Remove
          </button>

          <p>Choose your rating:</p>

          <select
            value={movie.rating}
            onChange={(e) => updateRating(movie.id, e.target.value)}
          >
            <option value="0">Select rating</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>

          <p className="stars">
            {movie.rating === 0
              ? "No rating yet"
              : "⭐".repeat(movie.rating) +
                "☆".repeat(5 - movie.rating)}
          </p>

          <label>Comment / Review:</label>

          <textarea
            value={movie.review}
            onChange={(e) => updateReview(movie.id, e.target.value)}
            placeholder="Write your review..."
            rows="3"
          />
        </div>
      ))}
    </div>
  );
}

export default App;