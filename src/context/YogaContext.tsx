import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Program, Student, Blog, GalleryItem, Testimonial, Inquiry, FAQ, ScheduleItem, ProgramTestimonial,
  StudentAccount, RecordedSession, CourseMaterial, ExamResult, CoursePurchase
} from '../types';
import { 
  initialRecordedSessions, initialCourseMaterials, demoInitialStudent 
} from '../data/studentPortalData';

interface YogaContextType {
  programs: Program[];
  students: Student[];
  blogs: Blog[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  
  // Student Portal State
  studentAccounts: StudentAccount[];
  currentStudent: StudentAccount | null;
  recordedSessions: RecordedSession[];
  courseMaterials: CourseMaterial[];

  // Student Auth & Profile
  loginStudent: (email: string, password?: string) => boolean;
  registerStudent: (accountData: Omit<StudentAccount, 'id' | 'createdAt' | 'enrolledCourses' | 'examResults'>) => StudentAccount;
  logoutStudent: () => void;
  updateStudentProfile: (profile: Partial<StudentAccount>) => void;
  purchaseCourse: (programId: string, paymentMethod: CoursePurchase['paymentMethod'], intakeNote: string) => CoursePurchase | null;
  addExamResultToStudent: (studentId: string, result: Omit<ExamResult, 'id'>) => void;
  
  // Content Management for LMS
  addRecordedSession: (session: Omit<RecordedSession, 'id'>) => void;
  deleteRecordedSession: (id: string) => void;
  addCourseMaterial: (material: Omit<CourseMaterial, 'id'>) => void;
  deleteCourseMaterial: (id: string) => void;
  
  // Programs CRUD
  addProgram: (program: Omit<Program, 'id' | 'slug'>) => void;
  updateProgram: (id: string, program: Program) => void;
  deleteProgram: (id: string) => void;
  
  // Students CRUD
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Student) => void;
  deleteStudent: (id: string) => void;
  
  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Blogs CRUD
  addBlog: (blog: Omit<Blog, 'id' | 'slug'>) => void;
  updateBlog: (id: string, blog: Blog) => void;
  deleteBlog: (id: string) => void;
  
  // Testimonials CRUD
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;

  // Inquiries
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // Global Member Modal & Course Registration
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  authModalProgramId: string | null;
  activeEnrollmentProgram: Program | null;
  openAuthModal: (options?: { mode?: 'login' | 'register'; programId?: string }) => void;
  closeAuthModal: () => void;
  startCourseRegistration: (program: Program) => void;
  closeEnrollmentModal: () => void;

  // Backup & Import
  exportBackup: () => void;
  importBackup: (jsonData: string) => boolean;
}

const YogaContext = createContext<YogaContextType | undefined>(undefined);

// Initial Seed Data - Deeply authentic, scholarly content
const initialPrograms: Program[] = [
  {
    id: 'prog-ycb-education',
    name: 'Yoga Teacher Education Program',
    slug: 'yoga-teacher-education-program',
    startingDate: '2026-08-03',
    duration: '5 Months (Complete Journey)',
    fees: '₹60,000 (All-Inclusive)',
    description: `From Beginner to Certified Yoga Teacher: A Complete 5-Month Journey into the Study, Practice & Teaching of Yoga.

Includes comprehensive preparation and all registration/examination fees for:
1. Yoga Pravesh
2. Yoga Parichay
3. YCB Level 1 – Yoga Protocol Instructor
4. YCB Level 2 – Yoga Wellness Instructor Course (400 hrs TTC)

Guided by Devika Bhide (YCB Level 4 Yoga Master, YCB Level 7 Yoga Consultant, MA in Yogashastra) and Shweta Vaikunthe (YCB Level 4 Yoga Master, YCB Level 7 Yoga Consultant, MA in Yogashastra).`,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=600',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600'
    ],
    pdfBrochure: '',
    pdfBrochureName: 'yoga_teacher_education_program_prospectus.pdf',
    registrationLink: '#register',
    category: 'Teacher Training',
    faq: [
      { question: 'Who is this program suitable for?', answer: 'Whether you wish to become a yoga teacher, deepen your own practice, or simply understand yoga beyond the physical postures, we are delighted to guide you. No prior formal certification is required.' },
      { question: 'What is the Yoga Certification Board (YCB)?', answer: 'The YCB was established by the Ministry of AYUSH, Government of India, to create a structured and nationally/internationally recognized framework for yoga education and certification. It is recognized across India and respected globally.' },
      { question: 'What is the schedule of the classes?', answer: 'Practical Sessions: Monday to Friday (6:00 AM – 7:00 AM) focusing on asana, pranayama, meditation, alignment, and teaching. Theory Sessions: Tuesday, Wednesday & Thursday (9:00 PM – 10:00 PM) covering yoga philosophy, anatomy & physiology, Ayurveda, teaching methodology, and exam prep.' },
      { question: 'What support is available for examinations?', answer: 'We assist with registration, syllabus planning, revision, mock practicals, and offer study material and doubt-solving support in Hindi, Marathi, and English.' },
      { question: 'Does the fee cover examination fees?', answer: 'Yes! The ₹60,000 fee is transparent and all-inclusive. It covers all tuition, comprehensive study notes, personal mentorship, and the exam registration fees for all four certifications (Yoga Pravesh, Yoga Parichay, YCB Level 1, and YCB Level 2).' }
    ],
    testimonials: [
      { name: 'Dr. Mukund Dandekar', text: 'Devika and Shweta teach with a level of rigor and academic purity that is rare to find today. They live what they teach, reflecting the true spirit of a traditional gurukul.', rating: 5 },
      { name: 'Archana Ranade', text: 'Having the classes fully recorded helps immensely to catch up when life gets busy. The personalized alignment corrections during practical slots are excellent.', rating: 5 }
    ],
    schedule: [
      { day: 'Monday to Friday', time: '06:00 AM - 07:00 AM', topic: 'Practical Sessions: Asana, Pranayama, Meditation, Alignments' },
      { day: 'Tue, Wed, Thu', time: '09:00 PM - 10:00 PM', topic: 'Theory Sessions: Yoga Philosophy, Anatomy, Physiology, Ayurveda, and Exam Prep' }
    ]
  },
  {
    id: 'prog-ycb-l1',
    name: 'YCB Level 1: Yoga Protocol Instructor',
    slug: 'ycb-level-1-yoga-protocol-instructor',
    startingDate: '2026-09-01',
    duration: '3 Months (Weekend Batches)',
    fees: '₹15,000 / $250',
    description: 'This government-certified course is regulated by the Yoga Certification Board (YCB) under the Ministry of Ayush. It is designed to impart foundational scriptural knowledge, traditional yoga practices, and basic instructional skills, preparing you to lead yoga protocols in schools, community centers, and corporate spaces.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600',
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=600'
    ],
    pdfBrochure: '',
    pdfBrochureName: 'ycb_level1_prospectus.pdf',
    registrationLink: '#register',
    category: 'Teacher Training',
    faq: [
      { question: 'What is the eligibility criteria?', answer: 'An interest in authentic yogic tradition. Open to all backgrounds, minimum age 18.' },
      { question: 'Is the certificate valid globally?', answer: 'Yes, YCB Ministry of AYUSH certificates are recognized globally by many governments and international yogic associations.' },
      { question: 'What is the exam structure?', answer: 'The examination consists of a theoretical paper (60 marks) and a practical assessment (140 marks).' }
    ],
    testimonials: [
      { name: 'Ananya Deshpande', text: 'Shweta Ma’am’s patience made me realize that yoga is not about posture gymnastics but spinal ease and breath awareness.', rating: 5 },
      { name: 'Rahul Kulkarni', text: 'Felt like studying in an old ashram. The alignment of Patanjali Yoga Sutras with anatomy is brilliant.', rating: 5 }
    ],
    schedule: [
      { day: 'Saturday', time: '07:00 AM - 09:30 AM', topic: 'Pranayama, Mudra, and Asana Alignment' },
      { day: 'Saturday', time: '11:00 AM - 12:30 PM', topic: 'Textual Study: Gheranda Samhita Intro' },
      { day: 'Sunday', time: '07:00 AM - 09:30 AM', topic: 'Shatkarmas & Kriyas Practicum' },
      { day: 'Sunday', time: '11:00 AM - 12:30 PM', topic: 'Patanjali Yoga Sutras Chapter 1' }
    ]
  },
  {
    id: 'prog-ycb-l3',
    name: 'YCB Level 3: Yoga Teacher & Evaluator',
    slug: 'ycb-level-3-yoga-teacher-evaluator',
    startingDate: '2026-10-15',
    duration: '6 Months (Hybrid)',
    fees: '₹32,000 / $490',
    description: 'An advanced, highly prestigious program suited for serious seekers, educators, and experienced practitioners. Gain deep philosophical grounding in Bhagavad Gita, Upanishads, and Samkhya philosophy while mastering the physical sciences of Hatha and Therapeutic Yoga. Certified as a Master Teacher capable of training others.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=600',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600'
    ],
    pdfBrochure: '',
    pdfBrochureName: 'ycb_level3_syllabus.pdf',
    registrationLink: '#register',
    category: 'Teacher Training',
    faq: [
      { question: 'Do I need Level 1 or 2 to do Level 3?', answer: 'Not strictly, but it is highly recommended to have a foundational teaching certificate or at least 2 years of rigorous self-practice.' },
      { question: 'Who evaluates the practical exams?', answer: 'The external examiners are appointed directly by the Ministry of AYUSH, ensuring absolute standard and credibility.' }
    ],
    testimonials: [
      { name: 'Dr. Meera Bhave', text: 'Devika Ma’am’s medical yogic approach combined with classical Sanskrit interpretation is outstanding.', rating: 5 }
    ],
    schedule: [
      { day: 'Mon, Wed, Fri', time: '06:00 AM - 07:30 AM', topic: 'Advanced Sastra Chintana & Practicum' },
      { day: 'Saturdays', time: '03:00 PM - 05:30 PM', topic: 'Evaluation Methodologies & Scriptural Debates' }
    ]
  },
  {
    id: 'prog-retreat-maheshwar',
    name: 'Vedic Prana Retreat (Maheshwar on Narmada)',
    slug: 'vedic-prana-retreat-maheshwar',
    startingDate: '2026-11-20',
    duration: '5 Days Immersive',
    fees: '₹18,000 (Inclusive of Sattvik Stay)',
    description: 'Join Devika and Shweta on the serene ghats of the holy Narmada River in Maheshwar. This intensive offline retreat focuses on Swara Sadhana, traditional pranayama, mantra japa, and scriptural contemplation. Unplug from digital chaos and live the simplicity of a classical gurukul.',
    image: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=600',
      'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=600'
    ],
    pdfBrochure: '',
    pdfBrochureName: 'maheshwar_retreat_itinerary.pdf',
    registrationLink: '#register',
    category: 'Retreats',
    faq: [
      { question: 'Are meals provided?', answer: 'Yes, fully seasonal, Sattvik, vegetarian meals prepared in clay vessels using traditional methods.' },
      { question: 'Can beginners join?', answer: 'Yes, as long as you have a respectful attitude and willingness to abide by ashram rules.' }
    ],
    testimonials: [
      { name: 'Sameer Gokhale', text: 'Sleeping to the sounds of the Narmada and waking up to Vedic chanting restored my nervous system completely.', rating: 5 }
    ],
    schedule: [
      { day: 'Day 1', time: '04:00 PM - 07:00 PM', topic: 'Welcome, Sankalpa & Sunset Ghat Chanting' },
      { day: 'Day 2-4', time: '05:30 AM - 09:30 PM', topic: 'Daily Sadhana, Temple Walks, Scripture study, Swara yoga' },
      { day: 'Day 5', time: '06:00 AM - 11:00 AM', topic: 'Prana Pratistha, Havan, and Farewell' }
    ]
  },
  {
    id: 'prog-prenatal-garbha',
    name: 'Vedic Garbha Sanskar & Pregnancy Yoga',
    slug: 'vedic-garbha-sanskar-pregnancy-yoga',
    startingDate: '2026-09-10',
    duration: 'Ongoing Daily Batches',
    fees: '₹4,500 / Month',
    description: 'A deeply sacred program for expectant mothers. Merging the ancient science of Garbha Sanskar (womb education) with safe, anatomical Hatha yoga postures, pranayama, and sound vibrations. Designed to foster emotional stability, pelvic strength, and a peaceful environment for the unborn consciousness.',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600'
    ],
    pdfBrochure: '',
    pdfBrochureName: 'garbha_sanskar_brochure.pdf',
    registrationLink: '#register',
    category: 'Prenatal Yoga',
    faq: [
      { question: 'When can I start this program?', answer: 'Typically after completion of the first trimester (12 weeks), with written clearance from your obstetrician.' },
      { question: 'Can my partner join?', answer: 'Yes, we have dedicated monthly Garbha Sanskar guidance sessions where husbands are encouraged to participate.' }
    ],
    testimonials: [
      { name: 'Snehal Patwardhan', text: 'Under Devika’s guidance, my pregnancy was incredibly joyful. The chants we learned kept my newborn extremely calm.', rating: 5 }
    ],
    schedule: [
      { day: 'Mon, Tue, Thu', time: '10:30 AM - 11:30 AM', topic: 'Garbha Postures & Pelvic Strength' },
      { day: 'Friday', time: '10:30 AM - 11:30 AM', topic: 'Vedic Chanting, Mantras, & Emotional Balance' }
    ]
  },
  {
    id: 'prog-therapeutic-yoga',
    name: 'Medical Yoga & Yogic Therapy Clinic',
    slug: 'medical-yoga-yogic-therapy-clinic',
    startingDate: 'Continuous Enrollment',
    duration: 'Personalized 12-Session Package',
    fees: '₹9,500 / Course',
    description: 'Clinical-grade yoga therapy designed for managing chronic psychosomatic ailments such as hypertension, diabetes, sciatica, lumbar/cervical spondylosis, anxiety, and endocrine imbalances. Led by YCB Level 7 Certified Therapeutic Yoga Instructors, combining clinical understanding with classical hatha interventions.',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1200&auto=format&fit=crop',
    gallery: [],
    pdfBrochure: '',
    pdfBrochureName: 'yoga_therapy_overview.pdf',
    registrationLink: '#register',
    category: 'Yoga Therapy',
    faq: [
      { question: 'Do you treat severe slip disc cases?', answer: 'Yes, but we require your MRI reports and consulting doctor’s diagnosis before designing your tailor-made props and support routine.' }
    ],
    testimonials: [
      { name: 'Dr. Shraddha Vyas (Panchakarma MD)', text: 'Refer many of my spine-rehab patients to Ishwari. Devika’s understanding of yogic physiology is impeccable.', rating: 5 }
    ],
    schedule: [
      { day: 'Custom', time: 'By Appointment Only', topic: 'One-on-One Assessment & Assisted Postures' }
    ]
  }
];

const initialStudents: Student[] = [
  { id: 'stud-1', name: 'Priyadarshini Joshi', certificateNumber: 'IYS-YCB3-2025-042', level: 'YCB Level 3 (Yoga Teacher)', year: '2025', status: 'Active', dateOfPassing: '2025-05-12' },
  { id: 'stud-2', name: 'Dr. Chinmayee Ranade', certificateNumber: 'IYS-YCB4-2024-011', level: 'YCB Level 4 (Yoga Master)', year: '2024', status: 'Active', dateOfPassing: '2024-11-20' },
  { id: 'stud-3', name: 'Manasi Sathaye', certificateNumber: 'IYS-YCB1-2025-089', level: 'YCB Level 1 (Protocol Instructor)', year: '2025', status: 'Active', dateOfPassing: '2025-06-02' },
  { id: 'stud-4', name: 'Nikhil Ghangrekar', certificateNumber: 'IYS-YCB3-2025-053', level: 'YCB Level 3 (Yoga Teacher)', year: '2025', status: 'Active', dateOfPassing: '2025-05-12' },
  { id: 'stud-5', name: 'Vasudha Pendse', certificateNumber: 'IYS-YCB2-2023-018', level: 'YCB Level 2 (Wellness Educator)', year: '2023', status: 'Completed', dateOfPassing: '2023-08-15' },
  { id: 'stud-6', name: 'Aniket Deshmukh', certificateNumber: 'IYS-YCB1-2024-067', level: 'YCB Level 1 (Protocol Instructor)', year: '2024', status: 'Completed', dateOfPassing: '2024-04-10' }
];

const initialBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'The Science of Prana: How Ancient Breathwork Calms the Modern Amygdala',
    slug: 'science-of-prana-ancient-breathwork-modern-amygdala',
    summary: 'A physiological deep-dive into how traditional Kumbhaka (breath retention) alters vagal tone and down-regulates fight-or-flight mechanisms in modern life.',
    content: `
### Prana and the Autonomic Nervous System

In the ancient text of *Hatha Yoga Pradipika*, Swatmarama states:
> *"Chitte chale chale vaatam, nischale nischalam bhavet"*
> (When the breath is unsteady, the mind is unsteady; when the breath is still, the mind is still.)

Modern clinical neuroscience has begun to validate this ancient axiom. The key lies in the **Vagus Nerve** (10th Cranial Nerve), which controls our parasympathetic nervous system (rest, digest, and restore).

#### How Slow Breathing Resets the Amygdala
The Amygdala is the emotional fire alarm of the brain, constantly scanning for threats. When we undergo chronic lifestyle stress, the Amygdala stays hyperactive, causing elevated cortisol, high blood pressure, and racing thoughts.

Traditional **Pranayama** practices like *Nadi Shodhana* (Alternate Nostril Breathing) and *Chandra Bhedana* directly engage the autonomic nervous system:
1. **Prolonged Exhalations**: Activating pulmonary stretch receptors which signals the cardiorespiratory center in the medulla to increase vagal activity.
2. **Kumbhaka (Retention)**: Momentary holding of breath triggers a mild hypercapnia (rise in carbon dioxide) which, when practiced under guidance, desensitizes the brain's carbon dioxide receptors, teaching the amygdala to remain calm during biological and psychological pressure.

#### Modern Application
Instead of using yoga as a workout, spending 12 minutes in silent, focused, structured Pranayama before beginning your day creates a baseline of autonomic resilience that no fitness routine can replicate.
    `,
    category: 'Science of Yoga',
    author: 'Devika Bhide',
    date: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600',
    readTime: '6 min read'
  },
  {
    id: 'blog-2',
    title: 'Unraveling Patanjali: Understanding "Yogas Chitta Vritti Nirodha" Practically',
    slug: 'understanding-yogas-chitta-vritti-nirodha-practically',
    summary: 'An exploration of Yoga Sutra 1.2. Why stopping mental modifications is not about blocking thoughts, but learning to observe them without reacting.',
    content: `
### Demystifying Yoga Sutra I.2

The second sutra of Patanjali’s monumental work is the absolute definition of Yoga:
> **योगश्चित्तवृत्तिनिरोधः**
> *"Yogas chitta vritti nirodha"*

Commonly translated as *"Yoga is the cessation of the modifications of the mind,"* this sutra is often misunderstood as a call to forcefully empty our heads or suppress our thoughts. 

#### What is 'Chitta' and 'Vritti'?
Patanjali defines the mind (*Chitta*) as an active pool of consciousness that takes shapes. These shapes or whirlpools are called *Vrittis* (fluctuations, waves, modifications).
The five types of Vrittis are:
1. **Pramana** (Right Knowledge)
2. **Viparyaya** (Misconception)
3. **Vikalpa** (Imagination)
4. **Nidra** (Deep Sleep)
5. **Smriti** (Memory)

#### Nirodha is Not Suppression
Forcefully trying to stop a thought is like trying to flatten waves on a lake using an iron—you only create more disturbance. 

*Nirodha* actually means **restraint, channeling, or resolution**. It refers to a state of absolute witness consciousness (*Drashta*). When you sit silently, observing the thoughts rise and fall like waves without labeling them, without reacting, and without claiming ownership, they slowly lose their charge and dissolve into the lake.

#### Practical Sadhana for Daily Life
1. **Observe the Reaction**: Next time someone speaks aggressively to you, observe your mental *Vritti* forming (anger, defensiveness) before you speak. That split-second gap of observation is the beginning of Yoga.
2. **The Witness Stance**: During your daily asana or sit, don’t look for an "experience." Simply watch whatever arises—stiffness, ease, boredom, or bliss—with equal curiosity.
    `,
    category: 'Yoga Philosophy',
    author: 'Shweta Vaikunthe',
    date: '2026-07-02',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
    readTime: '8 min read'
  },
  {
    id: 'blog-3',
    title: 'The Ritucharya Principle: Harmonizing Your Diet with Changing Seasons',
    slug: 'ritucharya-principle-harmonizing-diet-seasons',
    summary: 'How Ashtanga Hridayam guidelines on seasonal changes help maintain gut Agni and immunity without synthetic supplements.',
    content: `
### Seasonal Harmony: Ayurveda’s Ritucharya

The human body is an extension of the earth. When seasons transition (*Ritu Sandhi*), our internal bio-energies (Vata, Pitta, and Kapha) undergo systematic accumulation, aggravation, and pacification.

In Ayurvedic text *Ashtanga Hridayam*, the concept of **Ritucharya** (seasonal regimen) is given prime importance for preserving health and preventing chronic seasonal illnesses.

#### The Concept of Agni (Digestive Fire)
During the hot summers (*Grishma Ritu*), our bodily digestive fire (*Agni*) naturally recedes to the core, dispersing heat outwards. Hence, we naturally digest heavy foods slower. 
In contrast, during cold winters (*Hemanta Ritu*), the cold environment constricts peripheral circulation, concentrating our *Agni* deep in the belly. We feel hungrier, and our bodies can easily metabolize heavy, rich, nourishing ingredients like nuts, ghee, and warming spices.

#### Essential Transitions for Ritu Sandhi
As we move into humid or wet seasons:
- **Prioritize Laghu (Light) and Ushna (Warm) foods** to prevent Kapha stagnation and dampness in the digestive system.
- **Incorporate Bitter & Astringent Herbs**: Neem, ginger, and turmeric are natural purifiers that support liver health.
- **Avoid stale or cold raw foods**, which aggravate the digestive system when atmospheric moisture is high.
    `,
    category: 'Ayurveda',
    author: 'Devika Bhide',
    date: '2026-07-18',
    image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=600',
    readTime: '5 min read'
  }
];

const initialGallery: GalleryItem[] = [
  { id: 'gal-1', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800', caption: 'Classical Asana Alignments in Morning Sessions', category: 'Classes' },
  { id: 'gal-2', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800', caption: 'Pranayama Circle during our Monsoon Maheshwar Retreat', category: 'Retreats' },
  { id: 'gal-3', url: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=800', caption: 'YCB Level 3 Practical Assessments under external evaluators', category: 'Teacher Training' },
  { id: 'gal-4', url: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800', caption: 'Therapeutic Yoga workshop with pelvic alignment models', category: 'Workshops' },
  { id: 'gal-5', url: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800', caption: 'Vedic Garbha Sanskar counseling seminar', category: 'Events' },
  { id: 'gal-6', url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800', caption: 'National Yoga Sanskriti Award presented to Ishwari founders', category: 'Awards' },
  { id: 'gal-7', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800', caption: 'Breath control exploration in Shatkarma session', category: 'Classes' },
  { id: 'gal-8', url: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=800', caption: 'Devika Bhide leading scriptural chanting by the river', category: 'Retreats' }
];

const initialTestimonials: Testimonial[] = [
  { id: 't-1', name: 'Archana Ranade', text: 'I completed my YCB Level 3 here. Devika and Shweta teach with a level of rigor and academic purity that is rare to find today. They live what they teach, reflecting the true spirit of a traditional gurukul.', role: 'High School Teacher & Yoga Practitioner', rating: 5, year: '2025' },
  { id: 't-2', name: 'Dr. Mukund Dandekar', text: 'As a cardiologist, I was highly skeptical of breathing practices. But learning Swara Yoga and Prana regulation from Shweta helped lower my autonomic parameters. Excellent science-to-philosophy integration.', role: 'Consultant Cardiologist', rating: 5, year: '2024' },
  { id: 't-3', name: 'Ketaki Deshmukh', text: 'Their prenatal yoga program changed how I experienced my labor. The deep chanting and traditional posture modifications kept me incredibly calm and centered throughout.', role: 'Mother of Newborn', rating: 5, year: '2025' }
];

const initialInquiries: Inquiry[] = [
  { id: 'inq-1', name: 'Kirti Patwardhan', phone: '+91 98220 12345', email: 'kirti.pat@gmail.com', programInterestedIn: 'YCB Level 3: Yoga Teacher & Evaluator', message: 'I have been practicing for 3 years. Is it suitable for me to directly take the Level 3 exam, or should I take foundation courses first?', date: '2026-07-19', status: 'Pending' },
  { id: 'inq-2', name: 'Mahendra Joshi', phone: '+91 94225 98765', email: 'm_joshi@outlook.com', programInterestedIn: 'Vedic Prana Retreat (Maheshwar on Narmada)', message: 'Are the room stays private or on sharing basis? I would like to book for my elderly parents too.', date: '2026-07-18', status: 'Contacted' }
];

export const YogaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem('iys_programs');
    const deletedStr = localStorage.getItem('iys_deleted_programs');
    const deleted: string[] = deletedStr ? JSON.parse(deletedStr) : [];

    if (saved) {
      const parsed = (JSON.parse(saved) as Program[]).filter(p => !deleted.includes(p.id));
      // Make sure the new program is present, unless it was explicitly deleted
      if (!deleted.includes('prog-ycb-education') && !parsed.some(p => p.id === 'prog-ycb-education')) {
        const newProgram = initialPrograms.find(p => p.id === 'prog-ycb-education');
        if (newProgram) {
          return [newProgram, ...parsed];
        }
      }
      return parsed;
    }
    return initialPrograms.filter(p => !deleted.includes(p.id));
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('iys_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const saved = localStorage.getItem('iys_blogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('iys_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('iys_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('iys_inquiries');
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  // Student Portal State
  const [studentAccounts, setStudentAccounts] = useState<StudentAccount[]>(() => {
    const saved = localStorage.getItem('iys_student_accounts');
    return saved ? JSON.parse(saved) : [demoInitialStudent];
  });

  const [currentStudent, setCurrentStudent] = useState<StudentAccount | null>(() => {
    const saved = localStorage.getItem('iys_current_student');
    return saved ? JSON.parse(saved) : demoInitialStudent;
  });

  const [recordedSessions, setRecordedSessions] = useState<RecordedSession[]>(() => {
    const saved = localStorage.getItem('iys_recorded_sessions');
    return saved ? JSON.parse(saved) : initialRecordedSessions;
  });

  const [courseMaterials, setCourseMaterials] = useState<CourseMaterial[]>(() => {
    const saved = localStorage.getItem('iys_course_materials');
    return saved ? JSON.parse(saved) : initialCourseMaterials;
  });

  // Global Member Modal & Course Registration State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalProgramId, setAuthModalProgramId] = useState<string | null>(null);
  const [activeEnrollmentProgram, setActiveEnrollmentProgram] = useState<Program | null>(null);

  const openAuthModal = (options?: { mode?: 'login' | 'register'; programId?: string }) => {
    setAuthModalMode(options?.mode || 'login');
    setAuthModalProgramId(options?.programId || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalProgramId(null);
  };

  const startCourseRegistration = (program: Program) => {
    if (currentStudent) {
      // Member is logged in: open enrollment modal directly
      setActiveEnrollmentProgram(program);
    } else {
      // Member is not logged in: prompt login/registration preselected for this program
      openAuthModal({ mode: 'register', programId: program.id });
    }
  };

  const closeEnrollmentModal = () => {
    setActiveEnrollmentProgram(null);
  };

  // Sync to localstorage
  useEffect(() => {
    localStorage.setItem('iys_student_accounts', JSON.stringify(studentAccounts));
  }, [studentAccounts]);

  useEffect(() => {
    if (currentStudent) {
      localStorage.setItem('iys_current_student', JSON.stringify(currentStudent));
    } else {
      localStorage.removeItem('iys_current_student');
    }
  }, [currentStudent]);

  useEffect(() => {
    localStorage.setItem('iys_recorded_sessions', JSON.stringify(recordedSessions));
  }, [recordedSessions]);

  useEffect(() => {
    localStorage.setItem('iys_course_materials', JSON.stringify(courseMaterials));
  }, [courseMaterials]);

  useEffect(() => {
    localStorage.setItem('iys_programs', JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem('iys_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('iys_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('iys_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('iys_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('iys_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Program Slug generator
  const makeSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  // CRUD Implementations
  const addProgram = (program: Omit<Program, 'id' | 'slug'>) => {
    const newProg: Program = {
      ...program,
      id: `prog-${Date.now()}`,
      slug: makeSlug(program.name)
    };
    setPrograms(prev => [newProg, ...prev]);
  };

  const updateProgram = (id: string, updated: Program) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...updated, slug: makeSlug(updated.name) } : p));
  };

  const deleteProgram = (id: string) => {
    setPrograms(prev => {
      const updated = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem('iys_programs', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving programs state:', e);
      }
      return updated;
    });
    try {
      const deletedStr = localStorage.getItem('iys_deleted_programs');
      const deleted: string[] = deletedStr ? JSON.parse(deletedStr) : [];
      if (!deleted.includes(id)) {
        deleted.push(id);
        localStorage.setItem('iys_deleted_programs', JSON.stringify(deleted));
      }
    } catch (e) {
      console.error('Error saving deleted program state:', e);
    }
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStud: Student = {
      ...student,
      id: `stud-${Date.now()}`
    };
    setStudents(prev => [newStud, ...prev]);
  };

  const updateStudent = (id: string, updated: Student) => {
    setStudents(prev => prev.map(s => s.id === id ? updated : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newImg: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGalleryItems(prev => [newImg, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  const addBlog = (blog: Omit<Blog, 'id' | 'slug'>) => {
    const newBlog: Blog = {
      ...blog,
      id: `blog-${Date.now()}`,
      slug: makeSlug(blog.title)
    };
    setBlogs(prev => [newBlog, ...prev]);
  };

  const updateBlog = (id: string, updated: Blog) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...updated, slug: makeSlug(updated.title) } : b));
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...testimonial,
      id: `t-${Date.now()}`
    };
    setTestimonials(prev => [newTest, ...prev]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInq: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setInquiries(prev => [newInq, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  // Student Portal Auth & Profile Methods
  const loginStudent = (email: string, password?: string): boolean => {
    const trimmed = email.trim().toLowerCase();
    const found = studentAccounts.find(s => s.email.toLowerCase() === trimmed);
    if (found) {
      if (password && found.password && found.password !== password) {
        return false;
      }
      setCurrentStudent(found);
      return true;
    }
    return false;
  };

  const registerStudent = (accountData: Omit<StudentAccount, 'id' | 'createdAt' | 'enrolledCourses' | 'examResults'>): StudentAccount => {
    const newStudent: StudentAccount = {
      ...accountData,
      id: `stud-user-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      enrolledCourses: [],
      examResults: []
    };
    setStudentAccounts(prev => [newStudent, ...prev]);
    setCurrentStudent(newStudent);
    return newStudent;
  };

  const logoutStudent = () => {
    setCurrentStudent(null);
  };

  const updateStudentProfile = (profile: Partial<StudentAccount>) => {
    if (!currentStudent) return;
    const updated = { ...currentStudent, ...profile };
    setCurrentStudent(updated);
    setStudentAccounts(prev => prev.map(s => s.id === currentStudent.id ? updated : s));
  };

  const purchaseCourse = (
    programId: string, 
    paymentMethod: CoursePurchase['paymentMethod'], 
    intakeNote: string
  ): CoursePurchase | null => {
    if (!currentStudent) return null;
    const prog = programs.find(p => p.id === programId);
    if (!prog) return null;

    const newPurchase: CoursePurchase = {
      id: `purch-${Date.now()}`,
      programId: prog.id,
      programName: prog.name,
      purchaseDate: new Date().toISOString().split('T')[0],
      amountPaid: prog.fees,
      paymentMethod,
      transactionId: `TXN-IYS-${Date.now().toString().slice(-8)}`,
      receiptNumber: `RCPT-IYS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Active',
      intakeNote
    };

    const updatedCourses = [newPurchase, ...currentStudent.enrolledCourses.filter(c => c.programId !== programId)];
    const updatedStudent = {
      ...currentStudent,
      enrolledCourses: updatedCourses
    };

    setCurrentStudent(updatedStudent);
    setStudentAccounts(prev => prev.map(s => s.id === currentStudent.id ? updatedStudent : s));
    return newPurchase;
  };

  const addExamResultToStudent = (studentId: string, result: Omit<ExamResult, 'id'>) => {
    const newResult: ExamResult = {
      ...result,
      id: `exam-${Date.now()}`
    };

    setStudentAccounts(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          examResults: [newResult, ...s.examResults.filter(r => r.programId !== result.programId)]
        };
      }
      return s;
    }));

    if (currentStudent && currentStudent.id === studentId) {
      setCurrentStudent(prev => prev ? {
        ...prev,
        examResults: [newResult, ...prev.examResults.filter(r => r.programId !== result.programId)]
      } : null);
    }

    // Also register into public student verification if certificateNumber is issued!
    if (result.certificateNumber && result.status === 'Passed') {
      const studentObj = studentAccounts.find(s => s.id === studentId);
      if (studentObj) {
        setStudents(prev => {
          if (prev.some(p => p.certificateNumber === result.certificateNumber)) return prev;
          return [
            {
              id: `stud-cert-${Date.now()}`,
              name: studentObj.name,
              certificateNumber: result.certificateNumber,
              level: result.ycbLevel || 'YCB Certified',
              year: result.issueDate.split('-')[0] || '2026',
              status: 'Completed',
              dateOfPassing: result.issueDate
            },
            ...prev
          ];
        });
      }
    }
  };

  const addRecordedSession = (session: Omit<RecordedSession, 'id'>) => {
    const newSession: RecordedSession = {
      ...session,
      id: `rec-${Date.now()}`
    };
    setRecordedSessions(prev => [newSession, ...prev]);
  };

  const deleteRecordedSession = (id: string) => {
    setRecordedSessions(prev => prev.filter(r => r.id !== id));
  };

  const addCourseMaterial = (material: Omit<CourseMaterial, 'id'>) => {
    const newMaterial: CourseMaterial = {
      ...material,
      id: `mat-${Date.now()}`
    };
    setCourseMaterials(prev => [newMaterial, ...prev]);
  };

  const deleteCourseMaterial = (id: string) => {
    setCourseMaterials(prev => prev.filter(m => m.id !== id));
  };

  // Backup & Import
  const exportBackup = () => {
    const dataObj = {
      programs,
      students,
      blogs,
      galleryItems,
      testimonials,
      inquiries,
      studentAccounts,
      recordedSessions,
      courseMaterials
    };
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ishwari_yoga_institute_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.programs && Array.isArray(parsed.programs)) {
        localStorage.removeItem('iys_deleted_programs');
        setPrograms(parsed.programs);
      }
      if (parsed.students && Array.isArray(parsed.students)) setStudents(parsed.students);
      if (parsed.blogs && Array.isArray(parsed.blogs)) setBlogs(parsed.blogs);
      if (parsed.galleryItems && Array.isArray(parsed.galleryItems)) setGalleryItems(parsed.galleryItems);
      if (parsed.testimonials && Array.isArray(parsed.testimonials)) setTestimonials(parsed.testimonials);
      if (parsed.inquiries && Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);
      if (parsed.studentAccounts && Array.isArray(parsed.studentAccounts)) setStudentAccounts(parsed.studentAccounts);
      if (parsed.recordedSessions && Array.isArray(parsed.recordedSessions)) setRecordedSessions(parsed.recordedSessions);
      if (parsed.courseMaterials && Array.isArray(parsed.courseMaterials)) setCourseMaterials(parsed.courseMaterials);
      return true;
    } catch (e) {
      console.error('Failed to import backup data:', e);
      return false;
    }
  };

  return (
    <YogaContext.Provider value={{
      programs,
      students,
      blogs,
      galleryItems,
      testimonials,
      inquiries,
      studentAccounts,
      currentStudent,
      recordedSessions,
      courseMaterials,
      loginStudent,
      registerStudent,
      logoutStudent,
      updateStudentProfile,
      purchaseCourse,
      addExamResultToStudent,
      addRecordedSession,
      deleteRecordedSession,
      addCourseMaterial,
      deleteCourseMaterial,
      addProgram,
      updateProgram,
      deleteProgram,
      addStudent,
      updateStudent,
      deleteStudent,
      addGalleryItem,
      deleteGalleryItem,
      addBlog,
      updateBlog,
      deleteBlog,
      addTestimonial,
      deleteTestimonial,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      isAuthModalOpen,
      authModalMode,
      authModalProgramId,
      activeEnrollmentProgram,
      openAuthModal,
      closeAuthModal,
      startCourseRegistration,
      closeEnrollmentModal,
      exportBackup,
      importBackup
    }}>
      {children}
    </YogaContext.Provider>
  );
};

export const useYoga = () => {
  const context = useContext(YogaContext);
  if (!context) {
    throw new Error('useYoga must be used within a YogaProvider');
  }
  return context;
};
