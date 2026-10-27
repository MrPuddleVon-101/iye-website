'use client';

import { useRef } from 'react';
import type { TeamMember } from '@/content/schema';
import { asset } from '@/lib/asset';

/** A bust on a disc that tilts toward the pointer. The face links to LinkedIn. */
export function TeamCard({ m, i }: { m: TeamMember; i: number }) {
  const ref = useRef<HTMLLIElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tx', String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty('--ty', String((e.clientY - r.top) / r.height - 0.5));
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--tx', '0');
    ref.current?.style.setProperty('--ty', '0');
  };

  const face = (
    <span className="member__stage">
      <span className="member__disc" aria-hidden />
      {m.photo && <img src={asset(m.photo)} alt="" loading="lazy" width={800} height={820} />}
    </span>
  );

  return (
    <li ref={ref} className="member" style={{ ['--i' as string]: i }} data-reveal onPointerMove={onMove} onPointerLeave={onLeave}>
      {m.linkedin ? (
        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="member__link" data-cursor="LinkedIn" aria-label={`${m.name} on LinkedIn (opens in a new tab)`}>
          {face}
        </a>
      ) : (
        <span className="member__link" aria-hidden>
          {face}
        </span>
      )}
      <p className="member__name">{m.name}</p>
      {m.role && <p className="member__role">{m.role}</p>}
      {m.linkedin && (
        <a className="member__in" href={m.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
          LinkedIn <span aria-hidden>↗</span>
        </a>
      )}
    </li>
  );
}
