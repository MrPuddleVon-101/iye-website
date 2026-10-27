'use client';

import { useCallback, useEffect, useState } from 'react';

export type FilterGroup = { key: string; label: string; options: { value: string; label: string }[] };
export type Selection = Record<string, string>;

/**
 * Filter state that lives in the query string, so a filtered view can be
 * shared. Reads the URL after mount: without JavaScript the full list shows.
 */
export function useQueryFilters(keys: string[]) {
  const [sel, setSel] = useState<Selection>({});

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const next: Selection = {};
    keys.forEach((k) => {
      const v = p.get(k);
      if (v) next[k] = v;
    });
    setSel(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((next: Selection) => {
    setSel(next);
    const p = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => v && p.set(k, v));
    const qs = p.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, []);

  return [sel, update] as const;
}

export function FilterBar({ groups, sel, onChange, count, noun }: { groups: FilterGroup[]; sel: Selection; onChange: (s: Selection) => void; count: number; noun: string }) {
  const active = Object.values(sel).filter(Boolean).length;
  return (
    <div className="filters" role="search" aria-label={`Filter ${noun}`}>
      {groups.map((g) => (
        <fieldset key={g.key} className="filters__group">
          <legend>{g.label}</legend>
          <div className="filters__opts">
            <button type="button" aria-pressed={!sel[g.key]} onClick={() => onChange({ ...sel, [g.key]: '' })}>
              All
            </button>
            {g.options.map((o) => (
              <button key={o.value} type="button" aria-pressed={sel[g.key] === o.value} onClick={() => onChange({ ...sel, [g.key]: sel[g.key] === o.value ? '' : o.value })}>
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="filters__status">
        <p aria-live="polite">
          <b>{count}</b> {count === 1 ? noun.replace(/s$/, '') : noun}
        </p>
        {active > 0 && (
          <button type="button" className="filters__clear" onClick={() => onChange({})}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
