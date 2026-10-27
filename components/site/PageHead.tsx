import { Fragment } from 'react';
import { asset } from '@/lib/asset';
import type { photos } from '@/content/sessions';

type Photo = (typeof photos)[keyof typeof photos];

/**
 * Inner-page opener: a heavy expanded title whose words lift out of a mask,
 * a short lede, and optionally a photo that opens beside it.
 */
export function PageHead({ title, lede, photo, children }: { title: string; lede?: string; photo?: Photo; children?: React.ReactNode }) {
  const words = title.split(' ');
  return (
    <header className={`page-head${photo ? ' page-head--photo' : ''}`}>
      <div className="page-head__copy">
        <h1 className="page-head__h">
          <span className="sr-only">{title}</span>
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="mw" aria-hidden style={{ ['--i' as string]: i }}>
                <span>{w}</span>
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </h1>
        {lede && <p className="page-head__lede">{lede}</p>}
        {children}
      </div>
      {photo && (
        <figure className="page-head__photo">
          <img src={asset(photo.src)} alt={photo.alt} style={{ objectPosition: photo.focal }} />
        </figure>
      )}
    </header>
  );
}
