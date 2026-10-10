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
  ccyResult: {
    url: `${base}CCY_Result_Announced.jpeg`,
    title: 'CCY Result Announced',
    caption:
      'CCY result announced for the IYA Certificate Course in Yoga (Teacher Training Course): all 10 students have passed the exam with distinction. Congratulations to all the successful new yoga teachers!',
    alt: 'CCY result announced: all 10 students passed the IYA Certificate Course in Yoga exam with distinction',
  },
} satisfies Record<string, ProgramPoster>;

/** Look up a poster (and its description) from an image URL; undefined for ordinary photos. */
export const findPoster = (url?: string): ProgramPoster | undefined =>
  Object.values(PROGRAM_POSTERS).find(p => p.url === url);
