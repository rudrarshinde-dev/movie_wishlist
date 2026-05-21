import React, { useEffect } from 'react';
import {
  RiCloseLine, RiBookmarkLine, RiBookmarkFill, RiStarFill,
  RiTimeLine, RiCalendarLine, RiGlobalLine, RiExternalLinkLine,
} from 'react-icons/ri';
import { useTMDB } from '../hooks/useTMDB';
import { getMovieDetails, posterUrl, backdropUrl, formatRuntime, formatDate } from '../utils/tmdb';
import { useWishlist } from '../context/WishlistContext';
import MovieCard from './MovieCard';

export default function MovieModal({ movieId, onClose, onMovieSelect }) {
  const { data: movie, loading } = useTMDB(() => getMovieDetails(movieId), [movieId]);
  const { add, remove, isInWishlist } = useWishlist();
  const saved = movie ? isInWishlist(movie.id) : false;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const handleWishlist = () => {
    if (saved) remove(movie.id);
    else add(movie);
  };

  const trailer = movie?.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="
        relative z-10 w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto
        dark:bg-cinema-surface bg-light-bg
        rounded-t-2xl sm:rounded-2xl
        border dark:border-cinema-border border-light-border
        shadow-[0_24px_80px_rgba(0,0,0,0.8)]
      ">
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center
            bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors
          "
        >
          <RiCloseLine className="w-5 h-5" />
        </button>

        {loading || !movie ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 rounded-full border-2 dark:border-cinema-border border-light-border border-t-cinema-amber animate-spin" />
          </div>
        ) : (
          <>
            {/* Backdrop hero */}
            {movie.backdrop_path && (
              <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={backdropUrl(movie.backdrop_path)}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-cinema-surface from-light-bg via-transparent to-black/30" />
              </div>
            )}

            <div className="px-5 sm:px-7 pb-7 -mt-8 relative">
              <div className="flex gap-4 items-start">
                {/* Poster */}
                <div className="shrink-0 w-24 sm:w-32 rounded-xl overflow-hidden border-2 dark:border-cinema-border border-light-border shadow-card">
                  {movie.poster_path
                    ? <img src={posterUrl(movie.poster_path, 'w342')} alt={movie.title} className="w-full" />
                    : <div className="aspect-[2/3] flex items-center justify-center dark:bg-cinema-card bg-light-surface text-4xl">🎬</div>
                  }
                </div>

                {/* Basic info */}
                <div className="flex-1 min-w-0 pt-2">
                  <h2 className="font-display text-xl sm:text-2xl dark:text-cinema-text text-light-text leading-tight text-balance">
                    {movie.title}
                  </h2>
                  {movie.tagline && (
                    <p className="mt-1 text-sm italic dark:text-cinema-muted text-light-text-soft">{movie.tagline}</p>
                  )}

                  {/* Meta row */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs dark:text-cinema-muted text-light-text-soft">
                    {movie.vote_average > 0 && (
                      <span className="flex items-center gap-1">
                        <RiStarFill className="text-cinema-amber" />
                        <span className="dark:text-cinema-text text-light-text font-medium">{movie.vote_average.toFixed(1)}</span>
                        <span>/ 10 ({movie.vote_count?.toLocaleString()} votes)</span>
                      </span>
                    )}
                    {movie.runtime > 0 && (
                      <span className="flex items-center gap-1">
                        <RiTimeLine /> {formatRuntime(movie.runtime)}
                      </span>
                    )}
                    {movie.release_date && (
                      <span className="flex items-center gap-1">
                        <RiCalendarLine /> {formatDate(movie.release_date)}
                      </span>
                    )}
                    {movie.original_language && (
                      <span className="flex items-center gap-1">
                        <RiGlobalLine /> {movie.original_language.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Genres */}
                  {movie.genres?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {movie.genres.map((g) => (
                        <span key={g.id} className="px-2.5 py-0.5 rounded-full text-xs dark:bg-cinema-border dark:text-cinema-text-soft bg-light-border text-light-text-soft">
                          {g.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-2.5">
                <button
                  onClick={handleWishlist}
                  className={`
                    flex items-center gap-2 px-5 h-10 rounded-xl font-medium text-sm transition-all duration-200
                    ${saved
                      ? 'dark:bg-cinema-amber bg-amber-500 text-cinema-bg shadow-amber'
                      : 'dark:bg-cinema-card dark:text-cinema-text dark:hover:bg-cinema-border bg-light-surface text-light-text hover:bg-light-border'
                    }
                  `}
                >
                  {saved ? <RiBookmarkFill className="w-4 h-4" /> : <RiBookmarkLine className="w-4 h-4" />}
                  {saved ? 'Saved to List' : 'Add to List'}
                </button>

                {trailer && (
                  <a
                    href={`https://youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-2 px-5 h-10 rounded-xl font-medium text-sm
                      dark:bg-cinema-card dark:text-cinema-text dark:hover:bg-cinema-border bg-light-surface text-light-text hover:bg-light-border
                      transition-colors duration-200
                    "
                  >
                    <span>▶ Trailer</span>
                    <RiExternalLinkLine className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )}
              </div>

              {/* Overview */}
              {movie.overview && (
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest dark:text-cinema-muted text-light-text-soft mb-2">Overview</h3>
                  <p className="text-sm leading-relaxed dark:text-cinema-text-soft text-light-text">{movie.overview}</p>
                </div>
              )}

              {/* Cast */}
              {movie.credits?.cast?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest dark:text-cinema-muted text-light-text-soft mb-3">Cast</h3>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                    {movie.credits.cast.slice(0, 10).map((person) => (
                      <div key={person.id} className="shrink-0 text-center w-14">
                        <div className="w-14 h-14 rounded-full overflow-hidden dark:bg-cinema-border bg-light-border mx-auto">
                          {person.profile_path
                            ? <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-xl">👤</div>
                          }
                        </div>
                        <p className="mt-1.5 text-[10px] dark:text-cinema-text-soft text-light-text leading-tight line-clamp-2">{person.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Similar movies */}
              {movie.similar?.results?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest dark:text-cinema-muted text-light-text-soft mb-3">Similar Films</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {movie.similar.results.slice(0, 5).map((m) => (
                      <MovieCard key={m.id} movie={m} onClick={(id) => { onMovieSelect(id); }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}