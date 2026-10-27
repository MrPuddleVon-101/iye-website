import { TeamMemberSchema } from './schema';

// Roles are deliberately unset: they have not been supplied yet and must not
// be inferred. Add `role: '...'` once confirmed and it will appear on the card.
// Order is display order.
export const team = TeamMemberSchema.array()
  .parse([
    { name: 'Richelle Luhur', photo: '/img/team/richelle-luhur.webp', linkedin: 'https://www.linkedin.com/in/richelle-luhur-249914328/', order: 2, published: true },
    { name: 'Chng En', photo: '/img/team/chng-en.webp', linkedin: 'https://www.linkedin.com/in/en-chng-ernest/', order: 4, published: true },
    { name: 'Kaya Velankar', photo: '/img/team/kaya-velankar.webp', linkedin: 'https://www.linkedin.com/in/kaya-velankar-4191a7376/', order: 3, published: true },
    { name: 'Vedant Rastogi', photo: '/img/team/vedant-rastogi.webp', linkedin: 'https://www.linkedin.com/in/vedant-rastogi-a9959938b', order: 1, published: true },
    { name: 'Chris Huray', photo: '/img/team/chris-huray.webp', order: 5, published: true },
  ])
  .filter((m) => m.published)
  .sort((a, b) => a.order - b.order);
