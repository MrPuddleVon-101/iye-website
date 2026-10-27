'use client';

import { useEffect, useRef, useState } from 'react';
import { markReady, prefersReducedMotion } from '@/lib/motion';

/**
 * Plays on every reload. A textbook supply and demand diagram draws itself
 * and finds equilibrium at E. Then everything except the two upper arms and
 * the line down to Q* falls away: what is left is a Y. It thickens into the
 * Y of IYE while the I and E slide in beside it, and the lime E point floods
 * the screen. Any click or key skips.
 */
export function Loader() {
  const [phase, setPhase] = useState<'run' | 'out' | 'done'>('run');
  const rootRef = useRef<HTMLDivElement>(null);
  const eqRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const skip = useRef<() => void>(() => {});

  useEffect(() => {
    document.documentElement.classList.add('is-loading');
    const timers: number[] = [];
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      if (countRef.current) countRef.current.textContent = '100';
      const dot = eqRef.current?.getBoundingClientRect();
      if (dot && dot.width && rootRef.current) {
        rootRef.current.style.setProperty('--fx', `${dot.left + dot.width / 2}px`);
        rootRef.current.style.setProperty('--fy', `${dot.top + dot.height / 2}px`);
      }
      setPhase('out');
      document.documentElement.classList.remove('is-loading');
      timers.push(window.setTimeout(markReady, 520));
      timers.push(window.setTimeout(() => setPhase('done'), 1500));
    };
    skip.current = finish;

    if (prefersReducedMotion()) {
      timers.push(window.setTimeout(finish, 250));
      return () => timers.forEach(clearTimeout);
    }

    const start = performance.now();
    const total = 3900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      if (countRef.current) countRef.current.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * 100)).padStart(3, '0');
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    timers.push(window.setTimeout(finish, total + 150));

    const onKey = () => finish();
    window.addEventListener('keydown', onKey, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div ref={rootRef} className={`loader loader--${phase}`} aria-hidden onClick={() => skip.current()}>
      <div className="loader__stage">
        <svg className="loader__graph" viewBox="0 0 820 400" fill="none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
            </marker>
          </defs>
          <g className="lg-all">
            {/* The diagram */}
            <g className="lg-fall">
              <g className="lg-axes">
                <path pathLength={1} d="M250 351 V22" markerEnd="url(#arrow)" />
                <path pathLength={1} d="M244 345 H700" markerEnd="url(#arrow)" />
              </g>
              <g className="lg-ticks">
                {[310, 370, 430, 490, 550, 610, 670].map((x) => (
                  <path key={`x${x}`} d={`M${x} 345 v6`} />
                ))}
                {[85, 145, 205, 265].map((y) => (
                  <path key={`y${y}`} d={`M250 ${y} h-6`} />
                ))}
              </g>
              <text className="lg-axis-label" x="250" y="12" textAnchor="middle">
                Price
              </text>
              <text className="lg-axis-label" x="700" y="374" textAnchor="end">
                Quantity
              </text>
              <path className="lg-guide" d="M420 190 H250" />
              <path className="lg-curve lg-s lg-lo" pathLength={1} d="M310 335 C 340 302.5, 380 246.25, 420 190" />
              <path className="lg-curve lg-d lg-lo lg-lo--d" pathLength={1} d="M420 190 C 460 246.25, 500 302.5, 530 335" />
              <text className="lg-label" x="542" y="44">
                S
              </text>
              <text className="lg-label lg-label--d" x="542" y="346">
                D
              </text>
              <text className="lg-tick-label" x="238" y="196" textAnchor="end">
                P*
              </text>
              <text className="lg-tick-label" x="420" y="374" textAnchor="middle">
                Q*
              </text>
              <text className="lg-label lg-label--e" x="436" y="182">
                E
              </text>
              <circle className="lg-ring" cx="420" cy="190" r="10" />
            </g>

            {/* What survives: two arms and the line down to Q* make a Y */}
            <g className="lg-y">
              <path className="lg-stem-guide" d="M420 190 V345" />
              <path className="lg-curve lg-d lg-arm lg-arm--d" pathLength={1} d="M310 45 C 340 77.5, 380 133.75, 420 190" />
              <path className="lg-curve lg-s lg-arm lg-arm--s" pathLength={1} d="M420 190 C 460 133.75, 500 77.5, 530 45" />
              <path className="lg-stem" pathLength={1} d="M420 190 V345" />
            </g>
            <circle className="lg-eq" ref={eqRef} cx="420" cy="190" r="8" />

            {/* The wordmark it becomes */}
            <g className="lg-word">
              <text className="lg-i" x="268" y="345" textAnchor="end">
                I
              </text>
              <text className="lg-yy" x="420" y="345" textAnchor="middle">
                Y
              </text>
              <text className="lg-e" x="572" y="345" textAnchor="start">
                E
              </text>
            </g>
          </g>
        </svg>
        <p className="loader__name">
          Institute of Young Economists
          <span>Est. 2026 at St. Joseph&apos;s Institution International</span>
        </p>
      </div>
      <p className="loader__foot">
        <span>
          Finding equilibrium <b ref={countRef}>000</b>
        </span>
        <span>Click to skip</span>
      </p>
      <div className="loader__flood" />
    </div>
  );
}
