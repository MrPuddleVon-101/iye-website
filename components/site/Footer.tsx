import Link from 'next/link';
import { nav, site } from '@/content/site';
import { asset } from '@/lib/asset';
import { Proximity } from './Proximity';

export function Footer() {
  return (
    <footer className="footer">
      <section className="footer__top" aria-label="Institute of Young Economists">
        <Proximity text="Institute of Young Economists" className="footer__big" radius={220} />
      </section>

      <div className="footer__grid">
        <div className="footer__brand">
          <img src={asset('/img/brand/iye-mark-light.png')} alt="IYE crest" width={64} height={64} />
          <p>{site.tagline}.</p>
        </div>

        <nav aria-label="Footer" className="footer__links">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/privacy/">Privacy</Link>
        </nav>

        <div className="footer__school">
          <span className="footer__crest">
            <img src={asset('/img/brand/sjii-crest.png')} alt="St. Joseph's Institution International crest" width={130} height={95} />
          </span>
          <a className="btn btn--lime" href={site.joinHref} target="_blank" rel="noopener noreferrer">
            Join IYE <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <div className="footer__base">
        <p>{site.disclaimer}</p>
        <p>© {site.updated} IYE</p>
      </div>
    </footer>
  );
}
