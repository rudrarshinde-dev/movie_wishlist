import { useState, useEffect, useCallback, useRef } from 'react';

export const useTMDB = (fetcher, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const execute = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line

  useEffect(() => {
    execute();
    return () => abortRef.current?.abort();
  }, [execute]);

  return { data, loading, error, refetch: execute };
};

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const search = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    setError(null);
    try {
      const { searchMovies } = await import('../utils/tmdb.js');
      const data = await searchMovies(q);
      setResults(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQueryChange = useCallback((q) => {
    setQuery(q);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(q), 350);
  }, [search]);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return { query, results, loading, error, handleQueryChange, clear };
};