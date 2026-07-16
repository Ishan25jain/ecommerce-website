import { useState, useEffect } from 'react';

const DEFAULT_TTL = 1000 * 60 * 60; // 1 hour

/**
 * Fetches `url` and caches the result in localStorage under `cacheKey`.
 *
 * On mount, if a cached value exists and is younger than `ttl`, it's used
 * immediately as the initial state (synchronous, no network wait) — so
 * `loading` starts `false` and nothing needs to spin. A fresh request is
 * still made in the background to keep the cache current for next time;
 * the UI just doesn't block on it when we already have something to show.
 *
 * Only a genuinely first-ever visit (empty/expired cache) waits on the
 * network and shows a loading state, since there's nothing else to show.
 */
export function useCachedFetch(cacheKey, url, ttl = DEFAULT_TTL) {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;
      const { value, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > ttl) return null;
      return value;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(data === null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((fresh) => {
        setData(fresh);
        setLoading(false);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ value: fresh, timestamp: Date.now() })
          );
        } catch {
          // Caching is a nice-to-have — if localStorage is full/unavailable,
          // just carry on without it rather than breaking the page.
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, cacheKey]);

  return { data, loading, error };
}
