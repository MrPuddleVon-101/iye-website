'use client';

// One shared switch for continuous motion. The header's "Pause motion"
// control flips it; the 3D scene, loops and Lenis all listen.
type Listener = (paused: boolean) => void;
const listeners = new Set<Listener>();
let paused = false;

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMotionPaused() {
  return paused || prefersReducedMotion();
}

export function setMotionPaused(next: boolean) {
  paused = next;
  document.documentElement.dataset.motion = next ? 'off' : 'on';
  try {
    localStorage.setItem('iye-motion', next ? 'off' : 'on');
  } catch {}
  listeners.forEach((l) => l(next));
}

export function onMotionChange(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function initMotionFromStorage() {
  try {
    if (localStorage.getItem('iye-motion') === 'off') setMotionPaused(true);
  } catch {}
}

// The loader announces when the page is uncovered so hero entrances can
// start on cue instead of playing underneath it.
export function onReady(fn: () => void) {
  if (typeof window === 'undefined') return () => {};
  if ((window as unknown as { __iyeReady?: boolean }).__iyeReady) {
    fn();
    return () => {};
  }
  const h = () => fn();
  window.addEventListener('iye:ready', h, { once: true });
  return () => window.removeEventListener('iye:ready', h);
}

export function markReady() {
  (window as unknown as { __iyeReady?: boolean }).__iyeReady = true;
  document.documentElement.classList.add('is-ready');
  window.dispatchEvent(new Event('iye:ready'));
}
