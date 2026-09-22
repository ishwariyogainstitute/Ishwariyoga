export interface FAQ {
  question: string;
  answer: string;
}

export interface ProgramTestimonial {
  name: string;
  text: string;
  rating: number;
}

export interface ScheduleItem {
  day: string;
  time: string;
  topic: string;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  startingDate: string;
  duration: string;
  fees: string;
  description: string;
  image: string;
  gallery: string[];
  pdfBrochure: string; // Base64 or local filename
  pdfBrochureName?: string;
  registrationLink: string;
  faq: FAQ[];
  testimonials: ProgramTestimonial[];
  schedule: ScheduleItem[];
  category: string;
}

export interface Student {
  id: string;
  name: string;
  certificateNumber: string;
  level: string; // YCB Level 1, 2, 3, 4, etc.
  year: string;
  status: 'Active' | 'Completed' | 'Suspended';
  dateOfPassing: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Rich markdown or HTML content
  category: string; // Yoga Philosophy, Science of Yoga, Meditation, Ayurveda, Research, Lifestyle, Pregnancy Yoga, Teacher Education
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'Retreats' | 'Teacher Training' | 'Workshops' | 'Classes' | 'Events' | 'Awards';
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  role: string;
  rating: number;
  year: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  programInterestedIn: string;
  message: string;
  date: string;
  status: 'Pending' | 'Contacted' | 'Archived';
}

export interface CoursePurchase {
  id: string;
  programId: string;
  programName: string;
  purchaseDate: string;
  amountPaid: string;
  paymentMethod: 'UPI / QR Code' | 'Credit / Debit Card' | 'Net Banking';
  transactionId: string;
  receiptNumber: string;
  status: 'Active' | 'Completed' | 'Pending Verification';
  intakeNote?: string;
}

export interface RecordedSession {
  id: string;
  programId: string;
  title: string;
  sessionNumber: number;
  moduleName: string;
  instructor: string;
  duration: string;
  dateRecorded: string;
  videoUrl: string;
  thumbnailUrl: string;
  summary: string;
  keyTopics: string[];
}

export interface CourseMaterial {
  id: string;
  programId: string;
  title: string;
  category: 'Syllabus & Curriculum' | 'Asana & Anatomy' | 'Philosophy & Sutras' | 'Pranayama & Kriya' | 'Audio Chants';
  type: 'pdf' | 'audio' | 'slides' | 'notes';
  fileSize: string;
  description: string;
  downloadFileName: string;
  contentSnippet?: string;
}

export interface ExamResult {
  id: string;
  programId: string;
  programName: string;
  examDate: string;
  theoryMarks: number;
  practicalMarks: number;
  vivaMarks: number;
  teachingPedagogyMarks: number;
  totalObtained: number;
  totalMax: number;
  percentage: number;
  grade: 'Distinction (A+)' | 'First Class (A)' | 'Second Class (B)' | 'Pass';
  status: 'Passed' | 'Under Review' | 'Appearing';
  ycbLevel: string;
  certificateNumber: string;
  evaluatorName: string;
  evaluatorRemarks: string;
  issueDate: string;
}

export interface StudentAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  avatar?: string;
  bio: string;
  yogicExperience: string;
  intentAndGoals: string;
  profession: string;
  healthConditions?: string;
  dietaryPreference?: string;
  emergencyContact?: string;
  enrolledCourses: CoursePurchase[];
  examResults: ExamResult[];
  createdAt: string;
}
