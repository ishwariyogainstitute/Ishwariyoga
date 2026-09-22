import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { ArrowLeft, Calendar, Clock, Download, ClipboardCheck, BookOpen, Heart, HelpCircle, ChevronLeft, ChevronRight, Maximize2, Minimize2, FileText, UserPlus, CheckCircle2, User } from 'lucide-react';
import { PeepalLeaf } from './BotanicalAssets';

interface ProgramDetailViewProps {
  programId: string;
  onBack: () => void;
}

export const ProgramDetailView: React.FC<ProgramDetailViewProps> = ({ programId, onBack }) => {
  const { programs, addInquiry, currentStudent, startCourseRegistration } = useYoga();
  const program = programs.find(p => p.id === programId);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Prospectus state
  const [prospectusPage, setProspectusPage] = useState(0);
  const [isFullscreenProspectus, setIsFullscreenProspectus] = useState(false);

  if (!program) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="font-cinzel text-xl text-espresso">Program not found.</h2>
        <button onClick={onBack} className="mt-4 text-xs font-mono text-olive-green hover:text-espresso uppercase">
          Back to Programs
        </button>
      </div>
    );
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert('Please fill in your Name, Phone and Email to register.');
      return;
    }
    
    addInquiry({
      name,
      phone,
      email,
      programInterestedIn: program.name,
      message: message || `Expressed interest in registration/brochure for ${program.name}.`
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  // Mock PDF Brochure download function
  const handleDownloadBrochure = () => {
    const filename = program.pdfBrochureName || 'ishwari_yog_program_brochure.pdf';

    // Check if a real Base64 PDF is uploaded and download it directly
    if (program.pdfBrochure && program.pdfBrochure.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = program.pdfBrochure;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    let content = '';

    if (program.id === 'prog-ycb-education') {
      content = `========================================================================
                     ISHWARI YOGA INSTITUTE
            OFFICIAL SYLLABUS AND PROSPECTUS booklet
                 YOGA TEACHER EDUCATION PROGRAM
               A Complete 5-Month Certification Course
========================================================================

FROM BEGINNER TO CERTIFIED YOGA TEACHER
A Complete 5-Month Journey into the Study, Practice & Teaching of Yoga

------------------------------------------------------------------------
INCLUDES PREPARATION AND REGISTRATION FOR FOUR MAIN CERTIFICATIONS:
1. Yoga Pravesh
2. Yoga Parichay
3. YCB Level 1 - Yoga Protocol Instructor
4. YCB Level 2 - Yoga Wellness Instructor Course (400 hrs TTC equivalent)
------------------------------------------------------------------------

CLASS SCHEDULES:
* Practical Sessions: Monday to Friday (6:00 AM – 7:00 AM)
  Focusing on asana, pranayama, meditation, alignment, and demonstrations.
* Theory Sessions: Tuesday, Wednesday & Thursday (9:00 PM – 10:00 PM)
  Covering yoga philosophy, anatomy & physiology, Ayurveda, and exam prep.

LEARNING FORMAT:
* 100% Online Live Classes (All Sessions Recorded for seamless revision).
* Languages: Hindi & English. Study notes in English, Hindi, & Marathi.

------------------------------------------------------------------------
GUIDED AND MENTORED BY LEAD EVALUATORS & FOUNDERS:
* Devika Bhide (YCB Level 4 Yoga Master, YCB Level 7 Yoga Consultant, MA in Yogashastra)
  Contact: +91 8208368237 | Instagram: @ghungroo.and.yogamat
* Shweta Vaikunthe (YCB Level 4 Yoga Master, YCB Level 7 Yoga Consultant, MA in Yogashastra)
  Contact: +91 9607517375 | Instagram: @breathing_point
------------------------------------------------------------------------

CURRICULUM STAGES OUTLINE:

STAGE 1: YOGA PRAVESH
* Practical: Approximately 33 foundational asanas, basic pranayama, meditation and relaxation techniques, yogic lifestyle habits.
* Theory: Introduction to principles of yoga, basic concepts of yogic practice, MCQ examination preparation.
* Exam: Conducted online (Practical Demonstration + MCQ).

STAGE 2: YOGA PARICHAY
* Practical: Approximately 40 asanas, intermediate pranayama, alignment refinement, classical meditation.
* Theory Paper I: Yogic Texts (Introduction to Patanjali Yoga Sutras, Hatha Yoga Pradipika).
* Theory Paper II: Human Sciences (Human Anatomy & Physiology, Introduction to Ayurveda).
* Exam: Conducted online (Practical + Theory Paper I + Theory Paper II).

STAGE 3: YCB LEVEL 1 — YOGA PROTOCOL INSTRUCTOR (YPI)
* Practical: Common Yoga Protocol, Asanas, Pranayama, Meditation, Shatkarma, Bandhas & Mudras, Demonstration & Teaching Skills.
* Theory: Intro to Yoga and Yogic Practices, Intro to Yogic Texts, Yoga for Health Promotion.
* Exam: Practical demonstration, teaching assessment, application of knowledge, field experience, MCQ theory exam.

STAGE 4: YCB LEVEL 2 — YOGA WELLNESS INSTRUCTOR (YWI)
* Practical: Prescribed asanas, pranayama, meditation, Shatkarma, class planning, teaching methodology.
* Theory: Patanjali Yoga Sutra, Bhagavad Gita, Hatha Yoga Pradipika, Upanishads, Darshanas, Panchakosha, Anatomy & Physiology, Health & Wellness.
* Exam: Online Practical, Teaching Skills Assessment, Viva Voce, MCQ Examination, Short Speech / Presentation.

------------------------------------------------------------------------
INVESTMENT IN YOUR LEARNING:
* Comprehensive Program Fee: INR 60,000 (All-Inclusive).
  Covers all 5 months of live classes, recorded backups, comprehensive printed study notes, personal mentorship, and ALL 4 YCB registration and official exam fees.
* Transparent Fee Structure: No additional or hidden charges.
* Payment Mode: May be paid in two instalments.
------------------------------------------------------------------------

Contact us for direct admissions:
Email: Devikabhide8@gmail.com | Pune, Maharashtra, India`;
    } else {
      content = `ISHWARI YOGA INSTITUTE\n\nOFFICIAL SYLLABUS AND PROSPECTUS\n\nCourse: ${program.name}\nDuration: ${program.duration}\nStarting Date: ${program.startingDate}\nFees: ${program.fees}\n\nPhilosophy: Classical Indian shastras taught by Devika Bhide (MA Yogashastra) & Shweta Vaikunthe (YCB Level 4 Master).\n\nSyllabus Outline:\n1. Patanjali Yoga Sutra Chintana\n2. Hatha Yoga Textual Studies\n3. Anatomy and Yogic Physiology\n4. Postural Mechanics & Shatkarmas\n5. Teaching Pedagogy & Practical Evaluation\n\nContact: Devikabhide8@gmail.com | Pune, Maharashtra, India`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Define prospectus pages dynamically based on programId
  const getProspectusPages = () => {
    if (program.id === 'prog-ycb-education') {
      return [
        {
          title: "Cover Prospectus",
          content: (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 select-none">
              <div className="text-olive-green opacity-80">
                <svg viewBox="0 0 100 100" className="w-16 h-16 fill-current mx-auto">
                  <path d="M50 15c-1.5 0-3 3-3 5.5s1.5 4.5 3 4.5 3-2 3-4.5-1.5-5.5-3-5.5zm0 13c-7 0-14 4-17 11 3-2 8-3 12-2 1.5.5 3.5 1 5 1s3.5-.5 5-1c4-1 9 0 12 2-3-7-10-11-17-11zm-20 18c-3 3-5 8-4 13 4-2 9-2 13 1 .5.5 1 1 2 1.5v-8.5c-4.5-3-9-5-11-7zm40 0c-2 2-6.5 4-11 7v8.5c1-.5 1.5-1 2-1.5 4-3 9-3 13-1 1-5-1-10-4-13zM25 70c0 4 3 7 7 7h36c4 0 7-3 7-7H25z"/>
                </svg>
              </div>
              <div className="space-y-3">
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-espresso tracking-wide leading-tight uppercase">
                  Yoga Teacher
                </h3>
                <h4 className="font-cinzel text-base sm:text-lg font-semibold text-olive-green tracking-widest uppercase">
                  Education Program
                </h4>
                <div className="artistic-divider w-32 mx-auto my-3" />
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-biscuit font-bold">
                  A 5-Month Certification Course
                </p>
                <p className="font-sans text-[11px] text-espresso/60 max-w-sm mx-auto">
                  From Beginner to Certified Teacher. Grounded in Classical Vedic Sanskriti & YCB Syllabus.
                </p>
              </div>
              <div className="text-[10px] text-espresso/50 uppercase tracking-widest pt-4 font-mono">
                Page 1 of 14 &bull; Use arrows to flip or select from the dropdown
              </div>
            </div>
          )
        },
        {
          title: "Milestone Curriculum",
          content: (
            <div className="space-y-4 py-2">
              <div className="border-b border-biscuit/20 pb-2">
                <h3 className="font-cinzel text-sm font-bold text-espresso uppercase tracking-wider">Complete 5-Month Journey</h3>
                <p className="font-sans text-[10px] text-espresso/65">A systematic progression from beginner up to government certification.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                <div className="p-3 bg-warm-beige/35 border border-biscuit/20 rounded-lg">
                  <span className="font-mono text-[9px] bg-biscuit/40 text-espresso px-2 py-0.5 rounded font-bold uppercase">Step 1</span>
                  <h4 className="font-cinzel text-xs font-bold text-espresso mt-1.5">Yoga Pravesh</h4>
                  <p className="text-[10px] text-espresso/70 mt-0.5">Foundational personal practice, 33 basic asanas, breath awareness.</p>
                </div>
                <div className="p-3 bg-warm-beige/35 border border-biscuit/20 rounded-lg">
                  <span className="font-mono text-[9px] bg-biscuit/40 text-espresso px-2 py-0.5 rounded font-bold uppercase">Step 2</span>
                  <h4 className="font-cinzel text-xs font-bold text-espresso mt-1.5">Yoga Parichay</h4>
                  <p className="text-[10px] text-espresso/70 mt-0.5">Transition into shastras, anatomy, physiology & Ayurveda intro.</p>
                </div>
                <div className="p-3 bg-warm-beige/35 border border-biscuit/20 rounded-lg">
                  <span className="font-mono text-[9px] bg-biscuit/40 text-espresso px-2 py-0.5 rounded font-bold uppercase">Step 3</span>
                  <h4 className="font-cinzel text-xs font-bold text-espresso mt-1.5">YCB Level 1</h4>
                  <p className="text-[10px] text-espresso/70 mt-0.5">Yoga Protocol Instructor (YPI) - official Board syllabus & skills.</p>
                </div>
                <div className="p-3 bg-warm-beige/35 border border-biscuit/20 rounded-lg">
                  <span className="font-mono text-[9px] bg-biscuit/40 text-espresso px-2 py-0.5 rounded font-bold uppercase">Step 4</span>
                  <h4 className="font-cinzel text-xs font-bold text-espresso mt-1.5">YCB Level 2</h4>
                  <p className="text-[10px] text-espresso/70 mt-0.5">Yoga Wellness Instructor (YWI) - 400 hours professional TTC.</p>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Message from Founders",
          content: (
            <div className="space-y-3 py-1 font-sans text-xs text-espresso/85 leading-relaxed max-h-[300px] overflow-y-auto pr-2">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1.5">Dear Future Yoga Teacher, Welcome.</h3>
              <p>
                Whether you wish to become a yoga teacher, deepen your own practice, or simply understand yoga beyond the physical postures, we are delighted that you are considering this journey.
              </p>
              <p>
                When we began our own careers, neither of us imagined that yoga would become our life's work. We came from different professional backgrounds, pursued higher education in other fields, and eventually found ourselves drawn towards yoga—not as a hobby or a fitness trend, but as a profound science of living.
              </p>
              <p>
                As we studied more deeply, we realised that yoga is much more than flexibility or physical exercise. It is a discipline that helps us understand the body, regulate the mind, cultivate awareness, and live with greater clarity and balance.
              </p>
              <p className="italic border-l-2 border-biscuit pl-2.5 my-2">
                "Rather than preparing you only to pass an examination, our goal is to help you become a sincere practitioner first. Once yoga becomes a part of your own life, sharing it with others becomes natural."
              </p>
              <div className="pt-1 text-right">
                <p className="font-cinzel text-[11px] font-bold text-espresso">&mdash; Devika & Shweta</p>
              </div>
            </div>
          )
        },
        {
          title: "Why Choose YCB?",
          content: (
            <div className="space-y-3 py-1">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1.5">Why Choose a YCB Certification?</h3>
              <p className="font-sans text-xs text-espresso/80 leading-relaxed">
                The <strong>Yoga Certification Board (YCB)</strong> was established by the <strong>Ministry of AYUSH, Government of India</strong>, to create a structured and nationally recognised framework for yoga education and certification.
              </p>
              <div className="space-y-2 font-sans text-xs text-espresso/75">
                <div className="flex items-start gap-2">
                  <span className="text-olive-green font-bold">&bull;</span>
                  <p><strong>Strict Quality:</strong> Unlike basic posture-only courses, YCB examinations assess practical posture, shastra philosophy, teaching methodology, and ethical responsibility.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-olive-green font-bold">&bull;</span>
                  <p><strong>Professional Credibility:</strong> Highly respected across India and internationally. Opens up government and corporate teaching scopes.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-olive-green font-bold">&bull;</span>
                  <p><strong>Syllabus Standards:</strong> Ensures a balanced understanding of traditional wisdom and modern scientific principles.</p>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Our Deep Philosophy",
          content: (
            <div className="space-y-3 py-4 text-center max-w-md mx-auto">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider">The Foundation of Experience</h3>
              <div className="w-8 h-0.5 bg-biscuit mx-auto my-2" />
              <p className="font-sans text-xs text-espresso/80 leading-relaxed">
                We believe that before we teach yoga, we must first experience it ourselves. That philosophy forms the foundation of this entire program.
              </p>
              <div className="p-4 bg-warm-beige/35 border border-biscuit/30 rounded-lg italic font-sans text-xs text-espresso my-3">
                "Our program begins with Yoga Pravesh and Yoga Parichay, creating a gradual and meaningful learning journey, helping you build core confidence before professional evaluations."
              </div>
            </div>
          )
        },
        {
          title: "Course Structure & Schedules",
          content: (
            <div className="space-y-3 py-1 font-sans text-xs text-espresso/85">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1.5">Schedule & Languages</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="font-cinzel text-[10px] font-bold text-olive-green uppercase">Learning Mode</h4>
                  <p className="text-[10px] leading-relaxed"><strong>100% Online Live Classes</strong>. All sessions are recorded and shared for ongoing revision.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-cinzel text-[10px] font-bold text-olive-green uppercase">Multilingual</h4>
                  <p className="text-[10px] leading-relaxed">Classes in <strong>English & Hindi</strong>. Notes & doubts available in <strong>English, Hindi, & Marathi</strong>.</p>
                </div>
              </div>
              <div className="p-3 bg-warm-beige/30 border border-biscuit/20 rounded-lg space-y-2 mt-2">
                <h4 className="font-cinzel text-[10px] font-bold text-espresso text-center uppercase tracking-wider">Daily Class Windows</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] leading-relaxed">
                  <div>
                    <span className="font-mono text-[8px] bg-olive-green/20 text-olive-green px-1.5 py-0.5 rounded font-bold uppercase">Practical (Mon-Fri)</span>
                    <p className="font-bold text-espresso mt-0.5 font-mono text-[11px]">6:00 AM – 7:00 AM</p>
                    <p className="text-espresso/60 text-[9px]">Asana, pranayama, meditation, and physical alignments.</p>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] bg-espresso/20 text-espresso px-1.5 py-0.5 rounded font-bold uppercase">Theory (Tue-Thu)</span>
                    <p className="font-bold text-espresso mt-0.5 font-mono text-[11px]">9:00 PM – 10:00 PM</p>
                    <p className="text-espresso/60 text-[9px]">Yoga text study, anatomy, physiology, and exam preps.</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Milestone 1 Details",
          content: (
            <div className="space-y-3 py-1 font-sans text-xs">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1.5">Milestone 1 &mdash; Yoga Pravesh</h3>
              <p className="text-espresso/70 italic text-[11px]">Lays the foundation for subsequent certifications by focusing on personal practice and core mechanics.</p>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <h4 className="font-cinzel text-[10px] font-bold text-olive-green uppercase">Practical Focus</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[10px] text-espresso/80 mt-1">
                    <li>33 Foundational Asanas</li>
                    <li>Basic Pranayama</li>
                    <li>Meditation & relaxation</li>
                    <li>Yogic lifestyle habits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-cinzel text-[10px] font-bold text-olive-green uppercase">Theory & Exam</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[10px] text-espresso/80 mt-1">
                    <li>Principles of Yoga</li>
                    <li>Basic yogic concepts</li>
                    <li>Online Practical & MCQ</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Milestone 2 Details",
          content: (
            <div className="space-y-3 py-1 font-sans text-xs">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1.5">Milestone 2 &mdash; Yoga Parichay</h3>
              <p className="text-espresso/70 italic text-[11px]">Transition to understanding the profound science and shastra philosophies backing up daily asana practice.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-cinzel text-[10px] font-bold text-olive-green uppercase">Practical Mastery</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[9px] text-espresso/80 mt-1">
                    <li>40 Classical Asanas</li>
                    <li>Intermediate Pranayama</li>
                    <li>Refinement of postures</li>
                    <li>Traditional meditation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-cinzel text-[10px] font-bold text-olive-green uppercase">Shastra Papers</h4>
                  <p className="text-[9px] text-espresso/85 mt-1"><strong>Paper I (Texts):</strong> Patanjali Yoga Sutra, Hatha Yoga Pradipika.</p>
                  <p className="text-[9px] text-espresso/85 mt-1"><strong>Paper II (Sciences):</strong> Anatomy & Physiology, Ayurveda.</p>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Milestone 3 Details",
          content: (
            <div className="space-y-3 py-1 font-sans text-xs">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1.5">Milestone 3 &mdash; YCB Level 1 (YPI)</h3>
              <p className="text-espresso/70 italic text-[11px]">Introduces students to the standards of professional teaching through the Common Yoga Protocol.</p>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <h4 className="font-cinzel text-[10px] font-bold text-olive-green uppercase">Practical Training</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[9px] text-espresso/80 mt-1">
                    <li>Common Yoga Protocol</li>
                    <li>Asana & Pranayama mechanics</li>
                    <li>Shatkarma (six cleanses)</li>
                    <li>Bandhas, Mudras & Teaching</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-cinzel text-[10px] font-bold text-olive-green uppercase">Theory & Exam</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[9px] text-espresso/80 mt-1">
                    <li>Intro to Yoga & Texts</li>
                    <li>Yoga for Health Promotion</li>
                    <li><strong>Exam:</strong> Practical, Teaching, MCQ</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Milestone 4 Details",
          content: (
            <div className="space-y-2 py-1 font-sans text-xs">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1">Milestone 4 &mdash; YCB Level 2 (YWI)</h3>
              <p className="text-espresso/70 italic text-[10px]">Second official level of YCB, combining advanced scriptural shastra with actual clinic-grade pedagogical methodology.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-cinzel text-[9px] font-bold text-olive-green uppercase">Practical Syllabus</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[9px] text-espresso/80 mt-1">
                    <li>Prescribed complex asanas</li>
                    <li>Kumbhaka & Pranayamas</li>
                    <li>Shatkarma cleanses</li>
                    <li>Class designing & application</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-cinzel text-[9px] font-bold text-olive-green uppercase">Scriptures Study</h4>
                  <ul className="list-disc list-inside space-y-0.5 text-[9px] text-espresso/80 mt-1">
                    <li>Patanjali Sutras & Gita</li>
                    <li>Upanishads & Darshanas</li>
                    <li>Panchakosha mechanics</li>
                    <li>Exam: MCQ, Viva, Speech</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Your Learning Experience",
          content: (
            <div className="space-y-3 py-1 font-sans text-xs">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1.5">Interactive Mentorship</h3>
              <p className="text-espresso/70 italic text-[11px]">We designed this program to be flexible and compatible with busy professionals without compromising scriptural depth.</p>
              <div className="grid grid-cols-2 gap-2.5 pt-1 text-[10px] leading-relaxed">
                <div className="p-2 bg-warm-beige/20 rounded border border-biscuit/10">
                  <strong className="text-olive-green">Live Online Interactive</strong>
                  <p className="text-espresso/75 text-[9px] mt-0.5">Classes conducted live for immediate posture and alignment diagnostics.</p>
                </div>
                <div className="p-2 bg-warm-beige/20 rounded border border-biscuit/10">
                  <strong className="text-olive-green">Session Recordings</strong>
                  <p className="text-espresso/75 text-[9px] mt-0.5">Every single session is cataloged and shared for instant playback.</p>
                </div>
                <div className="p-2 bg-warm-beige/20 rounded border border-biscuit/10">
                  <strong className="text-olive-green">Comprehensive Study Notes</strong>
                  <p className="text-espresso/75 text-[9px] mt-0.5">Thorough study guides tailored specifically to pass all 4 board exams.</p>
                </div>
                <div className="p-2 bg-warm-beige/20 rounded border border-biscuit/10">
                  <strong className="text-olive-green">Personal Board Support</strong>
                  <p className="text-espresso/75 text-[9px] mt-0.5">Full support for exam booking, registrations, and mock viva practices.</p>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "Career Opportunities",
          content: (
            <div className="space-y-3 py-1 font-sans text-xs">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider border-b border-biscuit/20 pb-1.5">Career Opportunities</h3>
              <p className="text-espresso/80 leading-relaxed">
                Unlike many professions, yoga offers the unique opportunity to build a deeply fulfilling career on your own terms. As a Certified Yoga Teacher, you can:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-espresso/75 pt-1 font-medium">
                <div className="flex items-center gap-1"><span>&bull;</span> <span>Private 1-on-1 sessions</span></div>
                <div className="flex items-center gap-1"><span>&bull;</span> <span>Teach group public batches</span></div>
                <div className="flex items-center gap-1"><span>&bull;</span> <span>Lead corporate wellness slots</span></div>
                <div className="flex items-center gap-1"><span>&bull;</span> <span>Teach in schools & academies</span></div>
                <div className="flex items-center gap-1"><span>&bull;</span> <span>Organize retreats & workshops</span></div>
                <div className="flex items-center gap-1"><span>&bull;</span> <span>Offer custom digital sessions</span></div>
              </div>
            </div>
          )
        },
        {
          title: "Program Fee Structure",
          content: (
            <div className="space-y-4 py-2 text-center max-w-sm mx-auto">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider">Tuition Fees</h3>
              <div className="py-2 border-y border-biscuit/25 my-1">
                <span className="text-[10px] uppercase font-bold text-biscuit tracking-wider block">All-Inclusive Tuition</span>
                <span className="font-cinzel text-3xl font-extrabold text-espresso">₹60,000</span>
                <span className="text-[9px] text-espresso/50 block mt-0.5">(Includes registration & exam fees for all 4 milestones)</span>
              </div>
              <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                No hidden costs. Covers all study guides, mock exams, online practical assessments, and actual board fees for Yoga Pravesh, Parichay, YCB L1, and YCB L2.
              </p>
              <p className="font-sans text-[10px] text-espresso/60 bg-warm-beige/30 p-2 rounded">
                * May be paid in <strong>two equal installments</strong>. Contact us for arrangements.
              </p>
            </div>
          )
        },
        {
          title: "Admissions Contact",
          content: (
            <div className="space-y-4 py-4 text-center max-w-sm mx-auto">
              <h3 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider">Enrollment Inquiries</h3>
              <p className="font-sans text-xs text-espresso/70">
                To consult on eligibility, study pathways, or program fit, feel free to contact us:
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-center pt-2">
                <div className="p-2 border border-biscuit/20 rounded bg-warm-beige/10">
                  <p className="font-cinzel font-bold text-espresso uppercase text-[10px]">Devika Bhide</p>
                  <p className="font-mono text-olive-green mt-1 font-semibold text-[11px]">+91 8208368237</p>
                  <p className="text-[9px] text-espresso/50 mt-0.5">@ghungroo.and.yogamat</p>
                </div>
                <div className="p-2 border border-biscuit/20 rounded bg-warm-beige/10">
                  <p className="font-cinzel font-bold text-espresso uppercase text-[10px]">Shweta Vaikunthe</p>
                  <p className="font-mono text-olive-green mt-1 font-semibold text-[11px]">+91 9607517375</p>
                  <p className="text-[9px] text-espresso/50 mt-0.5">@breathing_point</p>
                </div>
              </div>
            </div>
          )
        }
      ];
    } else {
      // Fallback 3-page prospectus booklet for other programs
      return [
        {
          title: "Overview",
          content: (
            <div className="space-y-4 py-4 text-center select-none">
              <div className="text-olive-green opacity-80">
                <svg viewBox="0 0 100 100" className="w-16 h-16 fill-current mx-auto">
                  <path d="M50 15c-1.5 0-3 3-3 5.5s1.5 4.5 3 4.5 3-2 3-4.5-1.5-5.5-3-5.5zm0 13c-7 0-14 4-17 11 3-2 8-3 12-2 1.5.5 3.5 1 5 1s3.5-.5 5-1c4-1 9 0 12 2-3-7-10-11-17-11zm-20 18c-3 3-5 8-4 13 4-2 9-2 13 1 .5.5 1 1 2 1.5v-8.5c-4.5-3-9-5-11-7zm40 0c-2 2-6.5 4-11 7v8.5c1-.5 1.5-1 2-1.5 4-3 9-3 13-1 1-5-1-10-4-13zM25 70c0 4 3 7 7 7h36c4 0 7-3 7-7H25z"/>
                </svg>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[9px] bg-biscuit/30 text-espresso px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">{program.category}</span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-extrabold text-espresso tracking-wide uppercase leading-snug">
                  {program.name}
                </h3>
                <div className="artistic-divider w-24 mx-auto my-2" />
                <p className="font-sans text-xs text-espresso/70 leading-relaxed max-w-md mx-auto">
                  Official syllabus and structure booklet for seekers.
                </p>
              </div>
            </div>
          )
        },
        {
          title: "Sadhana Path & Schedule",
          content: (
            <div className="space-y-4 py-2 font-sans text-xs">
              <div className="border-b border-biscuit/20 pb-2">
                <h4 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider">Path Details</h4>
                <p className="text-[11px] text-espresso/75 mt-1 leading-relaxed">{program.description.slice(0, 200)}...</p>
              </div>
              {program.schedule && program.schedule.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-cinzel text-xs font-bold text-olive-green uppercase tracking-wider">Sessions</h4>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                    {program.schedule.map((sch, i) => (
                      <div key={i} className="p-2 bg-warm-beige/25 rounded border border-biscuit/15 text-[10px] leading-relaxed">
                        <p className="font-semibold text-espresso">{sch.day} &bull; <span className="font-mono text-olive-green">{sch.time}</span></p>
                        <p className="text-espresso/70 text-[9px]">{sch.topic}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        },
        {
          title: "Tuition & FAQs",
          content: (
            <div className="space-y-4 py-2 font-sans text-xs">
              <div className="text-center p-3 bg-warm-beige/35 rounded-lg border border-biscuit/20 mb-2">
                <span className="text-[9px] uppercase font-bold text-biscuit tracking-wider block">Tuition Investment</span>
                <span className="font-cinzel text-xl font-bold text-espresso">{program.fees}</span>
                <span className="text-[9px] text-espresso/50 block mt-0.5">Starting: {program.startingDate} &bull; {program.duration}</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider">Admissions Support</h4>
                <p className="text-[11px] text-espresso/70">Connect with founders Shweta and Devika for direct interview diagnostics and slots reservations.</p>
                <p className="text-[10px] text-olive-green font-mono font-bold">Email: Devikabhide8@gmail.com</p>
              </div>
            </div>
          )
        }
      ];
    }
  };

  const prospectusPages = getProspectusPages();

  return (
    <div id="program-detail-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Background leaf overlays */}
      <div className="absolute top-24 left-4 pointer-events-none opacity-5">
        <PeepalLeaf size={160} />
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto pt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-sans text-xs tracking-wider uppercase font-semibold text-espresso/60 hover:text-espresso transition-colors group focus:outline-none cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Programs</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Main Info & Syllabus */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Header block */}
          <div className="space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-bold">
              {program.category}
            </span>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-semibold text-espresso leading-snug">
              {program.name}
            </h1>
            <div className="w-16 h-0.5 bg-biscuit" />
          </div>

          {/* Hero Banner inside details */}
          <div className="aspect-[16/9] rounded-xl overflow-hidden border border-biscuit/30 bg-warm-beige/15 shadow-sm relative group">
            <img
              src={program.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200'}
              alt={program.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.98]"
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="font-cinzel text-xl font-bold text-espresso flex items-center gap-2">
              <BookOpen size={18} className="text-olive-green" />
              <span>Program Path & Intent</span>
            </h2>
            <p className="font-sans text-sm text-espresso/80 leading-relaxed whitespace-pre-line">
              {program.description}
            </p>
          </div>

          {/* Interactive Program Prospectus */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="font-cinzel text-xl font-bold text-espresso flex items-center gap-2">
                  <FileText size={18} className="text-olive-green" />
                  <span>Interactive Program Prospectus</span>
                </h2>
                <p className="font-sans text-xs text-espresso/60">An immersive, page-by-page digital edition of the official program guidebook.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreenProspectus(prev => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-biscuit rounded-lg font-sans text-[10px] tracking-wider uppercase font-semibold text-espresso hover:bg-warm-beige/20 transition-all cursor-pointer"
                >
                  {isFullscreenProspectus ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                  <span>{isFullscreenProspectus ? "Exit Immersive" : "Immersive Reader"}</span>
                </button>
              </div>
            </div>

            {/* Booklet Reader Frame */}
            <div className={`border border-biscuit/40 rounded-2xl bg-[#FAFAF8] shadow-sm relative overflow-hidden transition-all duration-300 ${isFullscreenProspectus ? 'fixed inset-0 z-50 p-4 sm:p-8 md:p-12 lg:p-20 bg-espresso/95 flex flex-col justify-center items-center' : 'p-6 md:p-8'}`}>
              
              {/* Immersive Close Button */}
              {isFullscreenProspectus && (
                <button 
                  onClick={() => setIsFullscreenProspectus(false)}
                  className="absolute top-6 right-6 p-2 text-primary-white hover:text-biscuit transition-colors z-50 cursor-pointer focus:outline-none bg-espresso/50 rounded-full"
                >
                  <Minimize2 size={20} />
                </button>
              )}

              {/* The "Paper/Parchment" sheet */}
              <div className={`w-full relative rounded-xl transition-all duration-300 ${isFullscreenProspectus ? 'max-w-3xl bg-[#FAFAF8] p-8 md:p-12 border-2 border-biscuit shadow-2xl artistic-double-border' : 'artistic-double-border bg-primary-white p-6 md:p-10'}`}>
                
                {/* Botanical leaves decor inside the page */}
                <div className="absolute top-4 right-4 pointer-events-none opacity-5 text-olive-green">
                  <PeepalLeaf size={60} />
                </div>
                
                {/* Page Content wrapper with fading transition key */}
                <div key={prospectusPage} className="animate-fadeIn min-h-[250px] sm:min-h-[300px] flex flex-col justify-between">
                  <div>
                    {/* Header bar on each page except cover */}
                    {prospectusPage > 0 && (
                      <div className="flex justify-between items-center border-b border-biscuit/15 pb-2 mb-4">
                        <span className="font-mono text-[9px] text-biscuit uppercase tracking-widest font-bold">
                          {program.name} &bull; Prospectus
                        </span>
                        <span className="font-mono text-[9px] bg-warm-beige/50 text-espresso px-2 py-0.5 rounded font-semibold">
                          Page {prospectusPage + 1} of {prospectusPages.length}
                        </span>
                      </div>
                    )}
                    
                    {/* The Page Render */}
                    {prospectusPages[prospectusPage]?.content}
                  </div>
                  
                  {/* Page Footer Navigation */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-biscuit/10">
                    <button
                      disabled={prospectusPage === 0}
                      onClick={() => setProspectusPage(prev => Math.max(0, prev - 1))}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-biscuit/30 text-espresso disabled:opacity-30 disabled:cursor-not-allowed hover:bg-warm-beige/20 rounded font-sans text-[10px] tracking-wider uppercase font-semibold transition-all cursor-pointer focus:outline-none"
                    >
                      <ChevronLeft size={12} />
                      <span>Back</span>
                    </button>

                    {/* Dropdown page jumper */}
                    <div className="flex items-center gap-1.5">
                      <select 
                        value={prospectusPage}
                        onChange={(e) => setProspectusPage(Number(e.target.value))}
                        className="font-sans text-[10px] text-espresso/70 bg-transparent border border-biscuit/25 rounded px-2 py-1 focus:outline-none cursor-pointer"
                      >
                        {prospectusPages.map((p, idx) => (
                          <option key={idx} value={idx}>
                            Page {idx + 1}: {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      disabled={prospectusPage === prospectusPages.length - 1}
                      onClick={() => setProspectusPage(prev => Math.min(prospectusPages.length - 1, prev + 1))}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-espresso text-primary-white hover:bg-olive-green disabled:opacity-30 disabled:cursor-not-allowed rounded font-sans text-[10px] tracking-wider uppercase font-semibold transition-all cursor-pointer focus:outline-none"
                    >
                      <span>Next</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Download Prospectus directly from reader option */}
              {!isFullscreenProspectus && (
                <div className="text-center pt-4">
                  <p className="font-sans text-[10px] text-espresso/60 flex items-center justify-center gap-1">
                    <span>Prefer offline reading?</span>
                    <button 
                      onClick={handleDownloadBrochure}
                      className="text-olive-green underline font-semibold cursor-pointer hover:text-espresso transition-colors bg-transparent border-none p-0"
                    >
                      Download this document as text PDF
                    </button>
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Timetable / Schedule */}
          {program.schedule && program.schedule.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-cinzel text-xl font-bold text-espresso flex items-center gap-2">
                <Clock size={18} className="text-olive-green" />
                <span>Sadhana Timetable</span>
              </h2>
              <div className="border border-biscuit/30 rounded-xl overflow-hidden shadow-sm bg-primary-white">
                <table className="w-full font-sans text-xs text-left">
                  <thead className="bg-[#F3EBDD]/60 border-b border-biscuit/20 text-espresso/80 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Days / Phase</th>
                      <th className="px-6 py-4">Time Window</th>
                      <th className="px-6 py-4">Shastra Study & Practices</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-biscuit/10 text-espresso/80">
                    {program.schedule.map((sch, i) => (
                      <tr key={i} className="hover:bg-warm-beige/10 transition-colors">
                        <td className="px-6 py-4 font-semibold">{sch.day}</td>
                        <td className="px-6 py-4 font-mono text-olive-green">{sch.time}</td>
                        <td className="px-6 py-4">{sch.topic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Program-specific FAQs */}
          {program.faq && program.faq.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-cinzel text-xl font-bold text-espresso flex items-center gap-2">
                <HelpCircle size={18} className="text-olive-green" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-4">
                {program.faq.map((fq, i) => (
                  <div key={i} className="p-6 border border-biscuit/20 bg-primary-white rounded-xl shadow-sm">
                    <h4 className="font-cinzel text-sm font-semibold text-espresso mb-2">Q: {fq.question}</h4>
                    <p className="font-sans text-xs text-espresso/70 leading-relaxed">A: {fq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Program Testimonials */}
          {program.testimonials && program.testimonials.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-cinzel text-xl font-bold text-espresso flex items-center gap-2">
                <Heart size={18} className="text-olive-green" />
                <span>Seeker Reflections</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {program.testimonials.map((test, i) => (
                  <div key={i} className="p-6 border border-biscuit/35 bg-[#FAFAF8] rounded-xl relative shadow-sm flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex gap-0.5 text-olive-green">
                        {Array.from({ length: test.rating }).map((_, r) => (
                          <Heart key={r} size={10} className="fill-olive-green" />
                        ))}
                      </div>
                      <p className="font-sans text-xs text-espresso/80 leading-relaxed italic">
                        "{test.text}"
                      </p>
                    </div>
                    <span className="block font-cinzel text-xs font-semibold text-espresso mt-4 text-right">— {test.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Program Gallery */}
          {program.gallery && program.gallery.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-cinzel text-xl font-bold text-espresso">Curriculum Media</h2>
              <div className="grid grid-cols-2 gap-4">
                {program.gallery.map((img, i) => (
                  <div key={i} className="aspect-[16/10] border border-biscuit/20 rounded-lg overflow-hidden bg-warm-beige/20 shadow-xs">
                    <img
                      src={img}
                      alt={`Gallery view ${i}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter sepia-[0.1]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Action Widget & Form */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
          
          {/* Quick Stats widget */}
          <div className="bg-primary-white border border-biscuit/30 p-6 rounded-xl shadow-sm space-y-6">
            
            <div className="text-center pb-4 border-b border-biscuit/20">
              <span className="text-[10px] font-mono text-biscuit uppercase tracking-wider block font-semibold mb-1">Tuition / Fees</span>
              <span className="font-cinzel text-2xl font-extrabold text-espresso">{program.fees}</span>
            </div>

            <div className="space-y-4 text-xs font-sans text-espresso/70">
              <div className="flex justify-between">
                <span className="text-espresso/50 uppercase font-semibold">Starting Date:</span>
                <span className="font-mono text-espresso font-semibold">{program.startingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/50 uppercase font-semibold">Duration:</span>
                <span className="text-espresso font-semibold">{program.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/50 uppercase font-semibold">Status:</span>
                <span className="text-olive-green font-semibold uppercase tracking-wider">Open for Sadhakas</span>
              </div>
            </div>

            {/* Member Enrollment & Course Registration Action */}
            <div className="pt-2">
              {currentStudent?.enrolledCourses.some(c => c.programId === program.id) ? (
                <div className="p-4 bg-olive-green/10 border border-olive-green/30 rounded-lg text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-olive-green font-bold text-xs font-sans">
                    <CheckCircle2 size={16} />
                    <span>You are Enrolled in this Course</span>
                  </div>
                  <p className="text-[11px] font-sans text-espresso/70">
                    Receipt: <span className="font-mono font-semibold">
                      {currentStudent.enrolledCourses.find(c => c.programId === program.id)?.receiptNumber}
                    </span>
                  </p>
                  <p className="text-[10px] font-sans text-olive-green/90">
                    Access your recorded classes and materials in the Student Portal.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  id="detail-register-course-btn"
                  onClick={() => startCourseRegistration(program)}
                  className="w-full py-3.5 px-4 bg-olive-green hover:bg-olive-green/90 text-primary-white shadow-md hover:shadow-lg transition-all rounded-lg font-sans text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus size={16} />
                  <span>
                    {currentStudent ? 'Enroll in this Course' : 'Member Login / Register to Enroll'}
                  </span>
                </button>
              )}
            </div>

            {/* Brochures & Materials */}
            <div className="pt-2 border-t border-biscuit/20 space-y-3">
              <button
                onClick={handleDownloadBrochure}
                className="w-full py-3 px-4 bg-transparent border border-biscuit text-espresso hover:bg-warm-beige/20 transition-all duration-300 rounded font-sans text-[11px] tracking-widest uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                <Download size={14} />
                <span>Download Prospectus</span>
              </button>
            </div>

          </div>

          {/* Secure Ingress Registration form */}
          <div className="bg-[#F3EBDD]/40 border border-biscuit/40 p-6 rounded-xl shadow-sm space-y-4">
            
            <div className="space-y-1">
              <h3 className="font-cinzel text-sm font-bold text-espresso uppercase tracking-wider">Course Registration Inquiry</h3>
              <p className="font-sans text-[11px] text-espresso/60 leading-relaxed">Submit your credentials, and the founders will schedule your physical/phone diagnostics.</p>
            </div>

            {submitted ? (
              <div className="p-4 bg-white border border-olive-green/40 rounded-lg text-center space-y-3">
                <ClipboardCheck size={28} className="text-olive-green mx-auto" />
                <h4 className="font-cinzel text-xs font-bold text-espresso uppercase">Inquiry Registered</h4>
                <p className="font-sans text-[11px] text-espresso/70">Devika and Shweta will reach out to you within 24 hours of traditional time.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] font-mono text-olive-green hover:underline uppercase"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block font-sans text-[10px] text-espresso/70 uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 bg-primary-white text-xs text-espresso rounded focus:outline-none focus:border-olive-green"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] text-espresso/70 uppercase tracking-wider mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 bg-primary-white text-xs text-espresso rounded focus:outline-none focus:border-olive-green"
                    placeholder="e.g. +91 98220 00000"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] text-espresso/70 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 bg-primary-white text-xs text-espresso rounded focus:outline-none focus:border-olive-green"
                    placeholder="e.g. seeker@gmail.com"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] text-espresso/70 uppercase tracking-wider mb-1">Sadhana Background / Message</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 bg-primary-white text-xs text-espresso rounded focus:outline-none focus:border-olive-green resize-none"
                    placeholder="Briefly tell us if you have any health conditions or prior practice..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-espresso hover:bg-olive-green text-primary-white transition-colors duration-300 rounded font-sans text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <ClipboardCheck size={14} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
