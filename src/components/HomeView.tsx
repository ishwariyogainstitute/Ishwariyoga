import React, { useEffect } from 'react';
import { ArrowRight, Award, BookOpen, Calendar, Compass, Heart, Users, CheckCircle2 } from 'lucide-react';
import { useYoga } from '../context/YogaContext';
import { BananaLeaf, BotanicalBorder, DevanagariScript, LotusFlower, PeepalLeaf } from './BotanicalAssets';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
  onNavigateDetail: (view: [string, string]) => void;
  initialSection?: string;
}

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
    { title: 'Authentic Education', icon: <BookOpen size={20} />, desc: 'Study original Sanskrit texts, philosophy, and the classical Hatha system with depth.' },
    { title: 'Science with Philosophy', icon: <Compass size={20} />, desc: 'Learn posture, pranayama, and cleansing through anatomy and scriptural logic.' },
    { title: 'Government Certified', icon: <Award size={20} />, desc: 'Our courses and evaluators follow Yoga Certification Board and Ministry of Ayush standards.' },
    { title: 'Small Sacred Batches', icon: <Users size={20} />, desc: 'Receive individual alignment guidance, feedback, and a true gurukul experience.' },
  ];
  const stats = [
    ['Traditional Lineage', 'Patanjali & Hatha Sastra'],
    ['Government Certified', 'Ministry of Ayush Approved'],
    ['Small Batches', 'Maximum 15 Seekers'],
    ['Faculty Depth', 'MA Yogashastra & YCB Masters'],
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
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-espresso/70">Ancient Indian Gurukul • Pune</span>
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
            <div className="grid max-w-xl grid-cols-3 gap-3 pt-4">
              {[['Certified', 'YCB'], ['Batch Size', 'Max 15'], ['Location', 'Pune']].map(([label, value]) => <div key={label} className="rounded-2xl border border-biscuit/15 bg-primary-white p-3 shadow-sm"><div className="font-mono text-[9px] uppercase tracking-[0.18em] text-biscuit">{label}</div><div className="mt-1 font-serif text-2xl text-espresso">{value}</div></div>)}
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
          <div className="space-y-4 text-center"><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-biscuit">The Lineage of Shastra & Sadhana</span><h2 className="font-serif text-4xl font-semibold tracking-wide text-espresso md:text-5xl">About Our Institute & Gurukul Vision</h2><p className="mx-auto max-w-2xl font-serif text-lg italic text-olive-green">“Preserving classical Indian sciences with rigorous research and devotional sincerity.”</p><div className="mx-auto h-px w-16 bg-biscuit" /></div>
          <div className="grid items-center gap-12 md:grid-cols-2"><div className="space-y-6"><h3 className="font-serif text-3xl font-semibold text-espresso">The Gurukul Vision</h3><p className="text-sm leading-relaxed text-espresso/80">Ishwari Yoga Institute is a quiet sanctuary where the traditional gurukul model meets modern systematic education.</p><p className="text-sm leading-relaxed text-espresso/80">Located in Viman Nagar, Pune, we preserve classical learning and make it practical for contemporary students, teachers, and families.</p><div className="rounded-2xl border border-biscuit/20 bg-warm-beige/30 p-5"><p className="font-serif text-sm italic text-espresso">“Yoga is the journey of the self, through the self, to the self.”</p><span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-biscuit">— Bhagavad Gita</span></div></div><div className="overflow-hidden rounded-[1.75rem] border border-biscuit/20 bg-primary-white p-3 shadow-sm"><img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800" alt="Traditional study setting in Pune" referrerPolicy="no-referrer" className="h-[320px] w-full rounded-[1.25rem] object-cover" /></div></div>
          <div className="grid gap-6 md:grid-cols-3">{['Timeless & Practical', 'Stages of Life (Ashrama)', 'Integration Over Escape'].map((title) => <div key={title} className="rounded-2xl border border-biscuit/15 bg-primary-white p-6 shadow-sm"><h4 className="font-serif text-2xl italic text-olive-green">{title}</h4><p className="mt-3 text-xs leading-relaxed text-espresso/75">Yoga harmonizes body, breath, nervous system, and consciousness so life becomes calmer, clearer, and centered.</p></div>)}</div>
          <DevanagariScript />
        </div>
      </section>

      <section id="programs-section" className="bg-warm-beige/40 px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl space-y-12"><div className="flex items-end justify-between gap-6"><div><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-biscuit">Sadhana & Sastra Marg</span><h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Offered Programs</h2></div><button onClick={() => setCurrentPage('programs')} className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso">View All <ArrowRight size={14} /></button></div><div className="grid gap-8 md:grid-cols-3">{featuredPrograms.map((prog) => { const enrolled = currentStudent?.enrolledCourses.some((course) => course.programId === prog.id); return <div key={prog.id} onClick={() => onNavigateDetail(['program-detail', prog.id])} className="artistic-card group cursor-pointer overflow-hidden"><div className="relative aspect-[16/10] overflow-hidden"><img src={prog.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400'} alt={prog.name} referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />{enrolled && <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-olive-green px-2.5 py-1 text-[10px] font-semibold text-primary-white"><CheckCircle2 size={12} /> Enrolled</span>}</div><div className="space-y-4 p-6"><h3 className="font-serif text-2xl font-semibold text-espresso">{prog.name}</h3><p className="text-xs leading-relaxed text-espresso/70">{prog.description}</p><div className="flex items-center justify-between border-t border-biscuit/15 pt-3 text-[11px] text-espresso/60"><span className="flex items-center gap-1"><Calendar size={12} />{prog.startingDate}</span><strong>{prog.fees}</strong></div></div></div>; })}</div></div></section>

      <section id="why-us-section" className="bg-primary-white px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl space-y-12"><div className="text-center"><span className="font-mono text-[10px] uppercase tracking-[0.28em] text-biscuit">A Sanctuary for Deep Study</span><h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Why Learn With Us?</h2></div><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{features.map((feature) => <div key={feature.title} className="artistic-card p-7"><div className="mb-4 inline-flex rounded-full bg-warm-beige/40 p-3 text-olive-green">{feature.icon}</div><h3 className="font-serif text-2xl font-semibold text-espresso">{feature.title}</h3><p className="mt-3 text-xs leading-relaxed text-espresso/70">{feature.desc}</p></div>)}</div><div className="grid gap-6 rounded-2xl border border-biscuit/15 bg-warm-beige/30 py-8 text-center sm:grid-cols-2 lg:grid-cols-4">{stats.map(([label, desc]) => <div key={label}><span className="block font-serif text-xl font-bold text-olive-green">{label}</span><span className="text-xs text-espresso/70">{desc}</span></div>)}</div></div></section>

      <section id="testimonials-section" className="bg-primary-white px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl space-y-12"><div className="text-center"><span className="font-mono text-[10px] uppercase tracking-[0.28em] text-biscuit">Anubhuti • Seekers’ Voice</span><h2 className="font-serif text-4xl font-semibold text-espresso md:text-5xl">Seeker Testimonials</h2></div><div className="grid gap-8 md:grid-cols-3">{testimonials.map((test) => <div key={test.id} className="artistic-card p-8"><div className="flex gap-1 text-olive-green">{Array.from({ length: test.rating }).map((_, i) => <Heart key={i} size={12} className="fill-olive-green" />)}</div><p className="mt-4 text-xs italic leading-relaxed text-espresso/80">“{test.text}”</p><div className="mt-6 border-t border-biscuit/15 pt-4"><strong className="font-serif text-lg">{test.name}</strong><span className="block text-[10px] uppercase tracking-wider text-espresso/60">{test.role}</span></div></div>)}</div></div></section>

      <section id="cta-section" className="relative overflow-hidden bg-espresso px-4 py-20 text-center text-primary-white sm:px-6 lg:px-8"><div className="relative z-10 mx-auto max-w-xl space-y-7"><LotusFlower size={52} className="mx-auto text-lotus-pink" /><h2 className="font-serif text-4xl font-semibold md:text-5xl">Begin Your Sacred Journey</h2><p className="text-sm leading-relaxed text-primary-white/80">Enter the simplicity of traditional study, align your breath with spiritual silence, and earn credentialed expertise.</p><button onClick={() => setCurrentPage('contact')} className="artistic-button-secondary bg-primary-white px-8 py-4 text-espresso">Connect with Founders <ArrowRight size={14} className="ml-2 inline" /></button></div></section>
      <BotanicalBorder className="mt-16" />
    </div>
  );
};
