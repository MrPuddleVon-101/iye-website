'use client';

import { useEffect, useRef, useState } from 'react';
import { programmes } from '@/content/programmes';
import { photos, type PhotoKey } from '@/content/sessions';
import { asset } from '@/lib/asset';

/**
 * A sticky photo frame beside the programme list. As each programme reaches
 * the reading line, its photo wipes up over the last one. On phones the
 * photos sit inline instead.
 */
export function ProgrammeScroller() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[data-i]') ?? []);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="progs">
      <div className="progs__frame" aria-hidden>
        {programmes.map((p, i) => {
          const ph = photos[(p.photo ?? 'goals') as PhotoKey];
          return (
            <img key={p.slug} src={asset(ph.src)} alt="" style={{ objectPosition: ph.focal }} data-state={i === active ? 'on' : i < active ? 'past' : 'next'} />
          );
        })}
        <span className="progs__count">
          <b key={active}>{active + 1}</b> / {programmes.length}
        </span>
      </div>

      <div className="progs__list" ref={listRef}>
        {programmes.map((p, i) => {
          const ph = photos[(p.photo ?? 'goals') as PhotoKey];
          return (
            <article className={`prog${i === active ? ' is-active' : ''}`} key={p.slug} id={p.slug} data-i={i}>
              <img className="prog__inline" src={asset(ph.src)} alt={ph.alt} loading="lazy" style={{ objectPosition: ph.focal }} />
              <p className="prog__status">
                <i aria-hidden data-status={p.status} />
                {p.status === 'planned' ? 'Coming up' : 'Running now'} · {p.format}
              </p>
              <h2>{p.title}</h2>
              <p className="prog__sum">{p.summary}</p>
              <ul className="prog__points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <p className="prog__aud">For: {p.audience}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
