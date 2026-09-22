import { StudentAccount, RecordedSession, CourseMaterial, ExamResult } from '../types';

export const initialRecordedSessions: RecordedSession[] = [
  {
    id: 'rec-101',
    programId: 'prog-ycb-education',
    title: 'Orientation & Vedic Foundations: The Shad-Darshanas & Yogic Origin',
    sessionNumber: 1,
    moduleName: 'Foundations & Philosophy',
    instructor: 'Devika Bhide (M.A. Yogashastra)',
    duration: '1 hr 18 min',
    dateRecorded: '2026-08-04',
    videoUrl: 'https://www.youtube-nocookie.com/embed/v7AYKMP6rOE?rel=0', // Educational yoga philosophy lecture reference
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    summary: 'An illuminating introduction to the Vedic tradition, distinguishing Samkhya dualism from Patanjali’s Yoga psychology, and outlining the five-month journey through Yoga Pravesh to YCB Level 2.',
    keyTopics: ['Vedic origins of Yoga', 'Shad-Darshana (Six Orthodox Systems)', 'Samkhya Tattvas', 'Sadhana attitude']
  },
  {
    id: 'rec-102',
    programId: 'prog-ycb-education',
    title: 'Patanjali Yoga Sutras: Samadhi Pada (Sutras 1.1 to 1.16) - Chitta Vritti Nirodha',
    sessionNumber: 2,
    moduleName: 'Classical Scripture Studies',
    instructor: 'Devika Bhide (M.A. Yogashastra)',
    duration: '1 hr 25 min',
    dateRecorded: '2026-08-07',
    videoUrl: 'https://www.youtube-nocookie.com/embed/GLy2rKs5Jkg?rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    summary: 'A deep verse-by-verse exploration of "Atha Yoganusasanam", the five modifications of the mind (Klishta vs Aklishta Vrittis), and the dual pillars of Abhyasa (unbroken practice) and Vairagya (non-attachment).',
    keyTopics: ['Pramana, Viparyaya, Vikalpa, Nidra, Smriti', 'Abhyasa criteria (Dirghakala, Nairantarya, Satkara)', 'Drashta Svarupe Avasthanam']
  },
  {
    id: 'rec-103',
    programId: 'prog-ycb-education',
    title: 'Shatkarma Practicals: Jala Neti, Sutra Neti & Kapalabhati Cleansing',
    sessionNumber: 3,
    moduleName: 'Shuddhi Kriyas & Physiology',
    instructor: 'Shweta Vaikunthe (M.A. Yogashastra)',
    duration: '1 hr 12 min',
    dateRecorded: '2026-08-11',
    videoUrl: 'https://www.youtube-nocookie.com/embed/b1H3xO3x_Js?rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    summary: 'Practical clinical instructions on saline preparation for Jala Neti, preventing sinus irritation, the neuro-mucosal reflexes, and performing Kapalabhati with correct diaphragmatic recoil.',
    keyTopics: ['Saline density and temperature', 'Vagus nerve stimulation via sinus lavage', 'Diaphragmatic mechanics in Kapalabhati', 'Contraindications (hypertension, vertigo)']
  },
  {
    id: 'rec-104',
    programId: 'prog-ycb-education',
    title: 'Pranayama Bioenergetics: Nadishodhana, Ujjayi & Autonomic Balance',
    sessionNumber: 4,
    moduleName: 'Pranic Science & Nervous System',
    instructor: 'Devika Bhide (M.A. Yogashastra)',
    duration: '1 hr 08 min',
    dateRecorded: '2026-08-14',
    videoUrl: 'https://www.youtube-nocookie.com/embed/g_tea8ZNk5A?rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=800&auto=format&fit=crop',
    summary: 'Scientific analysis of alternative nostril breathing, Ida and Pingala hemispheric balance, and our research findings on salivary cortisol and heart rate variability (HRV) during controlled Kumbhaka.',
    keyTopics: ['Puraka, Rechaka, Kumbhaka ratios (1:4:2:2)', 'Sympathetic vs Parasympathetic balance', 'Vocal cord positioning in Ujjayi', 'Prana Vayus']
  },
  {
    id: 'rec-105',
    programId: 'prog-ycb-education',
    title: 'Asana Biomechanics: Surya Namaskara 12-Step Classical Alignment',
    sessionNumber: 5,
    moduleName: 'Asana Alignment & Pedagogy',
    instructor: 'Shweta Vaikunthe (M.A. Yogashastra)',
    duration: '1 hr 34 min',
    dateRecorded: '2026-08-18',
    videoUrl: 'https://www.youtube-nocookie.com/embed/7V6m6e1n58Q?rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    summary: 'Precise postural anatomy for each of the 12 steps of classical Surya Namaskara, focusing on lumbar safety, scapular retraction in Bhujangasana, and synchronized breathing cues for teachers.',
    keyTopics: ['Pranamasana to Parvatasana alignment', 'Pelvic tilt in Ashwa Sanchalanasana', 'Teaching voice modulation and verbal cues', 'Modification props']
  },
  {
    id: 'rec-106',
    programId: 'prog-ycb-education',
    title: 'Applied Yogic Anatomy: The Spine, Pelvic Floor & Core Stabilization',
    sessionNumber: 6,
    moduleName: 'Applied Anatomy & Physiology',
    instructor: 'Shweta Vaikunthe (M.A. Yogashastra)',
    duration: '1 hr 15 min',
    dateRecorded: '2026-08-22',
    videoUrl: 'https://www.youtube-nocookie.com/embed/H3v_r_W9Vw8?rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    summary: 'A detailed breakdown of spinal curves (cervical, thoracic, lumbar), Mula Bandha mechanics with transversus abdominis co-activation, and preventing common knee hyperextension injuries.',
    keyTopics: ['Spinal decompression in backbends', 'Mula and Uddiyana Bandhas', 'Sacroiliac joint safety in twists', 'Common student compensations']
  },
  // Level 1 Sessions
  {
    id: 'rec-201',
    programId: 'prog-ycb-l1',
    title: 'YCB Level 1 Protocol: Common Yoga Protocol (CYP) Step-by-Step Guidance',
    sessionNumber: 1,
    moduleName: 'YCB Protocol Examination Prep',
    instructor: 'Devika Bhide (M.A. Yogashastra)',
    duration: '1 hr 10 min',
    dateRecorded: '2026-09-02',
    videoUrl: 'https://www.youtube-nocookie.com/embed/v7AYKMP6rOE?rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    summary: 'Complete review of the Ministry of AYUSH Common Yoga Protocol (CYP) designed for International Day of Yoga (IDY), with live exam scoring parameters.',
    keyTopics: ['CYP 45-minute sequence', 'Opening prayer with correct chanting', 'Shithilikarana Vyayama', 'Exam viva questions']
  },
  {
    id: 'rec-301',
    programId: 'prog-prenatal',
    title: 'Garbha Sanskar, Prenatal Physiology & Trimester-Safe Asana Modifications',
    sessionNumber: 1,
    moduleName: 'Prenatal & Postnatal Care',
    instructor: 'Devika Bhide (M.A. Yogashastra)',
    duration: '1 hr 20 min',
    dateRecorded: '2026-07-15',
    videoUrl: 'https://www.youtube-nocookie.com/embed/GLy2rKs5Jkg?rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    summary: 'Evidence-based protocols combining traditional Garbha Sanskar philosophies with obstetric safety, pelvic floor preparation for labour, and trimester adaptations.',
    keyTopics: ['Relaxin hormone biomechanics', 'Avoiding supine hypotension', 'Supported Baddha Konasana', 'Gentle Bhramari for maternal anxiety']
  }
];

export const initialCourseMaterials: CourseMaterial[] = [
  {
    id: 'mat-101',
    programId: 'prog-ycb-education',
    title: 'Comprehensive 5-Month Syllabus & Academic Curriculum Prospectus',
    category: 'Syllabus & Curriculum',
    type: 'pdf',
    fileSize: '4.2 MB',
    description: 'Detailed modular schedule, reading assignments, examination syllabus for Yoga Pravesh, Yoga Parichay, YCB Level 1 & YCB Level 2.',
    downloadFileName: 'Ishwari_Yoga_Teacher_Education_5Month_Curriculum.pdf',
    contentSnippet: 'Module 1: Foundations of Yogashastra. Module 2: Patanjali Yoga Sutra Studies (Samadhi & Sadhana Padas). Module 3: Hatha Pradipika & Gheranda Samhita Cleansing. Module 4: Anatomy & Biomechanics. Module 5: Pedagogy & Practical Exam Protocols.'
  },
  {
    id: 'mat-102',
    programId: 'prog-ycb-education',
    title: 'Patanjali Yoga Sutras: Sanskrit Text, Transliteration & Scholarly Commentary',
    category: 'Philosophy & Sutras',
    type: 'pdf',
    fileSize: '16.8 MB',
    description: 'Complete word-by-word Devanagari translation with philosophical exposition by Devika Bhide and Shweta Vaikunthe.',
    downloadFileName: 'Patanjali_Yoga_Sutras_Ishwari_Commentary.pdf',
    contentSnippet: 'I.1: अथ योगानुशासनम् (atha yogānuśāsanam) - Now begins the disciplined inquiry and exposition of Yoga. I.2: योगश्चित्तवृत्तिनिरोधः (yogaś citta-vṛtti-nirodhaḥ) - Yoga is the restriction and transcendence of fluctuations within consciousness.'
  },
  {
    id: 'mat-103',
    programId: 'prog-ycb-education',
    title: 'Applied Yogic Anatomy & Musculoskeletal Biomechanics Handbook',
    category: 'Asana & Anatomy',
    type: 'pdf',
    fileSize: '22.5 MB',
    description: 'High-resolution anatomical illustrations detailing muscular engagements, joint articulations, and spine alignments for 60+ classical asanas.',
    downloadFileName: 'Yogic_Anatomy_and_Biomechanics_Handbook.pdf',
    contentSnippet: 'Section 1: The Vertebral Column & Postural Compensations. Section 2: Hip Flexors, Psoas Activation & Sacroiliac Stabilization. Section 3: Safe Backbending & Thoracic Extension.'
  },
  {
    id: 'mat-104',
    programId: 'prog-ycb-education',
    title: 'Traditional Shatkarma & Shuddhi Kriya Laboratory Protocol Guide',
    category: 'Pranayama & Kriya',
    type: 'pdf',
    fileSize: '8.1 MB',
    description: 'Step-by-step instructional guide covering Dhauti, Basti, Neti, Trataka, Nauli, and Kapalabhati with safety precautions and physiological indications.',
    downloadFileName: 'Shatkarma_Shuddhi_Kriya_Practical_Guide.pdf',
    contentSnippet: 'Precautions for Jala Neti: Maintain warm isotonic saline (0.9% salt ratio). Breathe exclusively through mouth. Drain all residual moisture through Bhastrika and forward bend to avoid ear canal irritation.'
  },
  {
    id: 'mat-105',
    programId: 'prog-ycb-education',
    title: 'YCB Level 1 & Level 2 Question Bank (500+ Questions with Answer Keys)',
    category: 'Syllabus & Curriculum',
    type: 'pdf',
    fileSize: '6.4 MB',
    description: 'Exhaustive past-year papers, mock objective questions, and practical viva guidelines for Ministry of AYUSH examinations.',
    downloadFileName: 'YCB_Level1_Level2_Question_Bank_Ishwari.pdf',
    contentSnippet: 'Contains 350 multiple choice questions with detailed rationale, 150 viva questions on Sanskrit shlokas, and step-by-step rubric for practical asana and pranayama evaluation.'
  },
  {
    id: 'mat-106',
    programId: 'prog-ycb-education',
    title: 'Classical Sanskrit Vedic Invocations & Shloka Audio Recitations',
    category: 'Audio Chants',
    type: 'audio',
    fileSize: '38.2 MB',
    description: 'Studio-recorded correct Vedic intonation and chanting of Patanjali invocation, Shanti Mantras, and Surya Namaskara Bija mantras.',
    downloadFileName: 'Ishwari_Vedic_Chanting_Compendium.mp3',
    contentSnippet: 'Track 1: Yogena Chittasya Parena Vacham (Patanjali Invocation). Track 2: Sahana Vavatu (Teacher-Student Covenant). Track 3: 12 Surya Namaskara Bija Mantras. Track 4: Mahamrityunjaya Mantra.'
  },
  // Level 1 Materials
  {
    id: 'mat-201',
    programId: 'prog-ycb-l1',
    title: 'Common Yoga Protocol (CYP) Teaching Manual & Posture Cue Cards',
    category: 'Syllabus & Curriculum',
    type: 'pdf',
    fileSize: '5.6 MB',
    description: 'Official Ministry of AYUSH protocol cue cards for guiding community batches and corporate wellness sessions.',
    downloadFileName: 'CYP_Teaching_Manual_and_Cue_Cards.pdf',
    contentSnippet: 'Clear 45-minute timed protocol cues: 2 min Prayer, 6 min Loosening, 18 min Asanas, 10 min Pranayama, 6 min Dhyana, 3 min Sankalpa & Shanti.'
  }
];

export const demoInitialStudent: StudentAccount = {
  id: 'stud-user-001',
  name: 'Priya Sharma',
  email: 'priya.sharma@gurukul.in',
  password: 'yoga123password',
  phone: '+91 98230 45678',
  city: 'Pune',
  state: 'Maharashtra',
  country: 'India',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
  bio: 'A passionate seeker and software architect based in Viman Nagar, Pune. After five years of intense corporate technology work, I turned to Yoga to restore mental quietude and spinal resilience. Over the last three years of sadhana, my practice evolved from physical asanas into a deep reverence for Patanjali\'s philosophy. I joined Ishwari Yoga Institute to pursue rigorous formal lineage training and earn my AYUSH YCB Level 2 certification under the guidance of Devika Bhide and Shweta Vaikunthe. My vision is to establish morning corporate wellness sanghas in Pune’s tech corridors.',
  yogicExperience: 'Intermediate (2-5 Years)',
  intentAndGoals: 'Deepen classical Darshana philosophy, master shatkarma practicals with clinical precision, and become a certified Yoga Wellness Instructor capable of guiding both beginners and corporate professionals safely.',
  profession: 'Lead Software Architect & Yoga Sadhaka',
  healthConditions: 'None. Previous mild thoracic spine stiffness completely resolved through daily Sukshma Vyayama and Bhujangasana practice.',
  dietaryPreference: 'Strict Vegetarian / Sattvic Diet',
  emergencyContact: 'Rajesh Sharma (+91 98230 45679) - Spouse',
  createdAt: '2026-08-01',
  enrolledCourses: [
    {
      id: 'purch-001',
      programId: 'prog-ycb-education',
      programName: 'Yoga Teacher Education Program',
      purchaseDate: '2026-08-02',
      amountPaid: '₹60,000 (All-Inclusive)',
      paymentMethod: 'UPI / QR Code',
      transactionId: 'UPI/HDFC/2026/8849204812',
      receiptNumber: 'RCPT-IYS-2026-0891',
      status: 'Active',
      intakeNote: 'Enrolled for the comprehensive 5-month flagship program. Interested in both practical alignment and classical Sanskrit philosophy.'
    }
  ],
  examResults: [
    {
      id: 'exam-001',
      programId: 'prog-ycb-education',
      programName: 'Yoga Teacher Education Program (YCB Level 2 Evaluation)',
      examDate: '2026-08-20',
      theoryMarks: 91,
      practicalMarks: 94,
      vivaMarks: 92,
      teachingPedagogyMarks: 93,
      totalObtained: 370,
      totalMax: 400,
      percentage: 92.5,
      grade: 'Distinction (A+)',
      status: 'Passed',
      ycbLevel: 'YCB Level 2 - Yoga Wellness Instructor',
      certificateNumber: 'IYS-YCB-2026-089',
      evaluatorName: 'Devika Bhide (M.A. Yogashastra, YCB L4/L7) & Shweta Vaikunthe (M.A. Yogashastra, YCB L4/L7)',
      evaluatorRemarks: 'Exceptional clarity in Patanjali Yoga Sutra philosophy, flawless anatomical demonstration in Surya Namaskara, and highly serene instructional presence during the teaching practical. Distinction awarded with honors.',
      issueDate: '2026-08-25'
    }
  ]
};
