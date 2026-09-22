import React, { useEffect } from 'react';
import { useYoga } from '../context/YogaContext';
import { 
  ArrowRight, BookOpen, Compass, Award, Calendar, Heart, Shield, Users, 
  GraduationCap, ShieldCheck, User, UserPlus, CheckCircle2 
} from 'lucide-react';
import { PeepalLeaf, LotusFlower, BananaLeaf, DevanagariScript, BotanicalBorder } from './BotanicalAssets';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
  onNavigateDetail: (view: [string, string]) => void;
  initialSection?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentPage, onNavigateDetail, initialSection }) => {
  const { programs, blogs, testimonials, currentStudent, startCourseRegistration, openAuthModal } = useYoga();

  // Scroll to section if specified
  useEffect(() => {
    if (initialSection) {
      const timer = setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [initialSection]);

  const scrollToAbout = () => {
    const el = document.getElementById('about-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get first 3 programs to display
  const featuredPrograms = programs.slice(0, 3);
  // Get first 2 blogs to display
  const featuredBlogs = blogs.slice(0, 2);

  const stats = [
    { label: 'Traditional Lineage', desc: 'Patanjali & Hatha Sastra' },
    { label: 'Government Certified', desc: 'Ministry of Ayush Approved' },
    { label: 'Small Batches', desc: 'Max 15 Seekers for Personalized Diksha' },
    { label: 'Faculty Depth', desc: 'MA Yogashastra & YCB Masters' },
  ];

  return (
    <div id="home-view" className="relative overflow-hidden animate-fadeIn pb-16">
      
      {/* Decorative Botanical Background Sketches (Subtle floating) */}
      <div className="absolute top-10 right-4 pointer-events-none select-none z-0">
        <PeepalLeaf size={160} className="text-olive-green" />
      </div>
      <div className="absolute top-[45%] -left-10 pointer-events-none select-none z-0">
        <BananaLeaf size={240} className="text-olive-green rotate-12" />
      </div>
      <div className="absolute bottom-[20%] right-4 pointer-events-none select-none z-0">
        <PeepalLeaf size={140} className="text-biscuit rotate-[25deg]" />
      </div>

      {/* --- Section 1: Hero Section --- */}
      <section id="hero-section" className="relative min-h-[85vh] flex items-center bg-[#FAFAF8] py-16 px-4 sm:px-6 lg:px-8 border-b border-biscuit/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
           {!currentStudent ? (
                <button
                  id="hero-member-login-btn"
                  onClick={() => openAuthModal({ mode: 'login' })}
                  className="px-6 py-3.5 bg-espresso hover:bg-espresso/90 text-primary-white rounded-lg font-sans text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  <User size={14} />
                  <span>Member Login / Register</span>
                </button>
              ) : (
                <button
                  id="hero-student-portal-btn"
                  onClick={() => setCurrentPage('student-portal')}
                  className="px-6 py-3.5 bg-olive-green text-primary-white hover:bg-olive-green/90 rounded-lg font-sans text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  <GraduationCap size={14} />
                  <span>Training Enroll</span>
                </button>
              )}

          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-biscuit/40 rounded-full bg-warm-beige/30">
              <LotusFlower size={20} className="text-olive-green" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-espresso/70 font-semibold">
                An Ancient Indian Gurukul In Viman Nagar
              </span>
            </div>

            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-espresso leading-[1.1] max-w-2xl">
              Where Ancient <span className="font-serif italic text-olive-green font-normal">Wisdom</span> Meets Modern Living
            </h1>

            <p className="font-sans text-base md:text-lg text-espresso/75 leading-relaxed max-w-xl">
              Ishwari Yoga Institute is a place dedicated to preserving, studying, and sharing authentic yogic knowledge through education, teacher training, retreats, workshops, and community.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                id="hero-explore-btn"
                onClick={() => setCurrentPage('programs')}
                className="px-7 py-3.5 artistic-button-primary rounded-lg text-primary-white font-sans text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
              >
                <span>Explore Programs</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

             
              <button
                id="hero-about-btn"
                onClick={scrollToAbout}
                className="px-6 py-3.5 artistic-button-secondary rounded-lg font-sans text-xs tracking-widest uppercase font-semibold cursor-pointer text-center"
              >
                About Our Institute
              </button>
            </div>
          </div>

          {/* Hero Visual Block */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl border border-biscuit/40 p-3 bg-primary-white shadow-sm overflow-hidden relative group">
              {/* Image without stretch, formatted beautifully */}
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
                alt="Classical Yoga Practice Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg filter sepia-[0.12] contrast-[0.98] transition-transform duration-[4000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-primary-white">
                <span className="block font-mono text-[10px] tracking-[0.2em] uppercase opacity-80 mb-1">Authentic Sadhana</span>
                <span className="block font-cinzel text-base tracking-wider font-semibold">Ishwari Asana Mandir</span>
              </div>
            </div>
            
            {/* Hanging leaf overlay decoration */}
            <div className="absolute -top-6 -right-6 bg-[#FAFAF8] p-3 rounded-full border border-biscuit/30 shadow-sm animate-bounce duration-[4000ms]">
              <LotusFlower size={36} className="text-lotus-pink" />
            </div>
          </div>

        </div>
      </section>

      {/* --- Section 2: About Our Institute & The Gurukul Vision --- */}
      <section id="about-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-white border-t border-biscuit/20 relative">
        <div className="max-w-5xl mx-auto space-y-16 relative">
          
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-biscuit font-bold uppercase">
              The Lineage of Shastra & Sadhana
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-semibold tracking-wide text-espresso">
              About Our Institute & Gurukul Vision
            </h2>
            <p className="font-serif text-lg italic text-olive-green max-w-2xl mx-auto">
              "Preserving classical Indian sciences with rigorous research and absolute devotional sincerity."
            </p>
            <div className="w-16 h-0.5 bg-biscuit mx-auto" />
          </div>

          {/* Gurukul Vision Narrative & Study Environment Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <h3 className="font-cinzel text-2xl font-semibold text-espresso">The Gurukul Vision</h3>
              <p className="font-sans text-sm text-espresso/80 leading-relaxed">
                Ishwari Yoga Institute was envisioned not as a modern boutique fitness gym, but as a silent sanctuary where the deep, traditional gurukul model meets modern systematic education. We emphasize study (<em>Svadhyaya</em>), physical and energetic purity (<em>Shatkarma</em>), and therapeutic integration.
              </p>
              <p className="font-sans text-sm text-espresso/80 leading-relaxed">
                Located in Viman Nagar, Pune, the institute has spent years preserving standard Sanskrit textbooks (like Patanjali Yoga Sutras, Hatha Pradipika, Gheranda Samhita, and Yoga Upanishads), making them practical for corporate professionals, students, and mothers-to-be.
              </p>
              <div className="p-5 bg-warm-beige/30 border border-biscuit/30 rounded-lg">
                <p className="font-serif italic text-espresso/90 text-sm">
                  "Yoga is the journey of the self, through the self, to the self."
                </p>
                <span className="block font-mono text-[10px] tracking-[0.15em] text-biscuit uppercase font-semibold mt-2">
                  — Bhagavad Gita
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-biscuit/40 p-3 bg-primary-white shadow-sm overflow-hidden">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-warm-beige/20 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800" 
                  alt="Traditional study setting in Pune" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter sepia-[0.12] transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-primary-white">
                  <span className="block font-mono text-[9px] tracking-widest uppercase opacity-80">Silent Sanctuary</span>
                  <span className="font-cinzel text-xs font-semibold">Traditional Gurukul Study Setting</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Foundational Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
            <div className="p-6 bg-[#FAFAF8] rounded-xl border border-biscuit/30 space-y-3">
              <h4 className="font-serif text-lg italic text-olive-green">Timeless & Practical</h4>
              <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                Yoga at Ishwari is a highly scientific lifestyle designed in ancient India and perfected over millennia. We study Patanjali and Hatha shastras, translating them into tools for modern cognitive and nervous system balance.
              </p>
            </div>
            <div className="p-6 bg-[#FAFAF8] rounded-xl border border-biscuit/30 space-y-3">
              <h4 className="font-serif text-lg italic text-olive-green">Stages of Life (Ashrama)</h4>
              <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                A teenager’s body, an active householder’s mind, and an elderly seeker’s joints require completely distinct practices. We tailor sadhana to fit your age, physiological constitution, and spiritual readiness.
              </p>
            </div>
            <div className="p-6 bg-[#FAFAF8] rounded-xl border border-biscuit/30 space-y-3">
              <h4 className="font-serif text-lg italic text-olive-green">Integration Over Escape</h4>
              <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                The ultimate goal of yoga is integration—the harmony of body, breath, nervous system, and consciousness. We help you build a robust inner anchor so you live centered right in the middle of metropolitan duties.
              </p>
            </div>
          </div>

          {/* Devanagari Sacred Inscription */}
          <div className="pt-6 max-w-3xl mx-auto">
            <DevanagariScript />
          </div>

        </div>
      </section>

      {/* --- Section 3: The Custodians of Tradition (Founders & Faculty) --- */}
      <section id="founders-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-t border-b border-biscuit/20 relative">
        <div className="absolute top-1/2 left-4 pointer-events-none opacity-5">
          <BananaLeaf size={280} />
        </div>
        
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">The Custodians of Tradition</span>
            <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">
              Meet the Founders
            </h2>
            <p className="font-sans text-sm text-espresso/60 max-w-xl mx-auto">
              Devika Bhide and Shweta Vaikunthe founded the Institute with a vision to make classical yoga shastra accessible, rigorous, and therapeutic.
            </p>
            <div className="w-12 h-[1px] bg-biscuit mx-auto mt-4" />
          </div>

          {/* Detailed Biography 1: Devika Bhide */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start p-8 bg-primary-white rounded-2xl border border-biscuit/30 shadow-sm">
            <div className="lg:col-span-4 space-y-4">
              <div className="aspect-[3/4] rounded-lg overflow-hidden border border-biscuit/30 p-2 bg-warm-beige/10">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500" 
                  alt="Devika Bhide" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded filter sepia-[0.1] contrast-[0.98]"
                />
              </div>
              <div className="text-center lg:text-left space-y-1">
                <h3 className="font-cinzel text-xl font-bold text-espresso">Devika Bhide</h3>
                <p className="font-sans text-xs text-olive-green tracking-wider uppercase font-semibold">Co-Founder | Yoga Educator | Yoga Master | Researcher</p>
                <p className="font-sans text-[11px] text-espresso/60">M.A. Yogashastra • YCB Level 4 Yoga Master • YCB Level 7 Therapeutic Instructor</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5 text-left">
              <h4 className="font-cinzel text-lg font-bold text-espresso border-b border-biscuit/20 pb-2">
                Academic, Therapeutic & Research Profile
              </h4>
              <p className="font-sans text-xs sm:text-sm text-espresso/80 leading-relaxed">
                Devika Bhide is a yoga educator, researcher, and practitioner dedicated to preserving and sharing the authentic wisdom of yoga through education, practice, and lifelong learning. With a strong foundation in classical yogic studies, she believes that yoga is far more than a physical discipline—it is a timeless science that can be understood and applied meaningfully in everyday life.
              </p>
              <p className="font-sans text-xs sm:text-sm text-espresso/80 leading-relaxed">
                She holds a Master's degree (M.A.) in Yogashastra, is a YCB Level 4 Yoga Master and a YCB Level 7 Therapeutic Yoga Instructor, along with a Diploma in Yoga Therapy. She also holds specialized certifications in Prenatal Yoga, Women's Health Yoga, Office Yoga, and other clinical aspects of yogic sciences.
              </p>
              <p className="font-sans text-xs sm:text-sm text-espresso/80 leading-relaxed">
                Over the years, Devika has conducted yoga teacher training programs, workshops, retreats, therapeutic and prenatal yoga sessions, and has mentored numerous students through government-recognised Yoga Certification Board (YCB) courses. Her teaching style blends traditional yogic philosophy with scientific understanding.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3 items-start p-3 bg-warm-beige/20 rounded-lg border border-biscuit/20">
                  <GraduationCap className="text-olive-green shrink-0 mt-1" size={18} />
                  <div>
                    <h5 className="font-cinzel text-xs font-semibold text-espresso uppercase">M.A. Yogashastra & Diploma</h5>
                    <p className="text-[11px] text-espresso/60 mt-0.5">Deep scriptural and scholarly studies in classical yoga texts paired with clinical-grade therapeutic diploma systems.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-3 bg-warm-beige/20 rounded-lg border border-biscuit/20">
                  <Award className="text-olive-green shrink-0 mt-1" size={18} />
                  <div>
                    <h5 className="font-cinzel text-xs font-semibold text-espresso uppercase">YCB Level 4 & 7 Accreditations</h5>
                    <p className="text-[11px] text-espresso/60 mt-0.5">Certified as both a Yoga Master and a Therapeutic Yoga Instructor under the Ministry of AYUSH, Government of India.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Biography 2: Shweta Vaikunthe */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start p-8 bg-primary-white rounded-2xl border border-biscuit/30 shadow-sm">
            <div className="lg:col-span-4 lg:order-last space-y-4">
              <div className="aspect-[3/4] rounded-lg overflow-hidden border border-biscuit/30 p-2 bg-warm-beige/10">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500" 
                  alt="Shweta Vaikunthe" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded filter sepia-[0.1] contrast-[0.98]"
                />
              </div>
              <div className="text-center lg:text-left space-y-1">
                <h3 className="font-cinzel text-xl font-bold text-espresso">Shweta Vaikunthe</h3>
                <p className="font-sans text-xs text-olive-green tracking-wider uppercase font-semibold">Co-Founder | Yoga Educator | Yoga Master | Yoga Therapist</p>
                <p className="font-sans text-[11px] text-espresso/60">M.A. Yogashastra • Master's in Yogic Science • YCB Certified Therapist & Evaluator</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5 text-left">
              <h4 className="font-cinzel text-lg font-bold text-espresso border-b border-biscuit/20 pb-2">
                Academic, Therapeutic & Clinical Expertise
              </h4>
              <p className="font-sans text-xs sm:text-sm text-espresso/80 leading-relaxed">
                Shweta Vaikunthe is a passionate yoga educator and therapist with over 12 years of rich teaching experience, dedicated to making authentic yogic knowledge highly accessible and transformative to people from all walks of life. With a strong academic foundation and extensive clinical expertise, she believes in using yoga as a powerful tool for holistic health.
              </p>
              <p className="font-sans text-xs sm:text-sm text-espresso/80 leading-relaxed">
                She holds a Master's degree in Yogashastra from Kulguru Kalidas Sanskrit University (KKSU), Nagpur, along with a Master's in Yogic Science. She is certified by the prestigious Yoga Certification Board (YCB), Ministry of AYUSH, Government of India, as a Yoga Instructor, Evaluator, Yoga Master, and Therapeutic Yoga Consultant.
              </p>
              <p className="font-sans text-xs sm:text-sm text-espresso/80 leading-relaxed">
                Over her distinguished career of more than a decade, Shweta has trained thousands of students in Hatha, Ashtanga, Iyengar, Vinyasa, Medical, and Therapeutic Yoga, seamlessly combining traditional scriptural principles with a compassionate, student-centric, and practical teaching approach.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3 items-start p-3 bg-warm-beige/20 rounded-lg border border-biscuit/20">
                  <ShieldCheck className="text-olive-green shrink-0 mt-1" size={18} />
                  <div>
                    <h5 className="font-cinzel text-xs font-semibold text-espresso uppercase">Dual Masters Degrees</h5>
                    <p className="text-[11px] text-espresso/60 mt-0.5">M.A. in Yogashastra from KKSU Nagpur and Master's in Yogic Science, anchoring her teaching in deep academic rigor.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-3 bg-warm-beige/20 rounded-lg border border-biscuit/20">
                  <BookOpen className="text-olive-green shrink-0 mt-1" size={18} />
                  <div>
                    <h5 className="font-cinzel text-xs font-semibold text-espresso uppercase">AYUSH Ministry Evaluator</h5>
                    <p className="text-[11px] text-espresso/60 mt-0.5">YCB Certified Yoga Master, Instructor, Evaluator, and Therapeutic Yoga Consultant overseeing national examinations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- Section 4: Awards & Achievements --- */}
      <section id="awards-section" className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <LotusFlower size={44} className="text-lotus-pink mx-auto" />
        <div className="space-y-2">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">Institutional Recognition</span>
          <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-espresso">Awards & Institutional Achievements</h3>
          <p className="font-sans text-sm text-espresso/70 max-w-lg mx-auto">
            We remain deeply humble for the recognition bestowed upon the institute by the cultural, defense, and academic community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
          <div className="p-6 border border-biscuit/30 bg-primary-white rounded-xl space-y-3 shadow-xs">
            <span className="text-[10px] font-mono text-biscuit uppercase tracking-widest font-semibold block">2026 Honor</span>
            <h4 className="font-cinzel text-sm font-bold text-espresso">Wellness Hero Award 2026</h4>
            <p className="font-sans text-xs text-espresso/70 leading-relaxed">
              Honoured by Pune Times Mirror for pioneering contributions to classical yogic education, prenatal wellness, and holistic health practices.
            </p>
          </div>
          <div className="p-6 border border-biscuit/30 bg-primary-white rounded-xl space-y-3 shadow-xs">
            <span className="text-[10px] font-mono text-biscuit uppercase tracking-widest font-semibold block">2026 Service</span>
            <h4 className="font-cinzel text-sm font-bold text-espresso">Exercise PRAGATI Representation</h4>
            <p className="font-sans text-xs text-espresso/70 leading-relaxed">
              Selected to represent India in the Multi Military Exercise PRAGATI held in Meghalaya, cultivating leadership, discipline, and national integration.
            </p>
          </div>
          <div className="p-6 border border-biscuit/30 bg-primary-white rounded-xl space-y-3 shadow-xs">
            <span className="text-[10px] font-mono text-biscuit uppercase tracking-widest font-semibold block">2025 Paper</span>
            <h4 className="font-cinzel text-sm font-bold text-espresso">Clinical Research Contribution</h4>
            <p className="font-sans text-xs text-espresso/70 leading-relaxed">
              Co-published a scientific clinical paper detailing the physiological effects of Nadi Shodhana pranayama on stress markers in Pune hospitals.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 5: Offered Programs --- */}
      <section id="programs-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">Sadhana & Sastra Marg</span>
              <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">
                Offered Programs
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('programs')}
              className="font-sans text-xs tracking-widest uppercase font-semibold text-espresso hover:text-olive-green transition-all inline-flex items-center gap-1.5 group cursor-pointer"
            >
              <span>View All Programs</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((prog) => {
              const isEnrolled = currentStudent?.enrolledCourses.some(c => c.programId === prog.id);

              return (
                <div
                  key={prog.id}
                  onClick={() => onNavigateDetail(['program-detail', prog.id])}
                  className="artistic-card rounded-xl overflow-hidden cursor-pointer flex flex-col h-full group transition-all duration-300 hover:shadow-lg border border-biscuit/25"
                >
                  <div className="aspect-[16/10] bg-warm-beige/10 overflow-hidden border-b border-biscuit/10 relative">
                    <img
                      src={prog.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400'}
                      alt={prog.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.98] transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-primary-white/95 px-3 py-1 rounded-full border border-biscuit/30">
                      <span className="text-[9px] font-sans font-semibold tracking-wider text-espresso uppercase">
                        {prog.category}
                      </span>
                    </div>

                    {isEnrolled && (
                      <div className="absolute top-4 right-4 bg-olive-green text-primary-white px-2.5 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>Enrolled</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-cinzel text-lg font-semibold text-espresso group-hover:text-olive-green transition-colors leading-snug">
                        {prog.name}
                      </h3>
                      <p className="font-sans text-xs text-espresso/70 leading-relaxed line-clamp-3">
                        {prog.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-biscuit/20 flex items-center justify-between font-sans text-[11px] text-espresso/60">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-olive-green" />
                        Starts: {prog.startingDate}
                      </span>
                      <span className="font-semibold text-espresso font-mono">
                        {prog.fees}
                      </span>
                    </div>

                    <div className="pt-2">
                      {isEnrolled ? (
                        <div className="py-2 px-3 bg-olive-green/10 text-olive-green rounded-lg text-center font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                          <CheckCircle2 size={13} />
                          <span>Active Sadhaka</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          id={`home-register-course-${prog.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            startCourseRegistration(prog);
                          }}
                          className="w-full py-2.5 px-3 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <UserPlus size={13} />
                          <span>Register for Course</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- Section 5: Why Learn With Us --- */}
      <section id="why-us-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-white">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">A Sanctuary for Deep Study</span>
            <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">
              Why Learn With Us?
            </h2>
            <div className="w-12 h-[1px] bg-biscuit mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Authentic Education', icon: <BookOpen size={20} />, desc: 'No yoga gymnastics or neon studios. We teach the original Sanskrit texts, philosophy, and classical Hatha systems.' },
              { title: 'Science with Philosophy', icon: <Compass size={20} />, desc: 'Every posture alignment, pranayama retention, and Shatkarma is explained with clinical and physical biomechanical safety.' },
              { title: 'Government Certified', icon: <Award size={20} />, desc: 'Our courses and evaluators are approved and licensed by the Yoga Certification Board (YCB), Ministry of Ayush, India.' },
              { title: 'Small Sacred Batches', icon: <Users size={20} />, desc: 'We strictly limit our batches to 15 seekers, ensuring individual diagnostic attention, alignment corrections, and mentorship.' }
            ].map((feat, index) => (
              <div key={index} className="p-8 artistic-card rounded-xl space-y-4">
                <div className="p-3 bg-warm-beige/40 rounded-full text-olive-green inline-block">
                  {feat.icon}
                </div>
                <h3 className="font-cinzel text-base font-semibold text-espresso">{feat.title}</h3>
                <p className="font-sans text-xs text-espresso/70 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="border-t border-b border-biscuit/30 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center bg-warm-beige/10 rounded-lg">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1 px-4">
                <span className="block font-cinzel text-lg font-bold text-olive-green uppercase tracking-wide">{stat.label}</span>
                <span className="block font-sans text-xs text-espresso/70 leading-snug">{stat.desc}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- Section 6: Testimonials --- */}
      <section id="testimonials-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-white border-t border-biscuit/15 relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-10">
          <PeepalLeaf size={180} />
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">Anubhuti - Seekers’ Voice</span>
            <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">
              Seeker Testimonials
            </h2>
            <div className="w-12 h-[1px] bg-biscuit mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div key={test.id} className="artistic-card p-8 rounded-xl relative flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-olive-green">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Heart key={i} size={12} className="fill-olive-green" />
                    ))}
                  </div>
                  <p className="font-sans text-xs text-espresso/85 leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-biscuit/20">
                  <span className="block font-cinzel text-xs font-semibold text-espresso">{test.name}</span>
                  <span className="block font-sans text-[10px] text-espresso/60 mt-0.5">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 7: Latest Blogs --- */}
      <section id="blogs-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">Swadhaya - Wisdom Reads</span>
              <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">
                Latest Philosophical Insights
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('blogs')}
              className="font-sans text-xs tracking-widest uppercase font-semibold text-espresso hover:text-olive-green transition-all inline-flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Read All Blogs</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => onNavigateDetail(['blog-detail', blog.id])}
                className="artistic-card rounded-xl overflow-hidden cursor-pointer flex flex-col h-full group"
              >
                <div className="aspect-[16/9] overflow-hidden relative border-b border-biscuit/10 bg-warm-beige/10">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.98] transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute top-4 left-4 bg-primary-white/95 px-3 py-1 rounded-full border border-biscuit/20 text-[9px] font-sans font-semibold tracking-wider text-espresso uppercase">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="font-sans text-[10px] text-espresso/50 block">{blog.date} • {blog.readTime}</span>
                    <h3 className="font-cinzel text-base font-semibold text-espresso group-hover:text-olive-green transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="font-sans text-xs text-espresso/70 leading-relaxed line-clamp-2">
                      {blog.summary}
                    </p>
                  </div>
                  <div className="pt-2 font-sans text-[11px] text-olive-green font-semibold flex items-center gap-1">
                    <span>Read Shastra Study</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- Section 8: Final CTA --- */}
      <section id="cta-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-espresso text-primary-white text-center relative overflow-hidden">
        
        {/* Subtle Devanagari background decoration */}
        <div className="absolute inset-0 opacity-5 flex items-center justify-center scale-150 pointer-events-none select-none">
          <p className="font-cinzel text-8xl text-primary-white">॥ योग ॥</p>
        </div>

        <div className="max-w-xl mx-auto space-y-8 relative z-10">
          <LotusFlower size={56} className="text-lotus-pink mx-auto animate-pulse" />
          <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wider">
            Begin Your Sacred Journey
          </h2>
          <p className="font-sans text-sm text-primary-white/80 leading-relaxed">
            Enter the simplicity of traditional study, align your breath with spiritual silence, and earn credentialed expertise with external AYUSH examiners.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-4 bg-primary-white text-espresso hover:bg-lotus-pink hover:text-espresso transition-all duration-300 font-sans text-xs tracking-widest uppercase font-semibold shadow-md inline-flex items-center gap-2 group cursor-pointer border border-biscuit/40"
            >
              <span>Connect with Founders</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <BotanicalBorder className="mt-16" />

    </div>
  );
};
