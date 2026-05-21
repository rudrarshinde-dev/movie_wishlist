const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE = 'https://image.tmdb.org/t/p';

const fetcher = async (path, params = {}) => {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
};

export const getTrending = (timeWindow = 'week') =>
  fetcher(`/trending/movie/${timeWindow}`);

export const searchMovies = (query, page = 1) =>
  fetcher('/search/movie', { query, page, include_adult: false });

export const getMovieDetails = (id) =>
  fetcher(`/movie/${id}`, { append_to_response: 'credits,videos,similar' });

export const getGenres = () => fetcher('/genre/movie/list');

export const discoverMovies = (params = {}) =>
  fetcher('/discover/movie', { sort_by: 'popularity.desc', ...params });

export const getPopular = (page = 1) =>
  fetcher('/movie/popular', { page });

export const getTopRated = (page = 1) =>
  fetcher('/movie/top_rated', { page });

export const getNowPlaying = (page = 1) =>
  fetcher('/movie/now_playing', { page });

export const getUpcoming = (page = 1) =>
  fetcher('/movie/upcoming', { page });

export const posterUrl = (path, size = 'w500') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const backdropUrl = (path, size = 'w1280') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const formatRuntime = (minutes) => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};