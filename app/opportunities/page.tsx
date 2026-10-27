import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHead } from '@/components/site/PageHead';
import { OpportunityExplorer } from '@/components/site/OpportunityExplorer';
import { categoryLabels, opportunities } from '@/content/opportunities';

export const metadata: Metadata = {
  title: 'Opportunities',
  description: 'Economics olympiads, essay prizes, investment and case competitions open to high school students.',
};

export default function OpportunitiesPage() {
  const counts = Object.entries(categoryLabels).map(([k, label]) => ({ label, n: opportunities.filter((o) => o.category === k).length }));
  return (
    <>
      <PageHead
        title="Compete, write, pitch."
        lede="Economics competitions open to students outside the US. Each tile shows the months it usually runs; tap one for the organiser's official page. Listing one is not an endorsement."
      >
        <dl className="tally tally--head">
          <div>
            <dt>Competitions</dt>
            <dd>{opportunities.length}</dd>
          </div>
          {counts.map((c) => (
            <div key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.n}</dd>
            </div>
          ))}
        </dl>
      </PageHead>
      <section className="band band--tight">
        <Suspense>
          <OpportunityExplorer />
        </Suspense>
      </section>
    </>
  );
}
