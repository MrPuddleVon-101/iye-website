'use client';

import { categoryLabels, effectiveStatus, opportunities, soonestFirst } from '@/content/opportunities';
import { CompGrid } from './CompGrid';
import { FilterBar, useQueryFilters, type FilterGroup } from './Filters';

const groups: FilterGroup[] = [
  { key: 'type', label: 'Type', options: Object.entries(categoryLabels).map(([value, label]) => ({ value, label })) },
  { key: 'who', label: 'Who', options: [{ value: 'individual', label: 'Solo' }, { value: 'team', label: 'Team' }] },
  { key: 'cost', label: 'Cost', options: [{ value: 'free', label: 'Free' }, { value: 'paid', label: 'Paid' }] },
  { key: 'level', label: 'Level', options: [{ value: 'beginner', label: 'Starting out' }, { value: 'intermediate', label: 'Some experience' }, { value: 'advanced', label: 'Advanced' }] },
];

export function OpportunityExplorer() {
  const [sel, setSel] = useQueryFilters(groups.map((g) => g.key));

  const matches = opportunities.filter((o) => {
    if (sel.type && o.category !== sel.type) return false;
    if (sel.who && o.participation !== sel.who && o.participation !== 'either') return false;
    if (sel.cost && o.cost !== sel.cost) return false;
    if (sel.level && o.level !== sel.level && o.level !== 'all') return false;
    return true;
  });
  const live = soonestFirst(matches.filter((o) => effectiveStatus(o) !== 'closed'));
  const archive = matches.filter((o) => effectiveStatus(o) === 'closed');

  return (
    <>
      <FilterBar groups={groups} sel={sel} onChange={setSel} count={live.length} noun="competitions" />
      {live.length ? (
        <CompGrid items={live} />
      ) : (
        <div className="empty">
          <p className="h-l">Nothing matches.</p>
          <p>Try removing the level or cost filter.</p>
          <button type="button" className="btn btn--ghost" onClick={() => setSel({})}>
            Show everything
          </button>
        </div>
      )}
      {archive.length > 0 && (
        <details className="archive">
          <summary>Closed this cycle ({archive.length})</summary>
          <CompGrid items={archive} />
        </details>
      )}
    </>
  );
}
