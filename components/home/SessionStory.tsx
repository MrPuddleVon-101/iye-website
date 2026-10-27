'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { photos, sessionStory } from '@/content/sessions';
import { asset } from '@/lib/asset';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Six sticky cards that stack as you scroll: each new moment slides over the
 * last, which sinks back and darkens. Plain stacked figures without JS.
 */
export function SessionStory() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.moment');
      cards.forEach((card, i) => {
        const inner = card.querySelector('.moment__inner');
        const dim = card.querySelector('.moment__dim');
        const img = card.querySelector('img');
        if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top top', scrub: true } });
        if (i === cards.length - 1 || !inner) return;
        // Sink and shade the card underneath. Scale and opacity only: a
        // filter or 3D tilt on a layer this large flickers while scrolling.
        const st = { trigger: cards[i + 1], start: 'top bottom', end: 'top 12%', scrub: true };
        gsap.to(inner, { scale: 0.9, ease: 'none', scrollTrigger: st });
        if (dim) gsap.fromTo(dim, { opacity: 0 }, { opacity: 0.6, ease: 'none', scrollTrigger: { ...st } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="moments" ref={ref} aria-labelledby="moments-h">
      <header className="moments__head">
        <h2 id="moments-h" className="h-xl" data-reveal>
          What a session feels like.
        </h2>
      </header>
      {sessionStory.map((m, i) => {
        const p = photos[m.photo];
        return (
          <figure className="moment" key={m.title} style={{ ['--i' as string]: i }}>
            <div className="moment__inner">
              <img src={asset(p.src)} alt={p.alt} decoding="async" style={{ objectPosition: p.focal }} />
              <span className="moment__dim" aria-hidden />
              <figcaption>
                <strong data-reveal style={{ ['--i' as string]: 1 }}>
                  {m.title}
                </strong>
                <span className="moment__line" data-reveal style={{ ['--i' as string]: 2 }}>
                  {m.line}
                </span>
              </figcaption>
            </div>
          </figure>
        );
      })}
    </section>
  );
}
