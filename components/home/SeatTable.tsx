import { team } from '@/content/team';
import { site } from '@/content/site';
import { econversations } from '@/content/econversations';
import { asset } from '@/lib/asset';

/**
 * "Take a seat at the table", drawn literally: the committee around a table
 * with tonight's question on it, and one empty seat that is a link to join.
 */
export function SeatTable() {
  // Vedant takes the bottom-right seat; the empty "You" seat sits top-left.
  const [first, ...rest] = team;
  const top = rest.slice(0, 2);
  const bottom = [...rest.slice(2), first];
  const seat = (m: (typeof team)[number], i: number) => (
    <li className="seat" key={m.name} style={{ ['--i' as string]: i }}>
      <span className="seat__face">{m.photo && <img src={asset(m.photo)} alt="" loading="lazy" />}</span>
      <span className="seat__name">{m.name.split(' ')[0]}</span>
    </li>
  );
  return (
    <div className="table" data-reveal>
      <ul className="table__row">
        <li className="seat seat--you" style={{ ['--i' as string]: 0 }}>
          <a href={site.joinHref} target="_blank" rel="noopener noreferrer" data-cursor="Sit">
            <span className="seat__face">
              <b aria-hidden>+</b>
            </span>
            <span className="seat__name">You</span>
            <span className="sr-only">Take this seat: join IYE (opens in a new tab)</span>
          </a>
        </li>
        {top.map((m, i) => seat(m, i + 1))}
      </ul>
      <div className="table__top">
        <span className="table__card">On the table</span>
        <p>{econversations.prompts[2]}</p>
      </div>
      <ul className="table__row">
        {bottom.map((m, i) => seat(m, i + 3))}
      </ul>
    </div>
  );
}
