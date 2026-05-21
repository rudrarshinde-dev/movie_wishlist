import React, { useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import WishlistPanel from './components/WishlistPanel';
import GenreFilter from './components/GenreFilter';
import { useTMDB } from './hooks/useTMDB';
import {
  getTrending, getPopular, getTopRated,
  getNowPlaying, getUpcoming, discoverMovies,
} from './utils/tmdb';

const TAB_FETCHERS = {
  trending: () => getTrending('week'),
  popular: () => getPopular(),
  top_rated: () => getTopRated(),
  now_playing: () => getNowPlaying(),
  upcoming: () => getUpcoming(),
};

function MovieGrid({ tab, genre, onMovieSelect }) {
  const fetcher = useCallback(() => {
    if (genre) return discoverMovies({ with_genres: genre });
    return (TAB_FETCHERS[tab] || TAB_FETCHERS.trending)();
  }, [tab, genre]);

  const { data, loading, error } = useTMDB(fetcher, [tab, genre]);
  const movies = data?.results || [];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center gap-3">
        <span className="text-4xl">⚠️</span>
        <p className="text-sm dark:text-cinema-muted text-light-text-soft max-w-xs">
          {error.includes('401') || error.includes('401')
            ? 'Invalid API key. Please set VITE_TMDB_API_KEY in your .env file.'
            : error
          }
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden dark:bg-cinema-card bg-light-card border dark:border-cinema-border border-light-border"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="aspect-[2/3] dark:bg-cinema-border bg-light-border animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-3 rounded dark:bg-cinema-border bg-light-border animate-pulse" />
              <div className="h-2.5 w-1/2 rounded dark:bg-cinema-border bg-light-border animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie, i) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieSelect}
          style={{ animationDelay: `${i * 30}ms` }}
        />
      ))}
    </div>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('trending');
  const [activeGenre, setActiveGenre] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveGenre(null);
  };

  const handleGenreChange = (genreId) => {
    setActiveGenre(genreId);
  };

  const tabLabel = activeTab.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen dark:bg-cinema-bg bg-light-bg transition-colors duration-300">
      <Navbar
        onMovieSelect={setSelectedMovieId}
        wishlistOpen={wishlistOpen}
        onWishlistToggle={() => setWishlistOpen((o) => !o)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Filters */}
        <GenreFilter
          activeTab={activeTab}
          activeGenre={activeGenre}
          onTabChange={handleTabChange}
          onGenreChange={handleGenreChange}
        />

        {/* Section heading */}
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-2xl dark:text-cinema-text text-light-text">
            {activeGenre ? 'Filtered' : tabLabel}
          </h1>
          <div className="flex-1 h-px dark:bg-cinema-border bg-light-border" />
        </div>

        {/* Grid */}
        <MovieGrid
          tab={activeTab}
          genre={activeGenre}
          onMovieSelect={setSelectedMovieId}
        />
      </main>

      {/* Modal */}
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          onMovieSelect={setSelectedMovieId}
        />
      )}

      {/* Wishlist panel */}
      <WishlistPanel
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onMovieSelect={setSelectedMovieId}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </ThemeProvider>
  );
}