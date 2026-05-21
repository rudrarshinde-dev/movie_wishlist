import React, { useRef, useEffect } from 'react';
import { RiSearchLine, RiCloseLine, RiLoaderLine } from 'react-icons/ri';
import { posterUrl } from '../utils/tmdb';
import { useWishlist } from '../context/WishlistContext';

export default function SearchBar({ query, results, loading, onChange, onClear, onSelect }) {
  const inputRef = useRef(null);
  const { isInWishlist } = useWishlist();
  const open = query.length > 0;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="relative w-full max-w-xl">
      {/* Input */}
      <div className={`
        flex items-center gap-2.5 px-4 h-11 rounded-xl border transition-all duration-200
        dark:bg-cinema-surface dark:border-cinema-border dark:text-cinema-text
        bg-light-surface border-light-border text-light-text
        ${open
          ? 'dark:border-cinema-amber/50 border-light-text/30 rounded-b-none'
          : 'dark:hover:border-cinema-border/80'
        }
      `}>
        {loading
          ? <RiLoaderLine className="w-4 h-4 shrink-0 dark:text-cinema-muted text-light-text-soft animate-spin" />
          : <RiSearchLine className="w-4 h-4 shrink-0 dark:text-cinema-muted text-light-text-soft" />
        }
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search movies…"
          className="
            flex-1 bg-transparent outline-none text-sm font-body
            dark:text-cinema-text dark:placeholder-cinema-muted
            text-light-text placeholder-light-text-soft
          "
        />
        {query && (
          <button
            onClick={onClear}
            className="dark:text-cinema-muted text-light-text-soft dark:hover:text-cinema-text hover:text-light-text transition-colors"
          >
            <RiCloseLine className="w-4 h-4" />
          </button>
        )}
        {!open && (
          <kbd className="hidden sm:flex items-center px-1.5 h-5 rounded text-[10px] font-mono border dark:border-cinema-border dark:text-cinema-muted border-light-border text-light-text-soft">/</kbd>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="
          absolute top-full left-0 right-0 z-50 max-h-[60vh] overflow-y-auto
          border border-t-0 rounded-b-xl
          dark:bg-cinema-surface dark:border-cinema-border
          bg-light-surface border-light-border
          shadow-card
        ">
          {results.length === 0 && !loading && (
            <div className="px-4 py-6 text-center text-sm dark:text-cinema-muted text-light-text-soft">
              No results for "{query}"
            </div>
          )}
          {results.map((movie) => {
            const saved = isInWishlist(movie.id);
            const poster = posterUrl(movie.poster_path, 'w92');
            return (
              <button
                key={movie.id}
                onClick={() => onSelect(movie)}
                className="
                  w-full flex items-center gap-3 px-4 py-3 text-left
                  transition-colors duration-150
                  dark:hover:bg-cinema-card hover:bg-light-bg
                  border-b last:border-b-0 dark:border-cinema-border border-light-border
                "
              >
                {/* Poster thumb */}
                <div className="w-8 h-12 shrink-0 rounded overflow-hidden dark:bg-cinema-border bg-light-border">
                  {poster
                    ? <img src={poster} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-[10px] dark:text-cinema-muted text-light-text-soft">?</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate dark:text-cinema-text text-light-text">{movie.title}</p>
                  <p className="text-xs dark:text-cinema-muted text-light-text-soft">
                    {movie.release_date?.slice(0, 4)} &nbsp;·&nbsp; ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </div>
                {saved && (
                  <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full dark:bg-cinema-amber/15 dark:text-cinema-amber bg-amber-100 text-amber-700">
                    Saved
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}