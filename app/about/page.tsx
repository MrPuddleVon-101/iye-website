import type { Metadata } from 'next';
import { site } from '@/content/site';
import { team } from '@/content/team';
import { metrics } from '@/content/impact';
import { photos } from '@/content/sessions';
import { asset } from '@/lib/asset';
import { PageHead } from '@/components/site/PageHead';
import { TeamCard } from '@/components/site/TeamCard';
import { PhotoStrip } from '@/components/site/PhotoStrip';

export const metadata: Metadata = {
  title: 'About',
  description: `${site.overview} ${site.tagline}.`,
};

const outcomes = ['Critical thinking', 'Communication', 'Leadership', 'Financial literacy'];

export default function AboutPage() {
  return (
    <>
      <PageHead title="Young, not junior." lede={site.overview} photo={photos.together} />

      <section className="band about-mean" aria-labelledby="mean-h">
        <h2 id="mean-h" className="h-xl" data-reveal>
          Curiosity and application. Not credentials.
        </h2>
        <p className="lede">You do not need to take economics to join. You need questions about how the world works and the nerve to test your answers in front of others.</p>
      </section>

      <section className="band band--paper" data-tone="light" aria-labelledby="out-h">
        <h2 id="out-h" className="h-l">
          What you leave with
        </h2>
        <ul className="outcomes">
          {outcomes.map((o, i) => (
            <li key={o} data-reveal style={{ ['--i' as string]: i }}>
              {o}
            </li>
          ))}
        </ul>
      </section>

      <section className="band" aria-labelledby="hl-h">
        <h2 id="hl-h" className="h-xl" data-reveal>
          So far.
        </h2>
        <dl className="tally">
          <div data-reveal>
            <dt>Founded at SJII</dt>
            <dd>2026</dd>
          </div>
          {metrics.map((m, i) => (
            <div key={m.id} data-reveal style={{ ['--i' as string]: i + 1 }}>
              <dt>{m.label}</dt>
              <dd>
                {m.value}
                {m.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band band--ink2" aria-labelledby="room-h2">
        <div className="band__head">
          <h2 id="room-h2" className="h-xl" data-reveal>
            From the room.
          </h2>
          <p className="lede">Drag through a few sessions.</p>
        </div>
        <PhotoStrip
          items={[
            { photo: 'goals', caption: 'Goals of firms, presented to a full room' },
            { photo: 'pitch', caption: 'A stock pitched as a sustainable pick' },
            { photo: 'notes', caption: 'A marketing plan written on the table' },
            { photo: 'advantage', caption: 'Comparative advantage, argued over snacks' },
            { photo: 'stocks', caption: 'Five years of a share price, read out loud' },
            { photo: 'panelClose', caption: 'Five presenters, one argument' },
          ]}
        />
      </section>

      <section className="band school" aria-labelledby="school-h">
        <span className="school__crest">
          <img src={asset('/img/brand/sjii-crest.png')} alt="St. Joseph's Institution International crest" width={260} height={190} />
        </span>
        <h2 id="school-h" className="h-l" data-reveal>
          A student community at {site.school}.
        </h2>
      </section>

      <section className="team" id="team" aria-labelledby="team-h2">
        <div className="team__head">
          <h2 id="team-h2" className="h-xl" data-reveal>
            The committee.
          </h2>
          <p className="lede">Tap a face to find them on LinkedIn.</p>
        </div>
        <ul className="team__row">
          {team.map((m, i) => (
            <TeamCard key={m.name} m={m} i={i} />
          ))}
        </ul>
      </section>

      <section className="strip" data-tone="light" id="take-part">
        <p>Sessions are open to SJII students. Join the list and we will tell you when the next one runs.</p>
        <a href={site.joinHref} target="_blank" rel="noopener noreferrer" className="btn btn--ink" data-cursor="Join">
          Join IYE <span aria-hidden>↗</span>
        </a>
      </section>
    </>
  );
}
