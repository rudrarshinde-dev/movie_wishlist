# 🎬 CineList — Movie Wishlist App

A modern, minimal movie wishlist app built with React, Tailwind CSS, and the TMDB API. Browse trending films, search any movie, and track what you want to watch — all in a clean cinema-inspired interface.

---

## ✨ Features

- **Browse Movies** — Trending, Popular, Top Rated, Now Playing, Upcoming
- **Genre Filter** — Filter any category by genre
- **Live Search** — Debounced search with poster previews in dropdown
- **Movie Details** — Full modal with backdrop, cast, trailer link, and similar films
- **Wishlist** — Save movies with a slide-in panel, persisted to localStorage
- **Status Tracking** — Mark each movie as *Want to Watch*, *Watching*, or *Watched*
- **Light / Dark Mode** — Toggles with system preference detection
- **Keyboard Shortcut** — Press `/` to instantly focus the search bar
- **Responsive** — Works on mobile, tablet, and desktop

---

## 🖥️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Dev server & bundler |
| Tailwind CSS 3 | Styling |
| TMDB API | Movie data |
| react-icons | Icon library |
| framer-motion | Animations |
| localStorage | Wishlist persistence |

---

## 🚀 Getting Started

### 1. Clone or download the project

```bash
git clone https://github.com/yourusername/movie-wishlist.git
cd movie-wishlist
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a TMDB API Key

1. Go to [themoviedb.org](https://www.themoviedb.org/signup) and create a free account
2. Navigate to **Settings → API → Create → Developer**
3. Fill in the form (use `http://localhost:5173` as the app URL)
4. Copy your **API Key (v3 auth)**

### 4. Set up environment variable

Create a `.env` file in the project root:

```
VITE_TMDB_API_KEY=your_api_key_here
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
movie-wishlist/
├── index.html
├── .env
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── App.jsx               # Root component, layout
    ├── main.jsx              # React entry point
    ├── index.css             # Global styles + Tailwind
    ├── components/
    │   ├── Navbar.jsx        # Top bar with search & wishlist button
    │   ├── SearchBar.jsx     # Live search with dropdown results
    │   ├── MovieCard.jsx     # Grid card with wishlist toggle
    │   ├── MovieModal.jsx    # Full detail modal
    │   ├── WishlistPanel.jsx # Slide-in wishlist drawer
    │   ├── GenreFilter.jsx   # Tab + genre pill filters
    │   └── ThemeToggle.jsx   # Light/dark toggle button
    ├── context/
    │   ├── ThemeContext.jsx  # Dark mode state & toggle
    │   └── WishlistContext.jsx # Wishlist state & localStorage sync
    ├── hooks/
    │   └── useTMDB.js        # Data fetching & search hooks
    └── utils/
        └── tmdb.js           # TMDB API functions & helpers
```

---

## 🎨 Design Decisions

- **Cinema palette** — Deep charcoal backgrounds with warm amber accents, inspired by a movie projector glow
- **Minimal chrome** — Low cognitive load; content takes center stage
- **Persistent wishlist counter** — Creates a satisfying collection loop
- **Slide-over panel** — Wishlist stays accessible without leaving the browse context
- **Status tracking** — Adds meaning to the list beyond just saving

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy to Vercel, Netlify, or any static host.

---

## 🌐 Deploying to Vercel (Recommended)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add environment variable: `VITE_TMDB_API_KEY` = your key
4. Click **Deploy**

---

## 📝 License

MIT — free to use, modify, and distribute.

---

> Built with ❤️ using React + TMDB API
