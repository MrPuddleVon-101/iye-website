import type { Metadata } from 'next';
import { PageHead } from '@/components/site/PageHead';
import { site } from '@/content/site';

export const metadata: Metadata = { title: 'Privacy & images' };

export default function PrivacyPage() {
  return (
    <>
      <PageHead title="Privacy, plainly." />
      <section className="band prose">
        <h2>Data</h2>
        <p>This site has no accounts, no cookies and no analytics. The Join button opens a Google Form run by IYE; anything you enter there is held by Google and the IYE committee, and is used only for the mailing list.</p>
        <h2>Images</h2>
        <p>
          Session photographs show IYE members at {site.school}. If you appear in a photo and would like it removed, ask any committee member and it will be taken down.
        </p>
        <h2>External links</h2>
        <p>Opportunity and resource links lead to third-party sites with their own policies. Listing them is not an endorsement by IYE or SJII.</p>
        <h2>Not advice</h2>
        <p>{site.disclaimer}</p>
      </section>
    </>
  );
}
