/**
 * Program posters shown on the program pages.
 * Put this file at: src/data/programPosters.ts
 * Image files go in: public/images/programs/
 */
export interface ProgramPoster {
  url: string;
  title: string;
  /** Description shown under the poster on the program page */
  caption: string;
  /** Screen-reader / SEO alt text */
  alt: string;
}

const base = '/images/programs/';

export const PROGRAM_POSTERS = {
  teacherTraining: {
    url: `${base}Yoga_Teacher_Training_Program.jpeg`,
    title: 'Yoga Teacher Training Program',
    caption:
      'From beginner to certified yoga teacher: a comprehensive 5-month online program for beginners and aspiring yoga teachers. One program, four certifications: Yoga Pravesh, Yoga Parichay, YCB Level 1 and YCB Level 2, with examinations conducted online. You will learn practical yoga, asana, pranayama, meditation, yoga philosophy, anatomy & physiology, teaching methodology and the scientific foundations of yoga. Admissions open; the batch begins in November.',
    alt: 'Yoga Teacher Training Program poster: 5-month online program, admissions open, batch begins in November, four certifications',
  },
  theoryTtc: {
    url: `${base}Theory_Focused_TTC_Batch.jpeg`,
    title: 'Theory-Focused TTC Batch',
    caption:
      'Upcoming Theory-Focused TTC Batch for those who already have a personal yoga practice and wish to study the philosophy, scriptures and science of Yoga in depth. You will study the Patanjali Yoga Sutras, Hatha Yoga Pradipika and Gheranda Samhita, selected portions of the Bhagavad Gita, an introduction to the Upanishads and Darshanas, the scientific understanding of yogic practices, the mind and stress management, the yogic approach to disease management, and practical sessions on teaching methodology. Duration 1.5 months, tentative start 1st November; class timings to be decided together.',
    alt: 'Theory-Focused TTC Batch poster: 1.5 months, tentative start 1st November, Ishwari Yoga Institute',
  },
  ttcPreparation: {
    url: `${base}TTC_Preparation_Batch.jpeg`,
    title: 'TTC Preparation Batch - IYA Foundation & 200 Hours CCY (Theory)',
    caption:
      'For those who already have a personal yoga practice and wish to study the philosophy, scriptures and science of Yoga in depth. You will study the Patanjali Yoga Sutras, Hatha Yoga Pradipika and Gheranda Samhita, selected portions of the Bhagavad Gita, an introduction to the Upanishads and Darshanas, the scientific understanding of yogic practices, the mind and stress management, the yogic approach to disease management, and the complete CCY theory syllabus (up to 200 hours). The course includes complete theory preparation for the IYA Foundation and 200 hours CCY (theory) exams, 2 practical sessions on teaching methodology, recordings of all sessions, detailed digital theory notes and study material, MCQ, viva and theoretical speech practice, and guidance for the IYA Foundation and CCY exams. You can give the exam in English, Hindi or Marathi; teaching is in Hindi, with exam preparation support in your preferred language. This theory-only batch runs 1.5 months from 21st October on Tuesday, Wednesday and Thursday, with 7-8 AM or 7-8 PM timing options (final timing decided together with participants). Fees: Rs 25,000 (tuition fees and IYA exam fees included; CCY exam fees excluded). Optional complete 5-month program to appear for the IYA Foundation and CCY exams: Rs 60,000 (same inclusions and exclusions).',
    alt: 'TTC Preparation Batch poster: IYA Foundation and 200 hours CCY theory, 1.5 months from 21st October, fees Rs 25,000, optional 5-month program Rs 60,000',
  },
} satisfies Record<string, ProgramPoster>;

/** Look up a poster (and its description) from an image URL; undefined for ordinary photos. */
export const findPoster = (url?: string): ProgramPoster | undefined =>
  Object.values(PROGRAM_POSTERS).find(p => p.url === url);
