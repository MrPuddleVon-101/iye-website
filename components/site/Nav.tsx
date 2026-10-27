'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/content/site';
import { asset } from '@/lib/asset';
import { initMotionFromStorage, isMotionPaused, onMotionChange, setMotionPaused } from '@/lib/motion';

/**
 * A full-width masthead. Once the page scrolls, the links fold away one by
 * one (a flip along their top edge), the name collapses to IYE and a Menu
 * button folds in. The bottom rule doubles as the scroll-progress line.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [folded, setFolded] = useState(false);
  const [paused, setPaused] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    initMotionFromStorage();
    setPaused(isMotionPaused());
    return onMotionChange(setPaused);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setFolded(y > 90);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ruleRef.current?.style.setProperty('--p', String(max > 0 ? Math.min(1, y / max) : 0));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, '')));

  return (
    <header className={`nav${folded ? ' is-folded' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__strip" inert={folded}>
        <p>Econversations are open to every SJII student.</p>
        <a href={site.joinHref} target="_blank" rel="noopener noreferrer">
          Join the list <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="nav__bar">
        <Link href="/" className="nav__brand" aria-label={`${site.name} home`}>
          <img src={asset('/img/brand/iye-mark-light.png')} alt="" width={48} height={48} />
          <span className="nav__name" aria-hidden>
            <span className="nav__short">IYE</span>
            <span className="nav__full">Institute of Young Economists</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="nav__links" inert={folded}>
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} className="nav__link" style={{ ['--i' as string]: i }} aria-current={isActive(n.href) ? 'page' : undefined}>
              <span className="roll">
                <span>{n.label}</span>
                <span aria-hidden>{n.label}</span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="nav__tools">
          <button className="nav__motion" type="button" aria-pressed={paused} onClick={() => setMotionPaused(!paused)} data-cursor={paused ? 'Play' : 'Pause'}>
            <i aria-hidden />
            <span className="sr-only">{paused ? 'Play motion' : 'Pause motion'}</span>
          </button>
          <a className="btn btn--lime nav__join" href={site.joinHref} target="_blank" rel="noopener noreferrer">
            Join IYE
          </a>
          <button ref={triggerRef} className="nav__menu" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
            <span className="roll">
              <span>{open ? 'Close' : 'Menu'}</span>
              <span aria-hidden>{open ? 'Close' : 'Menu'}</span>
            </span>
            <i aria-hidden />
          </button>
        </div>
      </div>
      <span className="nav__rule" ref={ruleRef} aria-hidden />

      <div id="site-menu" className="menu" hidden={!open}>
        <ol className="menu__links">
          {nav.map((n, i) => (
            <li key={n.href} style={{ ['--i' as string]: i }}>
              <Link href={n.href} aria-current={isActive(n.href) ? 'page' : undefined}>
                {n.label}
              </Link>
            </li>
          ))}
        </ol>
        <div className="menu__side">
          <p>{site.tagline}.</p>
          <a className="btn btn--lime" href={site.joinHref} target="_blank" rel="noopener noreferrer">
            Join IYE <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
