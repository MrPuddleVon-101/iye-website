'use client';

import Link from 'next/link';
import { resources } from '@/content/resources';
import { FilterBar, useQueryFilters, type FilterGroup } from './Filters';

const topics = Array.from(new Set(resources.flatMap((r) => r.topics))).sort();
const kind: Record<string, string> = { guide: 'IYE guide', article: 'Read', video: 'Watch or listen', worksheet: 'Worksheet', external: 'Explore' };
const groups: FilterGroup[] = [
  { key: 'topic', label: 'Topic', options: topics.map((t) => ({ value: t, label: t })) },
  { key: 'level', label: 'Level', options: [{ value: 'starter', label: 'Starter' }, { value: 'developing', label: 'Developing' }, { value: 'advanced', label: 'Advanced' }] },
  { key: 'type', label: 'Type', options: [{ value: 'guide', label: 'IYE guides' }, { value: 'article', label: 'Read' }, { value: 'video', label: 'Watch or listen' }, { value: 'external', label: 'Data & tools' }] },
];

export function ResourceExplorer() {
  const [sel, setSel] = useQueryFilters(groups.map((g) => g.key));
  const list = resources.filter(
    (r) => (!sel.topic || r.topics.includes(sel.topic)) && (!sel.level || r.level === sel.level) && (!sel.type || r.type === sel.type),
  );

  return (
    <>
      <FilterBar groups={groups} sel={sel} onChange={setSel} count={list.length} noun="resources" />
      {list.length ? (
        <ul className="shelf" key={list.map((r) => r.id).join()}>
          {list.map((r, i) => {
            const body = (
              <>
                <span className="shelf__kind">{kind[r.type]}</span>
                <strong>{r.title}</strong>
                <span className="shelf__desc">{r.description}</span>
                <span className="shelf__foot">
                  <span>{r.authorOrSource}</span>
                  <span className="shelf__lvl">{r.level}</span>
                </span>
                <span className="shelf__arrow" aria-hidden>
                  {r.internal ? '→' : '↗'}
                </span>
              </>
            );
            return (
              <li key={r.id} className={`shelf__item${r.internal ? ' shelf__item--ours' : ''}`} style={{ ['--i' as string]: i % 6 }}>
                {r.internal ? (
                  <Link href={r.href} data-cursor="Open">
                    {body}
                  </Link>
                ) : (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
                    {body}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="empty">
          <p className="h-l">Nothing here.</p>
          <p>Try a broader topic, or clear the filters.</p>
          <button type="button" className="btn btn--ghost" onClick={() => setSel({})}>
            Show all
          </button>
        </div>
      )}
    </>
  );
}
