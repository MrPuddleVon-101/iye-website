'use client';

import { useState } from 'react';
import { econversations } from '@/content/econversations';

const pushback = [
  'What evidence would change your mind?',
  'Who loses if you are right?',
  'Which assumption are you most nervous about?',
  'Now argue the other side in one sentence.',
];

/**
 * A deck of live questions. Taking a side swings the bar and draws a
 * pushback question, because that is the point of an Econversation.
 * Nothing is recorded; it is a local toy.
 */
export function PromptDeck() {
  const prompts = econversations.prompts;
  const [i, setI] = useState(0);
  const [side, setSide] = useState<0 | -1 | 1>(0);
  const [flip, setFlip] = useState(0);

  const next = () => {
    setI((i + 1) % prompts.length);
    setSide(0);
    setFlip((f) => f + 1);
  };

  return (
    <div className="deck">
      <div className="deck__stack" aria-hidden>
        <span />
        <span />
      </div>
      <div className="deck__card" key={flip} data-tone="light">
        <p className="deck__n">
          Prompt {String(i + 1).padStart(2, '0')} / {String(prompts.length).padStart(2, '0')}
        </p>
        <p className="deck__q">{prompts[i]}</p>
        <div className="deck__tug" data-side={side} aria-hidden>
          <span />
        </div>
        <div className="deck__actions">
          <button type="button" className="btn btn--ghost btn--sm" aria-pressed={side === -1} onClick={() => setSide(-1)}>
            Disagree
          </button>
          <button type="button" className="btn btn--ghost btn--sm" aria-pressed={side === 1} onClick={() => setSide(1)}>
            Agree
          </button>
          <button type="button" className="deck__next" onClick={next} data-cursor="Next">
            Next question →
          </button>
        </div>
        <p className="deck__push" aria-live="polite">
          {side !== 0 && pushback[(i + (side === 1 ? 0 : 2)) % pushback.length]}
        </p>
      </div>
    </div>
  );
}
