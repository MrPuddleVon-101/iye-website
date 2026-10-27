'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { metrics } from '@/content/impact';
import { photos } from '@/content/sessions';
import { site } from '@/content/site';
import { asset } from '@/lib/asset';
import { onReady, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const LINES = ['The economy', 'is already', 'in the room.'];
const VERBS = ['Debate.', 'Model.', 'Critique.', 'Apply.'];

/**
 * Landing. A window onto a real session sits beside the headline and the
 * verified numbers. Scrolling pins the stage: the window opens to full
 * bleed, the headline splits away, and four verbs land over the photo.
 */
export function Room() {
  const ref = useRef<HTMLElement>(null);

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
      const startClip = wide ? 'inset(18% 4% 13% 53%)' : 'inset(15% 5% 51% 5%)';
      const closedClip = wide ? 'inset(50% 4% 50% 53%)' : 'inset(32% 5% 68% 5%)';
      gsap.set(q('.room__photo'), { clipPath: closedClip });
      gsap.set(q('.room__photo img'), { scale: 1.35 });

      // Entrance, once the loader lifts.
      const intro = gsap.timeline({ paused: true });
      intro
        .to(q('.room__photo'), { clipPath: startClip, duration: 1.4, ease: 'expo.inOut' })
        .to(q('.room__photo img'), { scale: 1.18, duration: 1.8, ease: 'expo.out' }, 0.2)
        .from(q('.room__line > span'), { yPercent: 110, skewY: 6, duration: 1.1, stagger: 0.09, ease: 'expo.out' }, 0.15)
        .from(q('.room__ctas, .room__stat, .room__scroll'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'power3.out' }, 0.6)
        .fromTo(q('.room__curves'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' }, 0.1)
        .from(q('.room__e'), { scale: 0, opacity: 0, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(3)' }, 1.3)
        .fromTo(q('.room__tile'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut' }, 0.8);
      const off = onReady(() => {
        intro.play();
        countUp();
      });

      // Scroll: open the window, split the headline, land the verbs.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top top', end: '+=160%', pin: q('.room__stage')[0], scrub: 0.8 },
      });
      tl.fromTo(q('.room__photo'), { clipPath: startClip }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 0.55, immediateRender: false }, 0)
        .fromTo(q('.room__photo img'), { scale: 1.18 }, { scale: 1.02, ease: 'none', duration: 0.6, immediateRender: false }, 0)
        // Explicit start values: the entrance animates these same nodes, so
        // letting the scrub record them mid-entrance would lock in a blank state.
        .fromTo(q('.room__line'), { xPercent: 0, opacity: 1 }, { xPercent: (i) => [-60, 45, -50][i], opacity: 0, ease: 'power2.in', duration: 0.4, stagger: 0.03, immediateRender: false }, 0)
        .fromTo(q('.room__ctas, .room__stats, .room__scroll'), { y: 0, opacity: 1 }, { y: 40, opacity: 0, ease: 'power2.in', duration: 0.25, immediateRender: false }, 0)
        .fromTo(q('.room__curves, .room__e'), { opacity: 1 }, { opacity: 0, duration: 0.25, immediateRender: false }, 0)
        .fromTo(q('.room__tile'), { yPercent: 0, opacity: 1 }, { yPercent: -60, opacity: 0, ease: 'power2.in', duration: 0.3, immediateRender: false }, 0)
        .fromTo(q('.room__shade'), { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, 0.35)
        .from(q('.room__verb > span'), { yPercent: 110, duration: 0.18, stagger: 0.09, ease: 'power3.out' }, 0.5)
        .from(q('.room__caption'), { opacity: 0, y: 20, duration: 0.15 }, 0.85);

      return () => off();
    });

    // The photo leans toward the pointer.
    const img = q('.room__photo img')[0];
    const xTo = gsap.quickTo(img, 'x', { duration: 1.2, ease: 'power3.out' });
    const yTo = gsap.quickTo(img, 'y', { duration: 1.2, ease: 'power3.out' });
    const tile = q('.room__tile img')[0];
    const txTo = gsap.quickTo(tile, 'x', { duration: 1.4, ease: 'power3.out' });
    const tyTo = gsap.quickTo(tile, 'y', { duration: 1.4, ease: 'power3.out' });
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      xTo(dx * -26);
      yTo(dy * -18);
      txTo(dx * 30);
      tyTo(dy * 22);
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
        {/* The loader's supply and demand curves carry on behind the landing. */}
        <svg className="room__curves" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden>
          <path className="room__s" d="M-20 900 Q 520 760, 735 600 T 1460 80" />
          <path className="room__d" d="M360 -20 Q 560 380, 735 600 T 1200 920" />
        </svg>
        <span className="room__e" aria-hidden>
          <i />E
        </span>
        <figure className="room__photo" data-cursor="Inside">
          <img src={asset(photos.panel.src)} alt={photos.panel.alt} style={{ objectPosition: photos.panel.focal }} />
          <span className="room__shade" aria-hidden />
        </figure>

        <figure className="room__tile" aria-hidden>
          <img src={asset(photos.goalsClose.src)} alt="" />
          <figcaption>Present. Defend. Repeat.</figcaption>
        </figure>

        <button
          type="button"
          className="room__scroll"
          data-cursor="Go"
          onClick={() => window.__lenis?.scrollTo(window.innerHeight * 1.05, { duration: 2.2 }) ?? window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span>
            Scroll to
            <br />
            step inside
          </span>
          <i aria-hidden>↓</i>
        </button>

        <div className="room__copy">
        <h1 className="room__title" id="room-h">
          {LINES.map((l) => (
            <span className="room__line" key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h1>

        <div className="room__ctas">
          <a className="btn btn--lime" href={site.joinHref} target="_blank" rel="noopener noreferrer" data-cursor="Join">
            Join IYE <span aria-hidden>↗</span>
          </a>
          <a className="btn btn--ghost" href="#economists">
            Step inside <span aria-hidden>↓</span>
          </a>
        </div>
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
