import { ResourceSchema } from './schema';

const reviewed = '2026-10-27';
const ext = { internal: false, lastReviewed: reviewed };

export const resources = ResourceSchema.array().parse([
  // ---- Ours
  { id: 'run-econversation', title: 'Run your own Econversation', description: 'The eight-step session plan we use, ready to borrow.', type: 'guide', topics: ['Debate'], level: 'starter', href: '/econversations/#framework', internal: true, authorOrSource: 'IYE' },
  { id: 'policy-dial', title: 'Policy Dial', description: 'Move three levers and watch which priorities collide.', type: 'guide', topics: ['Macroeconomics'], level: 'starter', href: '/econversations/#policy-dial', internal: true, authorOrSource: 'IYE' },
  { id: 'competitions', title: 'Competition calendar', description: 'Olympiads, essay prizes and stock pitches by month.', type: 'guide', topics: ['Competitions'], level: 'developing', href: '/opportunities/', internal: true, authorOrSource: 'IYE' },

  // ---- Learn the ideas
  { ...ext, id: 'core', title: 'CORE: The Economy', description: 'A free, modern intro textbook built around real data.', type: 'external', topics: ['Microeconomics', 'Macroeconomics'], level: 'developing', href: 'https://www.core-econ.org/', authorOrSource: 'CORE Econ' },
  { ...ext, id: 'mru', title: 'Marginal Revolution University', description: 'Short, sharp video courses on micro, macro and development.', type: 'video', topics: ['Microeconomics', 'Macroeconomics'], level: 'starter', href: 'https://mru.org/', authorOrSource: 'MRU' },
  { ...ext, id: 'khan', title: 'Khan Academy economics', description: 'Bite-size videos on the fundamentals.', type: 'video', topics: ['Microeconomics', 'Macroeconomics'], level: 'starter', href: 'https://www.khanacademy.org/economics-finance-domain', authorOrSource: 'Khan Academy' },
  { ...ext, id: 'economicshelp', title: 'Economics Help', description: 'Plain explanations of almost every syllabus concept.', type: 'article', topics: ['Microeconomics', 'Macroeconomics'], level: 'starter', href: 'https://www.economicshelp.org/', authorOrSource: 'Tejvan Pettinger' },
  { ...ext, id: 'tutor2u', title: 'tutor2u Economics', description: 'Revision notes, diagrams and essay technique.', type: 'article', topics: ['Microeconomics', 'Macroeconomics'], level: 'developing', href: 'https://www.tutor2u.net/economics', authorOrSource: 'tutor2u' },
  { ...ext, id: 'econofact', title: 'EconoFact', description: 'Economists explain the evidence behind news stories.', type: 'article', topics: ['Policy'], level: 'developing', href: 'https://econofact.org/', authorOrSource: 'EconoFact' },
  { ...ext, id: 'imf-fd', title: 'IMF Finance & Development', description: 'Accessible essays on global economic debates.', type: 'article', topics: ['Global affairs', 'Macroeconomics'], level: 'advanced', href: 'https://www.imf.org/en/Publications/fandd', authorOrSource: 'International Monetary Fund' },

  // ---- Listen
  { ...ext, id: 'planet-money', title: 'Planet Money', description: 'Economics told as stories. Great before an Econversation.', type: 'video', topics: ['Policy', 'Microeconomics'], level: 'starter', href: 'https://www.npr.org/sections/money/', authorOrSource: 'NPR' },
  { ...ext, id: 'freakonomics', title: 'Freakonomics Radio', description: 'Incentives and behaviour in unexpected places.', type: 'video', topics: ['Behaviour'], level: 'starter', href: 'https://freakonomics.com/', authorOrSource: 'Freakonomics' },

  // ---- Data
  { ...ext, id: 'owid', title: 'Our World in Data', description: 'Charts on growth, poverty, health and inequality.', type: 'external', topics: ['Development', 'Data'], level: 'starter', href: 'https://ourworldindata.org/', authorOrSource: 'Our World in Data' },
  { ...ext, id: 'fred', title: 'FRED', description: 'Pull and chart thousands of macro time series in seconds.', type: 'external', topics: ['Macroeconomics', 'Data'], level: 'developing', href: 'https://fred.stlouisfed.org/', authorOrSource: 'Federal Reserve Bank of St. Louis' },
  { ...ext, id: 'worldbank-data', title: 'World Bank Open Data', description: 'Country indicators for any essay that needs evidence.', type: 'external', topics: ['Development', 'Data'], level: 'developing', href: 'https://data.worldbank.org/', authorOrSource: 'World Bank' },
  { ...ext, id: 'singstat', title: 'SingStat', description: "Singapore's official statistics, from CPI to household income.", type: 'external', topics: ['Data', 'Singapore'], level: 'developing', href: 'https://www.singstat.gov.sg/', authorOrSource: 'Department of Statistics Singapore' },

  // ---- Money and markets
  { ...ext, id: 'moneysense', title: 'MoneySense', description: "Singapore's national financial literacy programme.", type: 'external', topics: ['Financial literacy', 'Singapore'], level: 'starter', href: 'https://www.moneysense.gov.sg/', authorOrSource: 'Government of Singapore' },
  { ...ext, id: 'mas', title: 'Monetary Authority of Singapore', description: 'How Singapore runs monetary policy through the exchange rate.', type: 'external', topics: ['Macroeconomics', 'Singapore'], level: 'advanced', href: 'https://www.mas.gov.sg/', authorOrSource: 'MAS' },
  { ...ext, id: 'investopedia', title: 'Investopedia', description: 'Definitions for every finance term you will meet in a stock pitch.', type: 'article', topics: ['Financial literacy'], level: 'starter', href: 'https://www.investopedia.com/', authorOrSource: 'Investopedia' },
  { ...ext, id: 'boe-knowledge', title: 'Bank of England Knowledge Bank', description: 'Short explainers on money, inflation and interest rates.', type: 'article', topics: ['Macroeconomics'], level: 'starter', href: 'https://www.bankofengland.co.uk/knowledgebank', authorOrSource: 'Bank of England' },
]);
