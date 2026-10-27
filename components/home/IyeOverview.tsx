'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '@/content/site';
import { photos, type PhotoKey } from '@/content/sessions';
import { asset } from '@/lib/asset';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const pillars: { verb: string; what: string; photo: PhotoKey }[] = [
  { verb: 'Question', what: 'Econversations and policy debates', photo: 'advantage' },
  { verb: 'Apply', what: 'Simulations, case studies, real scenarios', photo: 'roleplay' },
  { verb: 'Build', what: 'Financial literacy and presentation skills', photo: 'stocks' },
  { verb: 'Compete', what: 'Olympiads, essays and investment challenges', photo: 'pitch' },
  { verb: 'Connect', what: 'Guest speakers and peer learning', photo: 'together' },
];

export function IyeOverview() {
  const lit = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);
  // Pillars advance on their own until someone takes over, so nobody misses
  // that they open. The lime bar on the open pillar shows the countdown.
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || prefersReducedMotion()) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % pillars.length), 3400);
    return () => clearTimeout(t);
  }, [auto, inView, active]);

  const take = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  // Words light up as the statement scrolls through the viewport.
  useEffect(() => {
    if (prefersReducedMotion() || !lit.current) return;
    const words = lit.current.querySelectorAll('span');
    const t = gsap.fromTo(
      words,
      { opacity: 0.16 },
      { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: lit.current, start: 'top 80%', end: 'bottom 45%', scrub: true } },
    );
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);

  return (
    <section className="overview" id="iye" aria-labelledby="iye-h">
      <div className="overview__head">
        <h2 className="sr-only" id="iye-h">
          What IYE does
        </h2>
        <p className="overview__lit" ref={lit}>
          {site.statement.split(' ').map((w, i) => (
            <span key={i}>{w} </span>
          ))}
        </p>
      </div>

      <div className="pillars__cue">
        <p>Five things we do.</p>
        <p className="pillars__hint">
          {auto ? 'Hover or tap any word to open it.' : 'Pick another.'} <span aria-hidden>→</span>
        </p>
      </div>
      <ul className={`pillars${auto && inView ? ' is-auto' : ''}`} ref={listRef}>
        {pillars.map((p, i) => (
          <li key={p.verb} className="pillar" data-active={active === i}>
            <button type="button" onMouseEnter={() => take(i)} onFocus={() => take(i)} onClick={() => take(i)} aria-expanded={active === i} data-cursor="Open">
              <span className="pillar__verb">{p.verb}</span>
              <span className="pillar__what">{p.what}</span>
              <i className="pillar__timer" aria-hidden key={`${active}-${auto}`} />
            </button>
            <img src={asset(photos[p.photo].src)} alt="" loading="lazy" style={{ objectPosition: photos[p.photo].focal }} />
          </li>
        ))}
      </ul>
    </section>
  );
}
