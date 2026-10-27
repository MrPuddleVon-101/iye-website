import type { Metadata } from 'next';
import { econversations } from '@/content/econversations';
import { photos } from '@/content/sessions';
import { site } from '@/content/site';
import { PageHead } from '@/components/site/PageHead';
import { PromptDeck } from '@/components/home/PromptDeck';
import { PolicyDial } from '@/components/site/PolicyDial';
import { Framework } from '@/components/site/Framework';
import { MarketToy } from '@/components/site/MarketToy';

export const metadata: Metadata = {
  title: 'Econversations',
  description: econversations.definition,
};

export default function EconversationsPage() {
  return (
    <>
      <PageHead title="Argue. Then change your mind." lede={econversations.definition} photo={photos.advantage} />

      <section className="band" aria-labelledby="vs-h">
        <h2 id="vs-h" className="h-xl" data-reveal>
          Not a debate.
        </h2>
        <div className="versus">
          <p className="versus__t">In a formal debate</p>
          <p className="versus__t versus__t--new">In an Econversation</p>
          {econversations.versusDebate.map((r, i) => (
            <div className="versus__row" key={r.econ} data-reveal style={{ ['--i' as string]: i }}>
              <p className="versus__old">{r.debate}</p>
              <p className="versus__new">{r.econ}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band band--ink2" aria-labelledby="warm-h">
        <div className="band__head">
          <h2 id="warm-h" className="h-xl" data-reveal>
            Warm up first.
          </h2>
          <p className="lede">Every session starts with a market. Drag the demand line, or hit it with a shock.</p>
        </div>
        <MarketToy />
      </section>

      <section className="band" id="framework" aria-labelledby="fw-h">
        <h2 id="fw-h" className="h-xl" data-reveal>
          Run your own.
        </h2>
        <Framework steps={econversations.framework} />
      </section>

      <section className="band band--split" aria-labelledby="prompts-h">
        <div>
          <h2 id="prompts-h" className="h-xl" data-reveal>
            Pick a side.
          </h2>
          <p className="lede">Illustrative prompts, not a record of sessions already run.</p>
          <ul className="skills" aria-label="Skills you build">
            {econversations.skills.map((s, i) => (
              <li key={s} data-reveal style={{ ['--i' as string]: i }}>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <PromptDeck />
      </section>

      <section className="band" aria-labelledby="dial-h">
        <h2 id="dial-h" className="h-xl" data-reveal>
          Every lever pulls on another.
        </h2>
        <PolicyDial />
      </section>

      <section className="strip" data-tone="light">
        <p>Got a question worth arguing?</p>
        <a href={site.joinHref} target="_blank" rel="noopener noreferrer" className="btn btn--ink" data-cursor="Join">
          Join and propose one <span aria-hidden>↗</span>
        </a>
      </section>
    </>
  );
}
