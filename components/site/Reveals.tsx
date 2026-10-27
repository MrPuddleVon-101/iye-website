'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// These start fully clipped, and IntersectionObserver never reports a fully
// clipped target as visible, so their parent is observed in their place.
const CLIPPED = '.h-xl[data-reveal], .prog__media[data-reveal]';

/**
 * One observer for the whole site: anything marked `data-reveal` gets
 * `is-in` once it scrolls into view. The motion itself lives in CSS, so the
 * markup stays static HTML and reads fine without JavaScript.
 */
export function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    const proxies = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          proxies.get(e.target)?.forEach((el) => el.classList.add('is-in'));
          proxies.delete(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    const seen = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const target = el.matches(CLIPPED) && el.parentElement ? el.parentElement : el;
        const list = proxies.get(target);
        if (list) list.push(el);
        else {
          proxies.set(target, [el]);
          io.observe(target);
        }
      });
    scan();
    // Catch content that mounts after hydration (filters, client widgets).
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
