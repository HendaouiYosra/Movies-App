import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { useState } from "react";
import StarRating from "./StarRating";
function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" onSetRating={setMovieRating} />
      <p>this movie was rated {movieRating} stars</p>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
