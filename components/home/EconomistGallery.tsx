'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { economists } from '@/content/economists';
import { asset } from '@/lib/asset';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal gallery on wide screens: vertical scroll walks a strip of
 * portraits sideways. Narrow screens and reduced motion get a native
 * swipeable row instead.
 */
export function EconomistGallery() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      // Cards lean into fast scrolling and settle when it stops.
      const cards = el.querySelectorAll('.eco');
      const skew = gsap.quickTo(cards, 'skewX', { duration: 0.6, ease: 'power3.out' });
      let settle = 0;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            wrap.current?.style.setProperty('--p', st.progress.toFixed(3));
            skew(gsap.utils.clamp(-7, 7, st.getVelocity() / -320));
            clearTimeout(settle);
            settle = window.setTimeout(() => skew(0), 120);
          },
        },
      });
      // Each portrait drifts against the track for depth.
      el.querySelectorAll<HTMLElement>('.eco__img').forEach((img) => {
        gsap.fromTo(img, { xPercent: 10 }, { xPercent: -10, ease: 'none', scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="gallery" id="economists" ref={wrap} aria-labelledby="gallery-h">
      <div className="gallery__track" ref={track}>
        <header className="gallery__intro">
          <h2 id="gallery-h" className="h-xl">
            Eight economists.
            <br />
            Zero consensus.
          </h2>
          <p className="lede">They disagreed with each other for three centuries. You get to pick a side.</p>
          <p className="gallery__drag" aria-hidden>
            Keep scrolling <span>→</span>
          </p>
        </header>

        {economists.map((e) => (
          <article className="eco" key={e.id} data-cursor={e.quote ? 'Quote' : undefined}>
            <div className="eco__media">
              <span className="eco__year" aria-hidden>
                {e.years.match(/\d{4}/)?.[0]}
              </span>
              <img className="eco__img" src={asset(e.photo)} alt={`Portrait of ${e.name}`} loading="lazy" width={800} height={820} />
            </div>
            <div className="eco__text">
              <p className="eco__idea">{e.idea}</p>
              <h3>{e.name}</h3>
              <p className="eco__years">{e.years}</p>
              <p className="eco__line">{e.line}</p>
              {e.quote && (
                <button type="button" className="eco__q" aria-expanded={quote === e.id} onClick={() => setQuote(quote === e.id ? null : e.id)}>
                  {quote === e.id ? 'Hide quote' : 'In their words'}
                </button>
              )}
              {e.quote && (
                <blockquote className={`eco__quote${quote === e.id ? ' is-open' : ''}`} hidden={quote !== e.id}>
                  <p>“{e.quote.text}”</p>
                  <cite>{e.quote.source}</cite>
                </blockquote>
              )}
            </div>
          </article>
        ))}
        <div className="gallery__end">
          <p className="h-xl">Who&apos;s right?</p>
          <a className="btn btn--lime" href="/econversations/" data-cursor="Argue">
            That&apos;s an Econversation
          </a>
        </div>
      </div>
      <div className="gallery__bar" aria-hidden>
        <span />
      </div>
    </section>
  );
}
