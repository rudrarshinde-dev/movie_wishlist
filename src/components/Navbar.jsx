import React from 'react';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { useWishlist } from '../context/WishlistContext';
import { useSearch } from '../hooks/useTMDB';

export default function Navbar({ onMovieSelect, wishlistOpen, onWishlistToggle }) {
  const { wishlist } = useWishlist();
  const { query, results, loading, handleQueryChange, clear } = useSearch();

  const handleSelect = (movie) => {
    clear();
    onMovieSelect(movie.id);
  };

  return (
    <header className="
      sticky top-0 z-40 w-full h-16
      dark:glass-dark glass-light
      border-b dark:border-cinema-border border-light-border
    ">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="shrink-0 flex items-center gap-2 group">
          <span className="text-xl leading-none">🎬</span>
          <span className="hidden sm:block font-display text-lg dark:text-cinema-text text-light-text tracking-tight">
            Cine<span className="dark:text-cinema-amber text-amber-600">List</span>
          </span>
        </a>

        {/* Search */}
        <div className="flex-1 flex justify-center">
          <SearchBar
            query={query}
            results={results}
            loading={loading}
            onChange={handleQueryChange}
            onClear={clear}
            onSelect={handleSelect}
          />
        </div>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-1">
          <ThemeToggle />

          {/* Wishlist button */}
          <button
            onClick={onWishlistToggle}
            aria-label="Toggle wishlist"
            className="
              relative flex items-center gap-2 px-3 h-9 rounded-full transition-all duration-200 font-medium text-sm
              dark:bg-cinema-amber text-cinema-bg hover:dark:bg-cinema-amber-dim
              bg-amber-500 text-white hover:bg-amber-600
            "
          >
            {wishlistOpen
              ? <RiBookmarkFill className="w-4 h-4" />
              : <RiBookmarkLine className="w-4 h-4" />
            }
            <span className="hidden sm:block">List</span>
            {wishlist.length > 0 && (
              <span className="
                flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold
                bg-cinema-bg text-cinema-amber
              ">
                {wishlist.length > 99 ? '99+' : wishlist.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}