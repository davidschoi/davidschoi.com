// The home-page ledger: career and life in one list, oldest first.
//
// `kind` drives the marker — 'work' gets a filled sienna square and a heavier
// title, 'life' gets a hollow one. Roles stay to a bare title here; the resume
// page carries what each one actually involved.

const timeline = [
  { year: '1988', kind: 'life', title: 'Born' },
  {
    year: '2011',
    kind: 'work',
    title: 'UC Berkeley',
    detail: 'Go Bears!',
  },
  { year: '2012', kind: 'work', title: 'Switchfly', detail: 'Web Developer' },
  { year: '2016', kind: 'work', title: 'Solver', detail: 'Developer' },
  { year: '2017', kind: 'life', title: 'Married' },
  {
    year: '2018',
    kind: 'work',
    title: 'Twitch',
    detail: 'Front End Engineer II',
  },
  {
    year: '2021',
    kind: 'work',
    title: 'Lyft',
    detail: 'Senior Software Engineer',
  },
  { year: '2022', kind: 'life', title: '1st baby' },
  {
    year: '2023',
    kind: 'work',
    title: 'Yahoo',
    detail: 'Senior Software Engineer',
  },
  { year: '2024', kind: 'life', title: '2nd baby' },
  {
    year: '2024',
    kind: 'work',
    title: 'Nextdoor',
    detail: 'Senior Software Engineer',
  },
  {
    year: '2025',
    kind: 'work',
    title: 'Wander',
    detail: 'Staff Product Engineer',
  },
];

export default timeline;
