import React, { useState } from 'react';
import { RiBookmarkLine, RiBookmarkFill, RiStarFill } from 'react-icons/ri';
import { posterUrl } from '../utils/tmdb';
import { useWishlist } from '../context/WishlistContext';

export default function MovieCard({ movie, onClick, style }) {
  const { add, remove, isInWishlist } = useWishlist();
  const [imgLoaded, setImgLoaded] = useState(false);
  const saved = isInWishlist(movie.id);
  const poster = posterUrl(movie.poster_path, 'w500');
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average?.toFixed(1);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (saved) {
      remove(movie.id);
    } else {
      add(movie);
    }
  };

  return (
    <div
      onClick={() => onClick(movie.id)}
      style={style}
      className="
        group relative cursor-pointer rounded-xl overflow-hidden
        dark:bg-cinema-card bg-light-card
        border dark:border-cinema-border border-light-border
        shadow-card hover:shadow-card-hover
        transition-all duration-300 hover:-translate-y-1
        animate-fade-up
      "
    >
      {/* Poster */}
      <div className="aspect-[2/3] relative overflow-hidden dark:bg-cinema-border bg-light-border">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 dark:border-cinema-border border-light-border border-t-cinema-amber animate-spin" />
          </div>
        )}
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl dark:text-cinema-border text-light-border">
            🎬
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm">
            <RiStarFill className="w-3 h-3 text-cinema-amber" />
            <span className="text-[11px] font-medium text-white">{rating}</span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`
            absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200
            ${saved
              ? 'bg-cinema-amber text-cinema-bg shadow-amber scale-100'
              : 'bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 hover:bg-cinema-amber hover:text-cinema-bg scale-90 group-hover:scale-100'
            }
          `}
        >
          {saved
            ? <RiBookmarkFill className="w-4 h-4" />
            : <RiBookmarkLine className="w-4 h-4" />
          }
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium leading-tight truncate dark:text-cinema-text text-light-text">
          {movie.title}
        </p>
        <p className="mt-0.5 text-xs dark:text-cinema-muted text-light-text-soft">
          {year || '—'}
        </p>
      </div>
    </div>
  );
}