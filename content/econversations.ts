export const econversations = {
  definition:
    'A structured conversation around a live economic question. Students take positions, test assumptions, challenge policies and revise their argument when the evidence changes.',
  // These are illustrative prompts, not a record of sessions already run.
  prompts: [
    'Should governments prioritise growth or redistribution during a slowdown?',
    'When does market power become harmful?',
    'Should central banks tolerate higher inflation to protect employment?',
    'Is financial literacy a personal responsibility or a public-policy obligation?',
  ],
  versusDebate: [
    { debate: 'Positions are fixed for the whole round', econ: 'You are expected to change your mind' },
    { debate: 'Winning the room is the goal', econ: 'Testing the assumption is the goal' },
    { debate: 'New evidence is a threat', econ: 'New evidence arrives mid-session on purpose' },
    { debate: 'Ends with a verdict', econ: 'Ends with a revised recommendation' },
  ],
  framework: [
    { step: 'Frame', text: 'Frame the real-world question.', mins: 5 },
    { step: 'Define', text: 'Establish key terms and constraints.', mins: 5 },
    { step: 'Position', text: 'Assign or choose positions.', mins: 3 },
    { step: 'Argue', text: 'Present a first argument.', mins: 10 },
    { step: 'Shock', text: 'Introduce data, a shock or a policy change.', mins: 5 },
    { step: 'Cross', text: 'Cross-question assumptions.', mins: 10 },
    { step: 'Revise', text: 'Revise the recommendation.', mins: 7 },
    { step: 'Reflect', text: 'Reflect on what changed and why.', mins: 5 },
  ],
  skills: ['Argument', 'Evidence use', 'Rebuttal', 'Listening', 'Policy critique', 'Public speaking'],
};
