import { useEffect, useState, useCallback } from "react";

export default function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });
  const [tick, setTick] = useState(0);
  const retry = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });
    fetcher()
      .then((data) => {
        if (cancelled) return;
        const empty = Array.isArray(data) && data.length === 0;
        setState({ status: empty ? "empty" : "ready", data, error: null });
      })
      .catch((e) => {
        if (!cancelled) setState({ status: "error", data: null, error: e.message });
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { ...state, retry };
}
