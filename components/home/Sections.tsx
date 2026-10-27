import Link from 'next/link';
import { econversations } from '@/content/econversations';
import { opportunities, effectiveStatus, soonestFirst } from '@/content/opportunities';
import { team } from '@/content/team';
import { site } from '@/content/site';
import { PromptDeck } from './PromptDeck';
import { CompGrid } from '@/components/site/CompGrid';
import { TeamCard } from '@/components/site/TeamCard';
import { Proximity } from '@/components/site/Proximity';
import { SeatTable } from './SeatTable';

export function TeamPreview() {
  return (
    <section className="team" aria-labelledby="team-h">
      <div className="team__head">
        <h2 id="team-h" className="h-xl" data-reveal>
          The people running it.
        </h2>
        <p className="lede" data-reveal>
          Tap a face to find them on LinkedIn.
        </p>
      </div>
      <ul className="team__row">
        {team.map((m, i) => (
          <TeamCard key={m.name} m={m} i={i} />
        ))}
      </ul>
    </section>
  );
}

export function EconversationsFeature() {
  return (
    <section className="feature" aria-labelledby="econ-h">
      <div className="feature__copy">
        <h2 id="econ-h" className="h-xl" data-reveal>
          Econversations
        </h2>
        <p className="lede" data-reveal>
          {econversations.definition}
        </p>
        <p className="feature__hint" data-reveal>
          Try one. Pick a side and see what comes back at you.
        </p>
        <Link href="/econversations/" className="btn btn--ghost">
          How a session runs <span aria-hidden>→</span>
        </Link>
      </div>
      <PromptDeck />
    </section>
  );
}

export function OpportunityPreview() {
  const shown = soonestFirst(opportunities.filter((o) => effectiveStatus(o) !== 'closed')).slice(0, 8);
  return (
    <section className="opps" aria-labelledby="opps-h">
      <div className="opps__head">
        <h2 id="opps-h" className="h-xl" data-reveal>
          Where to compete next.
        </h2>
        <Link href="/opportunities/" className="btn btn--ghost">
          All {opportunities.length} competitions <span aria-hidden>→</span>
        </Link>
      </div>
      <CompGrid items={shown} />
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="cta" data-tone="light" aria-labelledby="cta-h">
      <h2 id="cta-h" className="cta__h">
        <Proximity text="Take a seat" />
        <Proximity text="at the table." />
      </h2>
      <SeatTable />
      <p className="cta__line">{site.ctaLine}</p>
      <div className="cta__row">
        <a href={site.joinHref} target="_blank" rel="noopener noreferrer" className="btn btn--ink btn--xl" data-cursor="Join">
          Join IYE <span aria-hidden>↗</span>
        </a>
        <Link href="/programmes/" className="btn btn--line">
          See what we run
        </Link>
      </div>
      <p className="cta__fine">Joining adds you to the IYE mailing list. No economics background needed.</p>
    </section>
  );
}
