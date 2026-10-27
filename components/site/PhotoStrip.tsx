'use client';

import { useRef } from 'react';
import { photos, type PhotoKey } from '@/content/sessions';
import { asset } from '@/lib/asset';

/** A row of session photos you can drag sideways (or scroll on touch). */
export function PhotoStrip({ items }: { items: { photo: PhotoKey; caption: string }[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);

  return (
    <ul
      className="strip-photos"
      ref={ref}
      data-cursor="Drag"
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        drag.current = { x: e.clientX, left: ref.current.scrollLeft };
        ref.current.classList.add('is-dragging');
      }}
      onPointerMove={(e) => {
        if (!drag.current || !ref.current) return;
        ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
      }}
      onPointerUp={() => {
        drag.current = null;
        ref.current?.classList.remove('is-dragging');
      }}
      onPointerLeave={() => {
        drag.current = null;
        ref.current?.classList.remove('is-dragging');
      }}
    >
      {items.map((it, i) => {
        const p = photos[it.photo];
        return (
          <li key={it.photo} style={{ ['--i' as string]: i }}>
            <img src={asset(p.src)} alt={p.alt} loading="lazy" draggable={false} style={{ objectPosition: p.focal }} />
            <span>{it.caption}</span>
          </li>
        );
      })}
    </ul>
  );
}
