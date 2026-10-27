import { Room } from '@/components/home/Room';
import { EconomistGallery } from '@/components/home/EconomistGallery';
import { IyeOverview } from '@/components/home/IyeOverview';
import { SessionStory } from '@/components/home/SessionStory';
import { EconversationsFeature, FinalCta, OpportunityPreview, TeamPreview } from '@/components/home/Sections';

export default function Home() {
  return (
    <>
      <Room />
      <EconomistGallery />
      <IyeOverview />
      <TeamPreview />
      <SessionStory />
      <EconversationsFeature />
      <OpportunityPreview />
      <FinalCta />
    </>
  );
}
