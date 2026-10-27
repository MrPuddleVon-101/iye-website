'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The session flow as a clock. The left panel sticks while the steps scroll
 * past; whichever step is in the reading line drives the minute counter,
 * the step name and the elapsed bar.
 */
export function Framework({ steps }: { steps: { step: string; text: string; mins: number }[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const total = steps.reduce((s, f) => s + f.mins, 0);
  const starts = steps.reduce<number[]>((acc, _, i) => [...acc, i === 0 ? 0 : acc[i - 1] + steps[i - 1].mins], []);

  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-48% 0px -48% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const at = starts[active];
  return (
    <div className="flow">
      <div className="flow__clock" aria-hidden>
        <p className="flow__time">
          <span key={at}>{String(at).padStart(2, '0')}</span>:00
        </p>
        <p className="flow__now" key={active}>
          {steps[active].step}
        </p>
        <span className="flow__bar">
          <span style={{ transform: `scaleX(${(at + steps[active].mins) / total})` }} />
        </span>
        <p className="flow__total">{total} minutes, start to finish</p>
      </div>
      <ol className="flow__steps" ref={listRef}>
        {steps.map((s, i) => (
          <li key={s.step} data-i={i} className={i === active ? 'is-active' : undefined}>
            <span className="flow__min">
              {starts[i]} to {starts[i] + s.mins} min
            </span>
            <strong>{s.step}</strong>
            <span className="flow__text">{s.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
