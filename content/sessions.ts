// Supplied session photography. Seven scenes, plus close crops cut from the
// high-resolution originals so a page never shows the same frame twice.
// Focal points keep faces in frame however the image is cropped. Every
// identifiable student needs publication permission before launch.
export const photos = {
  panel: { src: '/img/sessions/panel.webp', alt: 'Five students present together at the front of a full classroom', focal: '55% 45%' },
  panelClose: { src: '/img/sessions/panel-close.webp', alt: 'Five presenters take questions in front of the whiteboard', focal: '50% 40%' },
  goals: { src: '/img/sessions/goals-of-firms.webp', alt: 'Two students present a slide on the main goals of firms to a full classroom', focal: '50% 60%' },
  goalsClose: { src: '/img/sessions/goals-close.webp', alt: 'Students listen as two presenters walk through the goals of firms', focal: '50% 50%' },
  pitch: { src: '/img/sessions/pitch.webp', alt: 'Four students pitch why their stock is a sustainable pick for the future', focal: '45% 55%' },
  roleplay: { src: '/img/sessions/role-play.webp', alt: 'Students laughing during an economic role-play at a whiteboard table', focal: '62% 40%' },
  notes: { src: '/img/sessions/role-play-notes.webp', alt: 'Marketing ideas written straight onto the table during a role-play', focal: '50% 50%' },
  laugh: { src: '/img/sessions/role-play-laugh.webp', alt: 'Two students laugh mid-argument during a role-play', focal: '50% 35%' },
  advantage: { src: '/img/sessions/comparative-advantage.webp', alt: 'Three students in blazers discuss comparative advantage in front of a projected slide', focal: '45% 45%' },
  together: { src: '/img/sessions/working-together.webp', alt: 'Students working together around laptops and notes', focal: '60% 40%' },
  stocks: { src: '/img/sessions/stock-analysis.webp', alt: 'A student presents a five-year stock price trend analysis', focal: '40% 50%' },
} as const;

export type PhotoKey = keyof typeof photos;

export const sessionStory: { title: string; line: string; photo: PhotoKey }[] = [
  { title: 'Present and defend an idea', line: 'Stand up, make the case, take the questions.', photo: 'goals' },
  { title: 'Pitch it as a team', line: 'Five voices, one argument.', photo: 'panelClose' },
  { title: 'Work through a scenario', line: 'Play the firm. Write the plan on the table.', photo: 'notes' },
  { title: 'Get challenged, laugh, go again', line: 'The best sessions get loud.', photo: 'laugh' },
];
