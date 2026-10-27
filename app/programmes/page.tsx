import type { Metadata } from 'next';
import { site } from '@/content/site';
import { PageHead } from '@/components/site/PageHead';
import { ProgrammeScroller } from '@/components/site/ProgrammeScroller';
import { programmes } from '@/content/programmes';

export const metadata: Metadata = {
  title: 'Programmes',
  description: 'Econversations, financial literacy, presentations, guest speakers, simulations and competition preparation at IYE.',
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHead title="Six ways in." lede="Pick one. Most members end up doing all six.">
        <nav className="jumps" aria-label="Programmes">
          {programmes.map((p, i) => (
            <a key={p.slug} href={`#${p.slug}`} style={{ ['--i' as string]: i }}>
              {p.title}
            </a>
          ))}
        </nav>
      </PageHead>
      <ProgrammeScroller />
      <section className="strip" data-tone="light">
        <p>Want to speak at a session?</p>
        <a href={site.joinHref} target="_blank" rel="noopener noreferrer" className="btn btn--ink" data-cursor="Join">
          Get in touch <span aria-hidden>↗</span>
        </a>
      </section>
    </>
  );
}
