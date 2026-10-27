'use client';

import { useId, useState } from 'react';

/**
 * Three levers, four priorities. A deliberately crude teaching sketch: it
 * shows which goals pull against each other, never a "right" answer and
 * never a forecast.
 */
export function PolicyDial() {
  const id = useId();
  const [inflation, setInflation] = useState(5);
  const [jobless, setJobless] = useState(6);
  const [spend, setSpend] = useState(50);

  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  const pressure = {
    prices: clamp(inflation * 9 + (spend - 50) * 0.6),
    jobs: clamp(jobless * 8 - (spend - 50) * 0.5),
    budget: clamp(30 + (spend - 50) * 1.2 + jobless * 2),
    fairness: clamp(40 + jobless * 4 + inflation * 2 - (spend - 50) * 0.4),
  };
  const labels: Record<keyof typeof pressure, string> = {
    prices: 'Price stability',
    jobs: 'Jobs',
    budget: 'Public finances',
    fairness: 'Fairness',
  };
  const ranked = (Object.keys(pressure) as (keyof typeof pressure)[]).sort((a, b) => pressure[b] - pressure[a]);

  const questions: string[] = [];
  if (inflation >= 6 && spend > 55) questions.push('Prices are already rising. Does more spending feed them, and who pays: savers or borrowers?');
  if (jobless >= 8 && inflation <= 3) questions.push('Low inflation, many out of work. Is there a case to spend more now?');
  if (inflation >= 6 && jobless >= 8) questions.push('Stagflation. Fighting one problem worsens the other. Which do you choose first?');
  if (spend < 40 && jobless >= 7) questions.push('Cutting spending while unemployment is high: what happens to demand?');
  if (spend > 70) questions.push('Who funds this: taxes now, borrowing, or future generations?');
  if (!questions.length) questions.push('Things look calm. Which risk would you watch most closely, and why?');

  return (
    <div className="dial" id="policy-dial">
      <div className="dial__controls">
        {[
          { k: 'i', label: 'Inflation', v: inflation, set: setInflation, min: 0, max: 12, unit: '%' },
          { k: 'u', label: 'Unemployment', v: jobless, set: setJobless, min: 2, max: 14, unit: '%' },
          { k: 's', label: 'Public spending', v: spend, set: setSpend, min: 0, max: 100, unit: '' },
        ].map((c) => (
          <label className="slider slider--lg" key={c.k} htmlFor={`${id}-${c.k}`}>
            <span>{c.label}</span>
            <input id={`${id}-${c.k}`} type="range" min={c.min} max={c.max} value={c.v} onChange={(e) => c.set(Number(e.target.value))} data-cursor="Drag" />
            <b>{c.k === 's' ? (c.v < 35 ? 'Low' : c.v > 65 ? 'High' : 'Mid') : `${c.v}${c.unit}`}</b>
          </label>
        ))}
      </div>
      <div className="dial__out">
        <ul className="dial__bars" aria-hidden>
          {(Object.keys(pressure) as (keyof typeof pressure)[]).map((k) => (
            <li key={k} style={{ ['--v' as string]: pressure[k] / 100 }} data-top={ranked[0] === k}>
              <span>{labels[k]}</span>
              <i />
            </li>
          ))}
        </ul>
        <div aria-live="polite" className="dial__text">
          <p>
            Most under pressure: <b>{labels[ranked[0]]}</b>, then {labels[ranked[1]].toLowerCase()}.
          </p>
          {questions.slice(0, 2).map((q) => (
            <p key={q} className="dial__q">
              {q}
            </p>
          ))}
        </div>
        <p className="dial__fine">Simplified teaching sketch. Not a model of any real economy and not a forecast.</p>
      </div>
    </div>
  );
}
