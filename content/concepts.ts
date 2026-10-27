import { ChapterSchema, ConceptSchema } from './schema';

// The eight nodes orbiting the hero. Order is the keyboard order.
export const concepts = ConceptSchema.array().parse([
  { id: 'scarcity', label: 'Scarcity', card: 'Time, money and attention run out. Every yes is a no to something else.', question: 'What did your last free hour cost you?' },
  { id: 'incentives', label: 'Incentives', card: 'Prices, rules and rewards nudge what people actually do.', question: 'Why do sugar taxes change what students buy?' },
  { id: 'tradeoffs', label: 'Trade-offs', card: 'Policies rarely win on every front. Something gives.', question: 'Lower inflation or lower unemployment?' },
  { id: 'markets', label: 'Markets', card: 'Millions of choices set prices without a central planner.', question: 'Who decided what your lunch costs?' },
  { id: 'institutions', label: 'Institutions', card: 'Laws, norms and trust are the rules of the game.', question: 'Why do some countries grow and others stall?' },
  { id: 'growth', label: 'Growth', card: 'How big the economy gets, and how fast.', question: 'Does a bigger pie mean a bigger slice for you?' },
  { id: 'inequality', label: 'Inequality', card: 'Who gets what, and whether that is fair.', question: 'Is fairness an economic question?' },
  { id: 'behaviour', label: 'Behaviour', card: 'Real people are not calculators. Habits and biases matter.', question: 'Why do we pay for gym memberships we never use?' },
]);

export const chapters = ChapterSchema.array().parse([
  {
    n: '01',
    concept: 'scarcity',
    heading: 'Every choice has a price tag.',
    body: 'You have one evening. Spend it revising and you give up the match, the call, the sleep. That lost alternative is the opportunity cost, and it exists even when no money changes hands.',
    question: 'Pick one. What did it cost?',
    widget: 'scarcity',
  },
  {
    n: '02',
    concept: 'incentives',
    heading: 'Change the reward, change the behaviour.',
    body: 'A small tax, a subsidy, a fine or a prize can shift what thousands of people do. Policy works through incentives, and sometimes backfires through them too.',
    question: 'Add a tax. Watch demand respond.',
    widget: 'incentives',
  },
  {
    n: '03',
    concept: 'markets',
    heading: 'Markets coordinate. Not perfectly.',
    body: 'Prices carry information between buyers and sellers who never meet. But power, missing information and side effects on others mean markets can fail.',
    question: 'Drag demand. Find the new price.',
    widget: 'markets',
    economist: 'hayek',
  },
  {
    n: '04',
    concept: 'institutions',
    heading: 'Someone writes the rules.',
    body: 'Property rights, courts, contracts and plain trust decide whether effort pays off. Same people, different rules, very different outcomes.',
    question: 'Switch on trust. See what organises.',
    widget: 'institutions',
    economist: 'ostrom',
  },
  {
    n: '05',
    concept: 'growth',
    heading: 'How much, and for whom?',
    body: 'Growth answers how big the pie gets. Distribution answers who gets which slice. A larger economy does not settle the fairness question on its own.',
    question: 'Grow the pie. Then decide the slices.',
    widget: 'growth',
    economist: 'sen',
  },
  {
    n: '06',
    concept: 'tradeoffs',
    heading: 'An argument, with evidence.',
    body: 'Different models start from different assumptions, so economists can look at the same data and disagree. The skill is testing which assumption holds.',
    question: 'Same recession. Two lenses.',
    widget: 'models',
    economist: 'keynes',
  },
  {
    n: '07',
    concept: 'behaviour',
    heading: 'That is where IYE begins.',
    body: 'We take these ideas off the page and into the room: debate them, model them, critique them and apply them to what is happening right now.',
    question: 'Ready to argue about it?',
    widget: 'iye',
  },
]);
