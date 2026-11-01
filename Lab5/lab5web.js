let movies = [];
let rating = 0;
let nextId = 1;

// Load saved movies from the browser
try {
  const saved = localStorage.getItem("movies");
  if (saved) {
    movies = JSON.parse(saved) || [];
    nextId = movies.reduce((max, m) => Math.max(max, m.id), 0) + 1;
  }
} catch (e) {}

function save() {
  try { localStorage.setItem("movies", JSON.stringify(movies)); } catch (e) {}
}

const pick = document.getElementById("pick");
const list = document.getElementById("list");

// Star picker (1 to 5)
function drawPicker() {
  pick.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = "★";
    b.className = i <= rating ? "on" : "";
    b.setAttribute("role", "radio");
    b.setAttribute("aria-checked", i === rating);
    b.setAttribute("aria-label", i + " star" + (i > 1 ? "s" : ""));
    b.onclick = () => {
      rating = (rating === i ? 0 : i); // click again to clear
      drawPicker();
    };
    pick.appendChild(b);
  }
}

// Prevent HTML injection from user text
function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

// Show the list, with ⭐ emojis for the rating
function render() {
  if (!movies.length) {
    list.innerHTML = '<div class="empty">No movies yet. Add the first one you’ve watched.</div>';
    return;
  }
  list.innerHTML = movies.map(m => `
    <article class="item">
      <div class="top">
        <h2>${esc(m.title)}</h2>
        <div class="rate" aria-label="${m.rating} out of 5 stars">
          ${m.rating ? "⭐".repeat(m.rating) : "—"}<small>${m.rating}/5</small>
        </div>
      </div>
      ${m.review ? `<p class="review">“${esc(m.review)}”</p>` : ""}
      <button class="rm" data-id="${m.id}">Remove</button>
    </article>`).join("");
}

// Add a movie
document.getElementById("f").onsubmit = e => {
  e.preventDefault();
  const title = document.getElementById("t");
  const review = document.getElementById("r");
  if (!title.value.trim()) return;

  movies.unshift({
    id: nextId++,
    title: title.value.trim(),
    review: review.value.trim(),
    rating: rating
  });

  save();
  title.value = "";
  review.value = "";
  rating = 0;
  drawPicker();
  render();
};

// Remove a movie
list.onclick = e => {
  const btn = e.target.closest(".rm");
  if (!btn) return;
  movies = movies.filter(m => m.id !== Number(btn.dataset.id));
  save();
  render();
};

drawPicker();
render();