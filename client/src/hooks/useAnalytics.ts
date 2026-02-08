import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import type { Analytics } from "../types/analytics";

export const useAnalytics = () => {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/analytics")
      .then(setData)
      .catch(() => setError("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
