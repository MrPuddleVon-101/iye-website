'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { metrics } from '@/content/impact';
import { photos } from '@/content/sessions';
import { site } from '@/content/site';
import { asset } from '@/lib/asset';
import { onReady, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const LINES = ['The economy is', 'already in the'];
// The last word cycles through places economics is already happening, and
// the photo window changes with it.
const PLACES: { word: string; caption: string; photo: keyof typeof photos }[] = [
  { word: 'room.', caption: 'Five-person pitch', photo: 'panel' },
  { word: 'canteen.', caption: 'Role-play, mid-argument', photo: 'roleplay' },
  { word: 'group chat.', caption: 'Prep circle', photo: 'together' },
  { word: 'stock app.', caption: 'Reading a five-year chart', photo: 'stocks' },
  { word: 'exam hall.', caption: 'Goals of firms, presented', photo: 'goals' },
  { word: 'kopi queue.', caption: 'Comparative advantage, over snacks', photo: 'advantage' },
];
const VERBS = ['Debate.', 'Model.', 'Critique.', 'Apply.'];

/**
 * Landing. A window onto a real session sits beside the headline and the
 * verified numbers. Scrolling pins the stage: the window opens to full
 * bleed, the headline splits away, and four verbs land over the photo.
 */
export function Room() {
  const ref = useRef<HTMLElement>(null);
  const [place, setPlace] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let id = 0;
    const off = onReady(() => {
      id = window.setInterval(() => {
        if (window.scrollY < window.innerHeight * 0.3) setPlace((p) => (p + 1) % PLACES.length);
      }, 2300);
    });
    return () => {
      off();
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const calm = prefersReducedMotion();
    const q = gsap.utils.selector(root);
    const nums = q('[data-to]') as HTMLElement[];

    const countUp = () =>
      nums.forEach((n, i) => {
        const to = Number(n.dataset.to);
        const o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.8, delay: 0.5 + i * 0.15, ease: 'power3.out', onUpdate: () => (n.textContent = String(Math.round(o.v))) });
      });

    if (calm) return;
    nums.forEach((n) => (n.textContent = '0'));

    const mm = gsap.matchMedia();
    mm.add({ wide: '(min-width: 900px)', narrow: '(max-width: 899px)' }, (ctx) => {
      const wide = ctx.conditions?.wide;
      // The photo box itself is sized to the window, so each image crops to
      // its own focal point; on scroll the box grows to fill the screen.
      const box = wide ? { top: '52%', left: '50%', right: '4%', bottom: '7%' } : { top: '29%', left: '5%', right: '5%', bottom: '25%' };
      const full = { top: '0%', left: '0%', right: '0%', bottom: '0%' };
      gsap.set(q('.room__photo'), { ...box, clipPath: 'inset(50% 0% 50% 0%)' });
      gsap.set(q('.room__photo img'), { scale: 1.35 });

      // Entrance, once the loader lifts.
      const intro = gsap.timeline({ paused: true });
      intro
        .to(q('.room__photo'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
        .to(q('.room__photo img'), { scale: 1.18, duration: 1.8, ease: 'expo.out' }, 0.2)
        .from(q('.room__line > span'), { yPercent: 110, skewY: 6, duration: 1.1, stagger: 0.09, ease: 'expo.out' }, 0.15)
        .from(q('.room__ctas, .room__stat'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'power3.out' }, 0.6)
        .from(q('.room__scroll'), { scale: 0, rotate: -90, duration: 0.8, ease: 'back.out(2.4)' }, 1.1);
      const off = onReady(() => {
        intro.play();
        countUp();
      });

      // Scroll: open the window, split the headline, land the verbs.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top top', end: '+=160%', pin: q('.room__stage')[0], scrub: 0.8 },
      });
      tl.fromTo(q('.room__photo'), { ...box }, { ...full, ease: 'power2.inOut', duration: 0.55, immediateRender: false }, 0)
        .fromTo(q('.room__photo img'), { scale: 1.18 }, { scale: 1.02, ease: 'none', duration: 0.6, immediateRender: false }, 0)
        // Explicit start values: the entrance animates these same nodes, so
        // letting the scrub record them mid-entrance would lock in a blank state.
        .fromTo(q('.room__line'), { xPercent: 0, opacity: 1 }, { xPercent: (i) => [-60, 45, -50][i], opacity: 0, ease: 'power2.in', duration: 0.4, stagger: 0.03, immediateRender: false }, 0)
        .fromTo(q('.room__place-tag'), { opacity: 1 }, { opacity: 0, duration: 0.2, immediateRender: false }, 0)
        .fromTo(q('.room__ctas, .room__stats, .room__scroll'), { y: 0, opacity: 1 }, { y: 40, opacity: 0, ease: 'power2.in', duration: 0.25, immediateRender: false }, 0)
        .fromTo(q('.room__shade'), { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, 0.35)
        .from(q('.room__verb > span'), { yPercent: 110, duration: 0.18, stagger: 0.09, ease: 'power3.out' }, 0.5)
        .from(q('.room__caption'), { opacity: 0, y: 20, duration: 0.15 }, 0.85);

      return () => off();
    });

    // The photo leans toward the pointer.
    const slides = q('.room__slides')[0];
    const xTo = gsap.quickTo(slides, 'x', { duration: 1.2, ease: 'power3.out' });
    const yTo = gsap.quickTo(slides, 'y', { duration: 1.2, ease: 'power3.out' });
    const onMove = (e: PointerEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * -26);
      yTo((e.clientY / window.innerHeight - 0.5) * -18);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      mm.revert();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section className="room" ref={ref} aria-labelledby="room-h">
      <div className="room__stage">
        <figure className="room__photo" data-cursor="Inside">
          <span className="room__slides">
            {PLACES.map((pl, i) => {
              const ph = photos[pl.photo];
              return (
                <img
                  key={pl.word}
                  src={asset(ph.src)}
                  alt={i === 0 ? ph.alt : ''}
                  style={{ objectPosition: ph.focal }}
                  data-state={i === place ? 'on' : i === (place + PLACES.length - 1) % PLACES.length ? 'off' : 'wait'}
                />
              );
            })}
          </span>
          <span className="room__shade" aria-hidden />
          <span className="room__place-tag" aria-hidden>
            <span key={place}>{PLACES[place].caption}</span>
          </span>
        </figure>

        <button
          type="button"
          className="room__scroll"
          data-cursor="Scroll"
          aria-label="Scroll to step inside"
          onClick={() => window.__lenis?.scrollTo(window.innerHeight * 1.05, { duration: 2.2 }) ?? window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <i aria-hidden>↓</i>
        </button>

        <div className="room__copy">
        <h1 className="room__title" id="room-h">
          <span className="sr-only">The economy is already in the room.</span>
          {LINES.map((l) => (
            <span className="room__line" key={l} aria-hidden>
              <span>
                {l}
              </span>
            </span>
          ))}
          <span className="room__line room__line--place" aria-hidden>
            <span>
              <span className="room__place" key={place}>
                {PLACES[place].word}
              </span>
            </span>
          </span>
        </h1>
        </div>

        <div className="room__ctas">
          <p className="room__sub">Debates, workshops, simulations and competitions for students who want to argue about how the world works.</p>
          <a className="btn btn--lime" href={site.joinHref} target="_blank" rel="noopener noreferrer" data-cursor="Join">
            Join IYE <span aria-hidden>↗</span>
          </a>
          <a className="btn btn--ghost" href="#economists">
            Step inside <span aria-hidden>↓</span>
          </a>
        </div>

        <dl className="room__stats">
          {metrics.map((m) => (
            <div className="room__stat" key={m.id}>
              <dt>{m.label}</dt>
              <dd>
                <span data-to={m.value}>{m.value}</span>
                {m.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <div className="room__after" aria-hidden>
          <p className="room__verbs">
            {VERBS.map((v) => (
              <span className="room__verb" key={v}>
                <span>{v}</span>
              </span>
            ))}
          </p>
          <p className="room__caption">A session at SJII. Every number above is committee-verified.</p>
        </div>
      </div>
    </section>
  );
}
