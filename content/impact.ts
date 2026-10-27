import { ClaimSchema, MetricSchema } from './schema';

// Claims ledger: every number on the site points at one of these.
export const claims = ClaimSchema.array().parse([
  {
    id: 'reach-200',
    text: '200+ people reached',
    status: 'verified',
    evidence: 'Confirmed by the IYE committee in the website PRD (v1.0).',
    approvedBy: 'IYE committee',
    lastVerified: '2026-10-27',
  },
  {
    id: 'sessions-20',
    text: '20+ workshops and sessions delivered',
    status: 'verified',
    evidence: 'Confirmed by the IYE committee in the website PRD (v1.0).',
    approvedBy: 'IYE committee',
    lastVerified: '2026-10-27',
  },
  {
    id: 'competitions-10',
    text: '10+ competitions participated in or engaged with',
    status: 'verified',
    evidence: 'Confirmed by the IYE committee in the website PRD (v1.0).',
    approvedBy: 'IYE committee',
    lastVerified: '2026-10-27',
  },
]);

const allMetrics = MetricSchema.array().parse([
  { id: 'reach', claimId: 'reach-200', value: 200, suffix: '+', label: 'people reached', status: 'verified', sourceNote: 'Committee-confirmed', lastVerified: '2026-10-27' },
  { id: 'sessions', claimId: 'sessions-20', value: 20, suffix: '+', label: 'workshops and sessions', status: 'verified', sourceNote: 'Committee-confirmed', lastVerified: '2026-10-27' },
  { id: 'competitions', claimId: 'competitions-10', value: 10, suffix: '+', label: 'competitions', status: 'verified', sourceNote: 'Committee-confirmed', lastVerified: '2026-10-27' },
]);

for (const m of allMetrics) {
  if (!claims.some((c) => c.id === m.claimId)) throw new Error(`Metric ${m.id} has no claim ${m.claimId}`);
}

// Production shows verified figures only; estimated ones would need an
// "approximately" label, planned and hidden ones never render.
export const metrics = allMetrics.filter((m) => m.status === 'verified');
