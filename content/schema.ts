import { z } from 'zod';

// Every editable fact on the site is parsed through one of these schemas at
// build time. A bad record fails `next build` instead of reaching the page.

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD');

export const ClaimSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  status: z.enum(['verified', 'estimated', 'planned', 'draft']),
  evidence: z.string().min(1),
  approvedBy: z.string().optional(),
  lastVerified: isoDate.optional(),
});

export const MetricSchema = z.object({
  id: z.string().min(1),
  claimId: z.string().min(1),
  value: z.number().int().nonnegative(),
  suffix: z.string(),
  label: z.string().min(1),
  status: z.enum(['verified', 'estimated', 'planned', 'hidden']),
  sourceNote: z.string().min(1, 'Published metrics need a verification note'),
  lastVerified: isoDate,
});

export const ConceptSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  card: z.string().min(1),
  question: z.string().min(1),
});

export const ChapterSchema = z.object({
  n: z.string(),
  concept: z.string(),
  heading: z.string().min(1),
  body: z.string().min(1),
  question: z.string().min(1),
  widget: z.enum(['scarcity', 'incentives', 'markets', 'institutions', 'growth', 'models', 'iye']),
  economist: z.string().optional(),
});

export const EconomistSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  years: z.string(),
  idea: z.string().min(1),
  line: z.string().min(1),
  photo: z.string().min(1),
  photoSource: z.string().min(1),
  quote: z
    .object({ text: z.string().min(1), source: z.string().min(1, 'Quotes need a source') })
    .optional(),
});

export const ProgrammeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  points: z.array(z.string()).min(1),
  skills: z.array(z.string()),
  format: z.string(),
  audience: z.string(),
  status: z.enum(['active', 'past', 'planned']),
  photo: z.string().optional(),
  evidence: z.array(z.string()),
});

export const OpportunitySchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    organiser: z.string().min(1),
    summary: z.string().min(1),
    officialUrl: z.string().url(),
    category: z.enum(['olympiad', 'essay', 'investment', 'case']),
    window: z.string().min(1),
    months: z.array(z.number().int().min(1).max(12)),
    participation: z.enum(['individual', 'team', 'either']),
    delivery: z.enum(['online', 'in-person', 'hybrid', 'unknown']),
    cost: z.enum(['free', 'paid', 'unknown']),
    level: z.enum(['beginner', 'intermediate', 'advanced', 'all']),
    status: z.enum(['open', 'upcoming', 'closed', 'evergreen']),
    deadline: isoDate.optional(),
    deadlineTimezone: z.string().optional(),
    eligibleRegions: z.array(z.string()).optional(),
    iyeRelationship: z.enum(['participated', 'preparing', 'recommended', 'none']),
    participationYear: z.string().optional(),
    lastReviewed: isoDate,
    sourceUrl: z.string().url(),
    notes: z.string().optional(),
  })
  .refine((o) => !(o.status === 'open' && o.deadline && new Date(o.deadline) < new Date('2000-01-01')), {
    message: 'Open opportunity with an impossible deadline',
  });

export const ResourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['article', 'guide', 'video', 'worksheet', 'external']),
  topics: z.array(z.string()),
  level: z.enum(['starter', 'developing', 'advanced']),
  href: z.string().min(1),
  internal: z.boolean(),
  authorOrSource: z.string().optional(),
  lastReviewed: isoDate.optional(),
});

export const TeamMemberSchema = z.object({
  name: z.string().min(1, 'Team members need a name'),
  role: z.string().optional(),
  photo: z.string().optional(),
  shortBio: z.string().optional(),
  linkedin: z.string().url().optional(),
  order: z.number(),
  published: z.boolean(),
});

export type Claim = z.infer<typeof ClaimSchema>;
export type Metric = z.infer<typeof MetricSchema>;
export type Concept = z.infer<typeof ConceptSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type Economist = z.infer<typeof EconomistSchema>;
export type Programme = z.infer<typeof ProgrammeSchema>;
export type Opportunity = z.infer<typeof OpportunitySchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
