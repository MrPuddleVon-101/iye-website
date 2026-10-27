'use client';

import { useEffect, useRef, useState } from 'react';
import { categoryLabels, effectiveStatus } from '@/content/opportunities';
import type { Opportunity } from '@/content/schema';

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const statusText: Record<Opportunity['status'], string> = {
  open: 'Open now',
  upcoming: 'Next cycle',
  closed: 'Closed',
  evergreen: 'Year-round',
};

/**
 * Competitions as a grid of tiles. Each tile carries a twelve-month strip
 * with its usual window lit, so you can see at a glance what is coming up.
 * Tiles flip in whenever the set changes.
 */
export function CompGrid({ items }: { items: Opportunity[] }) {
  const [now, setNow] = useState<number | null>(null);
  const [flip, setFlip] = useState(0);
  const key = items.map((o) => o.id).join();
  const first = useRef(true);

  useEffect(() => setNow(new Date().getMonth() + 1), []);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setFlip((f) => f + 1);
  }, [key]);

  return (
    <ul className="comps" key={flip} data-reveal>
      {items.map((o, i) => {
        const st = effectiveStatus(o);
        return (
          <li key={o.id} className="comp" data-cat={o.category} data-status={st} style={{ ['--i' as string]: i % 8 }}>
            <a href={o.officialUrl} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
              <span className="comp__top">
                <span className="comp__cat">{categoryLabels[o.category]}</span>
                <span className="comp__status">{statusText[st]}</span>
              </span>
              <span className="comp__title">{o.title}</span>
              <span className="comp__org">{o.organiser}</span>
              <span className="comp__sum">{o.summary}</span>
              <span className="comp__cycle" aria-label={`Usual window: ${o.window}`}>
                {MONTHS.map((m, k) => (
                  <i key={k} data-on={o.months.includes(k + 1)} data-now={now === k + 1} style={{ ['--k' as string]: k }}>
                    {m}
                  </i>
                ))}
              </span>
              <span className="comp__foot">
                <span>{o.deadline && st === 'open' ? `Due ${new Date(o.deadline).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })}` : o.window}</span>
                <span className="comp__go">
                  Official site <span aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </span>
              {o.eligibleRegions?.length ? <span className="comp__region">{o.eligibleRegions.join(', ')}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
