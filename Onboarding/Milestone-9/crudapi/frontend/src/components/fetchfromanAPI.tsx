import { useEffect, useState } from 'react';

type HnItem = {
  id: number;
  by?: string;
  title?: string;
  url?: string;
  score?: number;
  time?: number; // Unix seconds
  type?: string;
  descendants?: number;
};

interface Props {
  itemId?: number;
}

export default function HnItem({ itemId = 8863 }: Props) {
  const [data, setData] = useState<HnItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`,
          { signal: ctrl.signal },
        );
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json: HnItem = await res.json();
        setData(json);
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          setError(e.message || 'Failed to fetch');
        }
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => ctrl.abort();
  }, [itemId]);

  if (loading) return <div className="p-4">Loading…</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!data) return <div className="p-4">No data</div>;

  const when = data.time ? new Date(data.time * 1000).toLocaleString() : '—';

  return (
    <article className="max-w-xl p-4 rounded-2xl shadow border">
      <header className="mb-2">
        <h2 className="text-xl font-semibold">
          {data.url ? (
            <a href={data.url} target="_blank" rel="noreferrer">
              {data.title ?? `Item ${data.id}`}
            </a>
          ) : (
            (data.title ?? `Item ${data.id}`)
          )}
        </h2>
      </header>

      <ul className="text-sm opacity-80 space-y-1">
        <li>
          <strong>ID:</strong> {data.id}
        </li>
        <li>
          <strong>Type:</strong> {data.type ?? 'unknown'}
        </li>
        <li>
          <strong>By:</strong> {data.by ?? 'unknown'}
        </li>
        <li>
          <strong>Score:</strong> {data.score ?? 0}
        </li>
        <li>
          <strong>Comments:</strong> {data.descendants ?? 0}
        </li>
        <li>
          <strong>Time:</strong> {when}
        </li>
      </ul>
    </article>
  );
}
