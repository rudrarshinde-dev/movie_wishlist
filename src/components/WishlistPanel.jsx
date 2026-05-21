import React, { useState } from 'react';
import {
  RiCloseLine, RiDeleteBinLine, RiCheckLine,
  RiEyeLine, RiBookmarkFill, RiDraggable,
} from 'react-icons/ri';
import { posterUrl } from '../utils/tmdb';
import { useWishlist } from '../context/WishlistContext';

const STATUS_OPTIONS = [
  { value: 'want', label: 'Want', color: 'text-cinema-amber' },
  { value: 'watching', label: 'Watching', color: 'text-blue-400' },
  { value: 'watched', label: 'Watched', color: 'text-green-500' },
];

function WishlistItem({ movie, onRemove, onStatusChange, onSelect }) {
  const poster = posterUrl(movie.poster_path, 'w92');
  const statusOption = STATUS_OPTIONS.find((s) => s.value === movie.status) || STATUS_OPTIONS[0];

  return (
    <div className="
      flex items-center gap-3 px-4 py-3 group
      border-b last:border-b-0 dark:border-cinema-border border-light-border
      dark:hover:bg-cinema-card hover:bg-light-surface transition-colors duration-150
    ">
      {/* Drag handle placeholder */}
      <RiDraggable className="w-4 h-4 shrink-0 dark:text-cinema-border text-light-border group-hover:dark:text-cinema-muted group-hover:text-light-text-soft transition-colors cursor-grab" />

      {/* Poster */}
      <button onClick={() => onSelect(movie.id)} className="shrink-0 w-8 h-12 rounded overflow-hidden dark:bg-cinema-border bg-light-border">
        {poster
          ? <img src={poster} alt={movie.title} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-xs">🎬</div>
        }
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <button onClick={() => onSelect(movie.id)} className="text-left w-full">
          <p className="text-sm font-medium truncate dark:text-cinema-text text-light-text">{movie.title}</p>
          <p className="text-xs dark:text-cinema-muted text-light-text-soft">{movie.release_date?.slice(0, 4)}</p>
        </button>
      </div>

      {/* Status */}
      <div className="shrink-0">
        <select
          value={movie.status}
          onChange={(e) => onStatusChange(movie.id, e.target.value)}
          className={`
            text-xs font-medium bg-transparent outline-none cursor-pointer
            ${statusOption.color}
          `}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value} className="dark:bg-cinema-card bg-white text-gray-700">
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(movie.id)}
        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 dark:hover:bg-cinema-border hover:bg-light-border dark:text-cinema-muted text-light-text-soft hover:text-red-500 transition-all"
      >
        <RiDeleteBinLine className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function WishlistPanel({ open, onClose, onMovieSelect }) {
  const { wishlist, remove, setStatus } = useWishlist();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? wishlist : wishlist.filter((m) => m.status === filter);

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s.value] = wishlist.filter((m) => m.status === s.value).length;
    return acc;
  }, {});

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <aside
        className={`
          fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[380px]
          dark:bg-cinema-surface bg-light-bg
          border-l dark:border-cinema-border border-light-border
          flex flex-col
          shadow-[0_0_60px_rgba(0,0,0,0.6)]
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-cinema-border border-light-border">
          <div className="flex items-center gap-2">
            <RiBookmarkFill className="text-cinema-amber w-4 h-4" />
            <h2 className="font-display text-lg dark:text-cinema-text text-light-text">My List</h2>
            <span className="ml-1 text-xs dark:text-cinema-muted text-light-text-soft">({wishlist.length})</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center dark:hover:bg-cinema-card hover:bg-light-surface dark:text-cinema-muted text-light-text-soft transition-colors"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* Status filter */}
        <div className="flex border-b dark:border-cinema-border border-light-border">
          {[{ value: 'all', label: 'All', count: wishlist.length }, ...STATUS_OPTIONS.map((s) => ({ ...s, count: counts[s.value] }))].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`
                flex-1 py-2.5 text-xs font-medium transition-all duration-150 relative
                ${filter === f.value
                  ? 'dark:text-cinema-amber text-amber-600'
                  : 'dark:text-cinema-muted text-light-text-soft dark:hover:text-cinema-text hover:text-light-text'
                }
              `}
            >
              {f.label}
              {f.count > 0 && <span className="ml-1 opacity-60">({f.count})</span>}
              {filter === f.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 dark:bg-cinema-amber bg-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
              <div className="text-5xl opacity-20">🎬</div>
              <p className="text-sm dark:text-cinema-muted text-light-text-soft">
                {filter === 'all'
                  ? 'Your list is empty.\nSearch for movies and save them here.'
                  : `No movies with "${filter}" status yet.`
                }
              </p>
            </div>
          ) : (
            filtered.map((movie) => (
              <WishlistItem
                key={movie.id}
                movie={movie}
                onRemove={remove}
                onStatusChange={setStatus}
                onSelect={(id) => { onMovieSelect(id); onClose(); }}
              />
            ))
          )}
        </div>

        {/* Footer stats */}
        {wishlist.length > 0 && (
          <div className="border-t dark:border-cinema-border border-light-border px-5 py-3 flex justify-between text-xs dark:text-cinema-muted text-light-text-soft">
            <span className="flex items-center gap-1.5"><RiEyeLine /> {counts.watching} watching</span>
            <span className="flex items-center gap-1.5"><RiCheckLine /> {counts.watched} watched</span>
            <span className="flex items-center gap-1.5"><RiBookmarkFill className="text-cinema-amber" /> {counts.want} to watch</span>
          </div>
        )}
      </aside>
    </>
  );
}