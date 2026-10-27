'use client';

import { useRef, useState } from 'react';

// One market throughout: bubble tea near school.
const SHOCKS = [
  { id: 'none', label: 'Normal week', d: 0, s: 0, line: 'Price and quantity sit where buyers and sellers agree.' },
  { id: 'exam', label: 'Exam week: everyone wants one', d: 18, s: 0, line: 'Demand shifts right. Price and quantity both rise.' },
  { id: 'tapioca', label: 'Tapioca shortage', d: 0, s: -18, line: 'Supply shifts left. Price rises, quantity falls.' },
  { id: 'levy', label: 'Sugar levy on sellers', d: 0, s: -10, line: 'Costs rise, supply shifts left. Who pays more of the levy: buyers or sellers?' },
  { id: 'holiday', label: 'School holidays', d: -20, s: 0, line: 'Demand shifts left. Price and quantity both fall.' },
]

/**
 * A warm-up before the argument: drag the demand curve (or pick a shock)
 * and the equilibrium moves. A teaching sketch with straight lines, not a
 * model of any real market. Keyboard: the slider moves demand too.
 */
export function MarketToy() {
  const [d, setD] = useState(0);
  const [s, setS] = useState(0);
  const [shock, setShock] = useState('none');
  const svg = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  // Supply P = 20 + 0.6Q - s ; demand P = 80 + d - 0.6Q  (units 0..100)
  const q = Math.max(5, Math.min(95, (60 + d + s) / 1.2));
  const p = 20 + 0.6 * q - s;
  const X = (v: number) => 40 + v * 4.4;
  const Y = (v: number) => 300 - v * 2.8;

  const onPointer = (e: React.PointerEvent) => {
    if (!dragging.current || !svg.current) return;
    const r = svg.current.getBoundingClientRect();
    const y = ((e.clientY - r.top) / r.height) * 340;
    // Dragging up raises demand.
    setD(Math.max(-30, Math.min(30, Math.round((150 - y) / 3))));
    setShock('');
  };

  const pick = (id: string) => {
    const sh = SHOCKS.find((x) => x.id === id)!;
    setShock(id);
    setD(sh.d);
    setS(sh.s);
  };
  const current = SHOCKS.find((x) => x.id === shock);

  return (
    <div className="toy">
      <svg
        ref={svg}
        className="toy__chart"
        viewBox="0 0 500 340"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          onPointer(e);
        }}
        onPointerMove={onPointer}
        onPointerUp={() => (dragging.current = false)}
        data-cursor="Drag"
        role="img"
        aria-label={`Supply and demand. Equilibrium price ${p.toFixed(0)}, quantity ${q.toFixed(0)}.`}
      >
        <path className="toy__axis" d="M40 10 V300 H490" />
        <text x="50" y="22" className="toy__t">Price</text>
        <text x="490" y="326" className="toy__t" textAnchor="end">Quantity</text>
        <line className="toy__s" x1={X(0)} y1={Y(20 - s)} x2={X(100)} y2={Y(80 - s)} />
        <line className="toy__d" x1={X(0)} y1={Y(80 + d)} x2={X(100)} y2={Y(20 + d)} />
        <text className="toy__lbl" x={X(100) + 6} y={Y(80 - s)}>S</text>
        <text className="toy__lbl toy__lbl--d" x={X(100) + 6} y={Y(20 + d) + 6}>D</text>
        <line className="toy__guide" x1={X(q)} y1={Y(p)} x2={X(q)} y2={300} />
        <line className="toy__guide" x1={40} y1={Y(p)} x2={X(q)} y2={Y(p)} />
        <circle className="toy__eq" cx={X(q)} cy={Y(p)} r="9" />
      </svg>
      <div className="toy__side">
        <p className="toy__read">
          <span>
            Price <b>{p.toFixed(0)}</b>
          </span>
          <span>
            Quantity <b>{q.toFixed(0)}</b>
          </span>
        </p>
        <label className="slider">
          <span>Demand</span>
          <input type="range" min={-30} max={30} value={d} onChange={(e) => (setD(Number(e.target.value)), setShock(''))} data-cursor="Drag" />
          <b>{d > 0 ? '+' : ''}{d}</b>
        </label>
        <div className="toy__shocks" role="group" aria-label="Try a shock">
          {SHOCKS.map((x) => (
            <button key={x.id} type="button" aria-pressed={shock === x.id} onClick={() => pick(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="toy__line" aria-live="polite">
          {current ? current.line : 'You moved demand. Nobody set the new price; it just appeared.'}
        </p>
      </div>
    </div>
  );
}
