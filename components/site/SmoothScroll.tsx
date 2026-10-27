'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Weighted, slow scrolling driven by GSAP's ticker so Lenis and every
 * ScrollTrigger read the same frame. Skipped under reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let lenis: Lenis | null = null;
    let cancelled = false;
    const update = (time: number) => lenis?.raf(time * 1000);

    import('lenis').then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({ lerp: 0.075, wheelMultiplier: 0.85, touchMultiplier: 1.3 });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      gsap.ticker.remove(update);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // New route: start at the top and let triggers re-measure the new layout.
  useEffect(() => {
    if (!window.location.hash) {
      window.__lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
