import React from 'react';
import { useTMDB } from '../hooks/useTMDB';
import { getGenres } from '../utils/tmdb';

const TABS = [
  { id: 'trending', label: 'Trending' },
  { id: 'popular', label: 'Popular' },
  { id: 'top_rated', label: 'Top Rated' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'now_playing', label: 'Now Playing' },
];

export default function GenreFilter({ activeTab, activeGenre, onTabChange, onGenreChange }) {
  const { data } = useTMDB(getGenres, []);

  return (
    <div className="space-y-3">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              shrink-0 px-4 h-9 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'dark:bg-cinema-amber bg-amber-500 text-cinema-bg shadow-amber'
                : 'dark:bg-cinema-surface dark:text-cinema-text-soft dark:hover:bg-cinema-card dark:hover:text-cinema-text bg-light-surface text-light-text-soft hover:bg-light-border hover:text-light-text'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Genre Pills */}
      {data?.genres && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => onGenreChange(null)}
            className={`
              shrink-0 px-3 h-7 rounded-full text-xs font-medium transition-all duration-200
              ${!activeGenre
                ? 'dark:bg-cinema-border dark:text-cinema-text bg-light-border text-light-text'
                : 'dark:text-cinema-muted dark:hover:text-cinema-text-soft text-light-text-soft hover:text-light-text'
              }
            `}
          >
            All
          </button>
          {data.genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onGenreChange(genre.id === activeGenre ? null : genre.id)}
              className={`
                shrink-0 px-3 h-7 rounded-full text-xs font-medium transition-all duration-200
                ${activeGenre === genre.id
                  ? 'dark:bg-cinema-border dark:text-cinema-text bg-light-border text-light-text'
                  : 'dark:text-cinema-muted dark:hover:text-cinema-text-soft text-light-text-soft hover:text-light-text'
                }
              `}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}