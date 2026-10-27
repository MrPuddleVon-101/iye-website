import type { Metadata } from 'next';
import { PageHead } from '@/components/site/PageHead';
import { ResourceExplorer } from '@/components/site/ResourceExplorer';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Curated economics, financial literacy and debate resources chosen by IYE.',
};

export default function ResourcesPage() {
  return (
    <>
      <PageHead title="Read less. Understand more." lede="A short shelf. Every link checked by a member." />
      <section className="band band--tight">
        <ResourceExplorer />
      </section>
    </>
  );
}
