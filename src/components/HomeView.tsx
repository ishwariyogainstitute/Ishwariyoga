import React, { useEffect, useState } from 'react';
import { ArrowRight, Award, BookOpen, Calendar, Compass, GraduationCap, Heart, ShieldCheck, Users, CheckCircle2 } from 'lucide-react';
import { useYoga } from '../context/YogaContext';
import { BananaLeaf, BotanicalBorder, DevanagariScript, LotusFlower, PeepalLeaf } from './BotanicalAssets';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
  onNavigateDetail: (view: [string, string]) => void;
  initialSection?: string;
}

// Founder portraits: put the real photos in public/images/founders/ using these names.
// Until a file exists, a neutral lotus placeholder is shown (never a stock photo).
const FOUNDER_PHOTOS = {
  devika: '/images/founders/devika-bhide.jpeg',
  shweta: '/images/founders/shweta-vaikunthe.jpeg',
};

const FounderPhoto: React.FC<{ src: string; name: string }> = ({ src, name }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded bg-warm-beige/30 text-olive-green">
        <LotusFlower size={56} />
        <span className="font-cinzel text-sm text-espresso/70">{name}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="h-full w-full rounded object-cover object-top"
    />
  );
};

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentPage, onNavigateDetail, initialSection }) => {
  const { programs, blogs, testimonials, currentStudent } = useYoga();

  useEffect(() => {
    if (!initialSection) return;
    const timer = window.setTimeout(() => document.getElementById(initialSection)?.scrollIntoView({ behavior: 'smooth' }), 150);
    return () => window.clearTimeout(timer);
  }, [initialSection]);

  const featuredPrograms = programs.slice(0, 3);
  const featuredBlogs = blogs.slice(0, 2);
  const features = [
    { title: 'Learn Systematically', icon: <BookOpen size={20} />, desc: 'Structured programmes that bring together theory, practice, teaching methodology and assessment.' },
    { title: 'Learn from Experience', icon: <Award size={20} />, desc: 'Faculty with academic qualifications, Yoga teaching credentials and experience in training teachers.' },
    { title: 'Ask. Discuss. Understand.', icon: <Users size={20} />, desc: 'An environment where students are encouraged to question, clarify and understand—not simply memorise.' },
    { title: 'Beyond the Syllabus', icon: <Compass size={20} />, desc: 'Opportunities to learn through workshops, retreats, guest sessions and allied subjects.' },
  ];
  const stats = [
    ['Qualified Faculty', 'MA Yogashastra • YCB Yoga Master'],
    ['Structured Programmes', 'Theory • Practice • Assessment'],
    ['Learning Community', 'Interactive • Supportive • Focused'],
    ['Beyond the Classroom', 'Retreats • Workshops • Guest Sessions'],
  ];

  return (
    <div id="home-view" className="relative overflow-hidden pb-16">
      <div className="pointer-events-none absolute right-0 top-10 opacity-70"><PeepalLeaf size={180} className="text-olive-green" /></div>
      <div className="pointer-events-none absolute -left-10 top-[42%] opacity-70"><BananaLeaf size={220} className="rotate-12 text-olive-green" /></div>

      <section id="hero-section" className="relative flex min-h-[85vh] items-center border-b border-biscuit/20 bg-[#FAFAF8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-biscuit/30 bg-warm-beige/30 px-3 py-2">
              <LotusFlower size={18} className="text-olive-green" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-espresso/70">Tradition into Practice. 📍Pune, India.</span>
            </div>
            <div className="max-w-2xl space-y-5">
              <h1 className="font-serif text-5xl font-semibold leading-[0.95] tracking-tight text-espresso sm:text-6xl md:text-7xl">
                Awaken your <span className="italic text-olive-green">practice</span>.<br />Deepen your <span className="italic text-biscuit">purpose</span>.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-espresso/75 md:text-lg">Ishwari Yoga Institute offers authentic yoga education, mindful teacher training, and sacred living practices rooted in tradition, discipline, and modern clarity.</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-3">
              <button onClick={() => setCurrentPage('programs')} className="artistic-button-primary flex items-center gap-2 px-7 py-3.5 font-sans text-[11px] font-semibold tracking-[0.16em]"><span>Explore Programs</span><ArrowRight size={14} /></button>
              <button onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })} className="artistic-button-secondary px-6 py-3.5 font-sans text-[11px] font-semibold tracking-[0.16em]">About Our Institute</button>
            </div>
           </div>
          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-[2rem] border border-biscuit/25 bg-primary-white p-3 shadow-[0_26px_60px_rgba(80,54,42,0.12)]">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop" alt="Classical Yoga Practice Studio" referrerPolicy="no-referrer" className="relative h-[540px] w-full rounded-[1.5rem] object-cover transition-transform duration-[3000ms] group-hover:scale-105" />
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-primary-white"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em]">Authentic Sadhana</span><span className="font-serif text-2xl">Ishwari Asana Mandir</span></div>
            </div>
            <div className="absolute -right-6 -top-6 rounded-full border border-biscuit/20 bg-primary-white p-3 shadow-md"><LotusFlower size={36} className="text-olive-green" /></div>
          </div>
        </div>
      </section>

      <section id="about-section" className="relative border-t border-biscuit/10 bg-primary-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-14">
          <div className="space-y-4 text-center"><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-biscuit">The Lineage of Shastra & Sadhana</span><h2 className="font-serif text-4xl font-semibold tracking-wide text-espresso md:text-5xl">Our Vision</h2><p className="mx-auto max-w-2xl font-serif text-lg italic text-olive-green">“Preserving classical Indian sciences with rigorous research and devotional sincerity.”</p><div className="mx-auto h-px w-16 bg-biscuit" /></div>
          <div className="grid items-center gap-12 md:grid-cols-2"><div className="space-y-6"><h3 className="font-serif text-3xl font-semibold text-espresso">Our Vision</h3><p className="text-sm leading-relaxed text-espresso/80">We see Yoga as far more than a means to physical wellbeing or mental peace. At its heart lies a profound exploration of the human being — the mind, consciousness, life, and our relationship with the world around us.</p><p className="text-sm leading-relaxed text-espresso/80">The Rishis explored these questions through intense observation, concentration, discipline, contemplation, and practice. By refining the mind and turning their attention inward, they sought to understand the deeper principles of life and the universe, and shared their insights as knowledge for generations to come.</p><div className="rounded-2xl border border-biscuit/20 bg-warm-beige/30 p-5"><p className="font-serif text-sm italic text-espresso">“As our machines become more intelligent, the need to cultivate our own intelligence becomes greater.”</p><span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-biscuit">— The Ishwari Yoga Institute</span></div></div><div className="overflow-hidden rounded-[1.75rem] border border-biscuit/20 bg-primary-white p-3 shadow-sm"><img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800" alt="Traditional study setting in Pune" referrerPolicy="no-referrer" className="h-[320px] w-full rounded-[1.25rem] object-cover" /></div></div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Knowledge', desc: 'Yoga is a vast body of knowledge developed through observation, practice, inquiry, and experience. We study it rather than reducing it to physical exercise.' },
              { title: 'Practice', desc: 'Knowledge becomes meaningful when it is lived. Asana, pranayama, mantra, meditation, Ahar, Vihar, Achar and Vichar become tools for cultivating the human faculties.' },
              { title: 'Relevance', desc: 'Ancient knowledge does not have to remain confined to the past. We explore how Yoga can speak to the realities of contemporary life — technology, AI, attention, stress, relationships, work, and the changing human experience.' },
            ].map(({ title, desc }) => <div key={title} className="rounded-2xl border border-biscuit/15 bg-primary-white p-6 shadow-sm"><h4 className="font-serif text-2xl italic text-olive-green">{title}</h4><p className="mt-3 text-xs leading-relaxed text-espresso/75">{desc}</p></div>)}
          </div>
          <DevanagariScript />
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
                <FounderPhoto src={FOUNDER_PHOTOS.devika} name="Devika Bhide" />
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
                <FounderPhoto src={FOUNDER_PHOTOS.shweta} name="Shweta Vaikunthe" />
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


      <section id="programs-section" className="bg-warm-beige/40 px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl space-y-12"><div className="flex items-end justify-between gap-6"><div><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-biscuit">Sadhana & Sastra Marg</span><h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Offered Programs</h2></div><button onClick={() => setCurrentPage('programs')} className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso">View All <ArrowRight size={14} /></button></div><div className="grid gap-8 md:grid-cols-3">{featuredPrograms.map((prog) => { const enrolled = currentStudent?.enrolledCourses.some((course) => course.programId === prog.id); return <div key={prog.id} onClick={() => onNavigateDetail(['program-detail', prog.id])} className="artistic-card group cursor-pointer overflow-hidden"><div className="relative aspect-[16/10] overflow-hidden"><img src={prog.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400'} alt={prog.name} referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />{enrolled && <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-olive-green px-2.5 py-1 text-[10px] font-semibold text-primary-white"><CheckCircle2 size={12} /> Enrolled</span>}</div><div className="space-y-4 p-6"><h3 className="font-serif text-2xl font-semibold text-espresso">{prog.name}</h3><p className="text-xs leading-relaxed text-espresso/70">{prog.description}</p><div className="flex items-center justify-between border-t border-biscuit/15 pt-3 text-[11px] text-espresso/60"><span className="flex items-center gap-1"><Calendar size={12} />{prog.startingDate}</span><strong>{prog.fees}</strong></div></div></div>; })}</div></div></section>

      <section id="why-us-section" className="bg-primary-white px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl space-y-12"><div className="text-center"><span className="font-mono text-[10px] uppercase tracking-[0.28em] text-biscuit">A Sanctuary for Deep Study</span><h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Why Learn With Us?</h2></div><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{features.map((feature) => <div key={feature.title} className="artistic-card p-7"><div className="mb-4 inline-flex rounded-full bg-warm-beige/40 p-3 text-olive-green">{feature.icon}</div><h3 className="font-serif text-2xl font-semibold text-espresso">{feature.title}</h3><p className="mt-3 text-xs leading-relaxed text-espresso/70">{feature.desc}</p></div>)}</div><div className="grid gap-6 rounded-2xl border border-biscuit/15 bg-warm-beige/30 py-8 text-center sm:grid-cols-2 lg:grid-cols-4">{stats.map(([label, desc]) => <div key={label}><span className="block font-serif text-xl font-bold text-olive-green">{label}</span><span className="text-xs text-espresso/70">{desc}</span></div>)}</div></div></section>

      <section id="testimonials-section" className="bg-primary-white px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl space-y-12"><div className="text-center"><span className="font-mono text-[10px] uppercase tracking-[0.28em] text-biscuit">Anubhuti • Seekers’ Voice</span><h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Seeker Testimonials</h2></div><div className="grid gap-8 md:grid-cols-3">{testimonials.map((test) => <div key={test.id} className="artistic-card p-8"><div className="flex gap-1 text-olive-green">{Array.from({ length: test.rating }).map((_, i) => <Heart key={i} size={12} className="fill-olive-green" />)}</div><p className="mt-4 text-xs italic leading-relaxed text-espresso/80">“{test.text}”</p><div className="mt-6 border-t border-biscuit/15 pt-4"><strong className="font-serif text-lg">{test.name}</strong><span className="block text-[10px] uppercase tracking-wider text-espresso/60">{test.role}</span></div></div>)}</div></div></section>

      <section id="cta-section" className="relative overflow-hidden bg-espresso px-4 py-20 text-center text-primary-white sm:px-6 lg:px-8"><div className="relative z-10 mx-auto max-w-xl space-y-7"><LotusFlower size={52} className="mx-auto text-lotus-pink" /><h2 className="font-serif text-4xl font-semibold md:text-5xl">Enter the World of Yoga</h2><p className="text-sm leading-relaxed text-primary-white/80">A space for sincere practice, thoughtful study, and a deeper engagement with the knowledge of Yoga.</p><button onClick={() => setCurrentPage('contact')} className="artistic-button-secondary bg-primary-white px-8 py-4 text-espresso">Connect with Founders <ArrowRight size={14} className="ml-2 inline" /></button></div></section>
      <BotanicalBorder className="mt-16" />
    </div>
  );
};
