import { EconomistSchema } from './schema';

// A breadth of ideas, presented as an exchange of perspectives. Listing an
// economist here does not mean IYE endorses every view they held.
// Quotes are short and each one carries a bibliographic source.
// photoSource: portraits were supplied by IYE; record the licence for each
// before public launch (PRD section 24, item 7).
export const economists = EconomistSchema.array().parse([
  {
    id: 'smith',
    name: 'Adam Smith',
    years: '1723 – 1790',
    idea: 'Exchange & specialisation',
    line: 'Trade and the division of labour make everyone richer than going it alone.',
    photo: '/img/economists/smith.webp',
    photoSource: 'Supplied by IYE. Public-domain portrait; licence record to confirm.',
    quote: {
      text: 'It is not from the benevolence of the butcher, the brewer, or the baker, that we expect our dinner, but from their regard to their own interest.',
      source: 'The Wealth of Nations (1776), Book I, Ch. II',
    },
  },
  {
    id: 'keynes',
    name: 'John Maynard Keynes',
    years: '1883 – 1946',
    idea: 'Uncertainty & demand',
    line: 'When spending collapses, waiting for markets to fix themselves can take too long.',
    photo: '/img/economists/keynes.webp',
    photoSource: 'Supplied by IYE. Licence record to confirm.',
    quote: { text: 'In the long run we are all dead.', source: 'A Tract on Monetary Reform (1923), Ch. 3' },
  },
  {
    id: 'hayek',
    name: 'Friedrich Hayek',
    years: '1899 – 1992',
    idea: 'Dispersed knowledge',
    line: 'No planner knows what millions of people know. Prices pass that knowledge along.',
    photo: '/img/economists/hayek.webp',
    photoSource: 'Supplied by IYE. Licence record to confirm.',
    quote: {
      text: 'The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.',
      source: 'The Fatal Conceit (1988), p. 76',
    },
  },
  {
    id: 'sen',
    name: 'Amartya Sen',
    years: 'b. 1933',
    idea: 'Capabilities & welfare',
    line: 'Judge development by what people are actually free to do and be.',
    photo: '/img/economists/sen.webp',
    photoSource: 'Supplied by IYE. Licence record to confirm.',
    quote: {
      text: 'Development can be seen as a process of expanding the real freedoms that people enjoy.',
      source: 'Development as Freedom (1999), Introduction',
    },
  },
  {
    id: 'ostrom',
    name: 'Elinor Ostrom',
    years: '1933 – 2012',
    idea: 'Governing the commons',
    line: 'Communities can manage shared resources without either the state or the market taking over.',
    photo: '/img/economists/ostrom.webp',
    photoSource: 'Supplied by IYE. Licence record to confirm.',
  },
  {
    id: 'robinson',
    name: 'Joan Robinson',
    years: '1903 – 1983',
    idea: 'Imperfect competition',
    line: 'Real markets have power in them, and theory should say so.',
    photo: '/img/economists/robinson.webp',
    photoSource: 'Supplied by IYE. Licence record to confirm.',
    quote: {
      text: 'The purpose of studying economics is not to acquire a set of ready-made answers to economic questions, but to learn how to avoid being deceived by economists.',
      source: 'Marx, Marshall and Keynes (1955)',
    },
  },
  {
    id: 'duflo',
    name: 'Esther Duflo',
    years: 'b. 1972',
    idea: 'Evidence in development',
    line: 'Test policies with field experiments instead of arguing in the abstract.',
    photo: '/img/economists/duflo.webp',
    photoSource: 'Supplied by IYE. Licence record to confirm.',
  },
  {
    id: 'schelling',
    name: 'Thomas Schelling',
    years: '1921 – 2016',
    idea: 'Strategy & coordination',
    line: 'Small individual choices can add up to outcomes nobody intended.',
    photo: '/img/economists/schelling.webp',
    photoSource: 'Supplied by IYE. Licence record to confirm.',
  },
]);
