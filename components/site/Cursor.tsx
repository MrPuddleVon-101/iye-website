'use client';

import { useEffect, useRef } from 'react';

/**
 * A solid lime disc that trails the pointer. Over anything interactive it
 * swells and can carry a one-word label from `data-cursor`. Fine pointers
 * only; touch devices keep their native behaviour.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label) return;
    document.documentElement.classList.add('has-cursor');

    let tx = -100, ty = -100, x = tx, y = ty;
    let scale = 1, targetScale = 1;
    let raf = 0;
    let shown = false;
    // Buttons lean toward the pointer while it is over them.
    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) magnet.style.translate = '';
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        x = tx;
        y = ty;
        el.classList.add('is-on');
      }
      const t = (e.target as Element | null)?.closest?.('a, button, [role="button"], input, select, label, summary, [data-cursor]') as HTMLElement | null;
      const text = t?.dataset.cursor ?? '';
      const field = t?.matches('input[type="text"], input[type="search"], textarea');
      el.dataset.state = !t ? 'idle' : field ? 'text' : text ? 'label' : 'hot';
      if (label.textContent !== text) label.textContent = text;
      targetScale = !t ? 1 : field ? 0.5 : text ? 5.2 : 3.1;
      // Over light or lime surfaces the disc turns ink so it stays visible.
      const light = !!(e.target as Element | null)?.closest?.('[data-tone="light"]');
      if ((el.dataset.tone === 'light') !== light) el.dataset.tone = light ? 'light' : 'dark';

      const btn = (e.target as Element | null)?.closest?.('.btn') as HTMLElement | null;
      if (btn !== magnet) release();
      if (btn && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        magnet = btn;
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.32).toFixed(1)}px`;
      }
    };
    const onDown = () => (el.dataset.down = 'true');
    const onUp = () => (el.dataset.down = 'false');
    const onLeave = () => {
      release();
      shown = false;
      el.classList.remove('is-on');
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      const press = el.dataset.down === 'true' ? 0.75 : 1;
      scale += (targetScale * press - scale) * 0.16;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      label.style.transform = `scale(${1 / scale})`;
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden data-state="idle">
      <span ref={labelRef} />
    </div>
  );
}
