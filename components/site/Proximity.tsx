'use client';

import { Fragment, useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Display text whose letters widen and thicken as the pointer nears them,
 * using the variable font's width and weight axes. Reads as plain text to
 * assistive tech; the per-letter spans are presentational.
 */
export function Proximity({ text, as: Tag = 'span', className, radius = 260 }: { text: string; as?: 'span' | 'h2' | 'p'; className?: string; radius?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>('.prox__c'));
    let px = -9999, py = -9999, raf = 0, active = false;
    const cur = letters.map(() => 0);

    const tick = () => {
      let moving = false;
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const target = Math.max(0, 1 - d / radius);
        cur[i] += (target - cur[i]) * 0.18;
        if (Math.abs(target - cur[i]) > 0.002) moving = true;
        l.style.fontVariationSettings = `"wdth" ${(78 + cur[i] * 47).toFixed(1)}, "wght" ${(560 + cur[i] * 340).toFixed(0)}`;
      });
      raf = moving || active ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      active = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      px = py = -9999;
      active = false;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const zone = el.closest('section') ?? el;
    zone.addEventListener('pointermove', onMove as EventListener, { passive: true });
    zone.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener('pointermove', onMove as EventListener);
      zone.removeEventListener('pointerleave', onLeave);
    };
  }, [radius]);

  const words = text.split(' ');
  return (
    <Tag ref={ref as never} className={`prox ${className ?? ''}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="prox__w" aria-hidden>
            {w.split('').map((c, ci) => (
              <span className="prox__c" key={ci}>
                {c}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}
