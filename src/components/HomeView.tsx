import React, { useEffect } from 'react';
import { useYoga } from '../context/YogaContext';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Award,
  Calendar,
  Heart,
  Users,
  GraduationCap,
  ShieldCheck,
  User,
  CheckCircle2,
} from 'lucide-react';
import {
  PeepalLeaf,
  LotusFlower,
  BananaLeaf,
  DevanagariScript,
  BotanicalBorder,
} from './BotanicalAssets';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
  onNavigateDetail: (view: [string, string]) => void;
  initialSection?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentPage, onNavigateDetail, initialSection }) => {
  const { programs, blogs, testimonials, currentStudent, openAuthModal } = useYoga();

  useEffect(() => {
    if (!initialSection) return;

    const timer = window.setTimeout(() => {
      const el = document.getElementById(initialSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [initialSection]);

  const scrollToAbout = () => {
    const el = document.getElementById('about-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredPrograms = programs.slice(0, 3);
  const featuredBlogs = blogs.slice(0, 2);

  const stats = [
    { label: 'Traditional Lineage', desc: 'Patanjali & Hatha Sastra' },
    { label: 'Government Certified', desc: 'Ayush Approved' },
    { label: 'Small Batches', desc: 'Max 15 Seekers' },
    { label: 'Faculty Depth', desc: 'YCB Masters' },
  ];

  const features = [
    {
      title: 'Authentic Education',
      icon: <BookOpen size={20} />,
      desc: 'We teach the original Sanskrit texts, philosophy, and classical Hatha system through a disciplined, living practice.',
    },
    {
      title: 'Science with Philosophy',
      icon: <Compass size={20} />,
      desc: 'Every posture, pranayama and cleansing practice is explained through anatomy, nervous-system awareness, and scriptural logic.',
    },
    {
      title: 'Government Certified',
      icon: <Award size={20} />,
      desc: 'Our courses and evaluators are approved and licensed by the Yoga Certification Board and Ministry of Ayush, India.',
    },
    {
      title: 'Small Sacred Batches',
      icon: <Users size={20} />,
      desc: 'We keep sessions intimate so every student receives alignment guidance, care, and a true gurukul experience.',
    },
  ];

  return (
    <div id="home-view" className="relative overflow-hidden pb-16">
      <div className="pointer-events-none absolute right-0 top-10 z-0 select-none opacity-80">
        <PeepalLeaf size={180} className="text-[#687454]" />
      </div>
      <div className="pointer-events-none absolute -left-10 top-[42%] z-0 select-none opacity-80">
        <BananaLeaf size={220} className="rotate-12 text-[#687454]" />
      </div>
      <div className="pointer-events-none absolute bottom-[12%] right-4 z-0 select-none opacity-80">
        <PeepalLeaf size={140} className="rotate-[25deg] text-[#c99b70]" />
      </div>

      <section id="hero-section" className="relative min-h-[85vh] border-b border-[#b86d4a]/20 bg-[#fffaf4] px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b86d4a]/25 bg-[#f5eadb] px-3 py-2 shadow-sm">
              <LotusFlower size={18} className="text-[#687454]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#50362a]">
                Ancient Indian Gurukul • Pune
              </span>
            </div>

            <div className="max-w-2xl space-y-5">
              <h1 className="font-["Cormorant_Garamond",serif] text-5xl font-semibold leading-[0.95] tracking-[-0.02em] text-[#50362a] sm:text-6xl md:text-7xl">
                Awaken your <span className="italic text-[#687454]">practice</span>.<br />
                Deepen your <span className="italic text-[#b86d4a]">purpose</span>.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#5f4a41] md:text-lg">
                Ishwari Yoga Institute offers authentic yoga education, mindful teacher training, and sacred living practices rooted in tradition, discipline, and modern clarity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                id="hero-explore-btn"
                onClick={() => setCurrentPage('programs')}
                className="flex items-center justify-center gap-2 rounded-full bg-[#b86d4a] px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fffaf4] shadow-[0_12px_26px_rgba(184,109,74,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#8f5138]"
              >
                <span>Explore Programs</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-about-btn"
                onClick={scrollToAbout}
                className="rounded-full border border-[#50362a]/20 bg-[#fffaf4] px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#50362a] transition-all duration-200 hover:border-[#b86d4a]/40 hover:bg-[#f5eadb]"
              >
                About Our Institute
              </button>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
              {[
                { label: 'Certified', value: 'YCB' },
                { label: 'Batch Size', value: 'Max 15' },
                { label: 'Location', value: 'Pune' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#b86d4a]/15 bg-[#fff] p-3 shadow-sm">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#b86d4a]">{item.label}</div>
                  <div className="mt-2 font-["Cormorant_Garamond",serif] text-2xl text-[#50362a]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-[2rem] border border-[#b86d4a]/20 bg-[#fffaf4] p-3 shadow-[0_26px_60px_rgba(80,54,42,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f5eadb]/50 via-transparent to-[#687454]/10" />
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
                alt="Classical Yoga Practice Studio"
                referrerPolicy="no-referrer"
                className="relative h-[540px] w-full rounded-[1.5rem] object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-[#2d2019]/55 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-[#fffaf4]">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-[#f5eadb]">Authentic Sadhana</span>
                <span className="font-["Cormorant_Garamond",serif] text-2xl tracking-wide text-[#fffaf4]">Ishwari Asana Mandir</span>
              </div>
            </div>

            <div className="absolute -right-6 -top-6 rounded-full border border-[#b86d4a]/20 bg-[#fffaf4] p-3 shadow-md">
              <LotusFlower size={36} className="text-[#687454]" />
            </div>
          </div>
        </div>
      </section>

      <section id="about-section" className="relative border-t border-[#b86d4a]/10 bg-[#fffaf4] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-16">
          <div className="space-y-4 text-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b86d4a]">The Lineage of Shastra & Sadhana</span>
            <h2 className="font-["Cormorant_Garamond",serif] text-4xl font-semibold tracking-wide text-[#50362a] md:text-5xl">About Our Institute & Gurukul Vision</h2>
            <p className="mx-auto max-w-2xl font-serif text-lg italic text-[#687454]">“Preserving classical Indian sciences with rigorous research and absolute devotional sincerity.”</p>
            <div className="mx-auto h-[1px] w-16 bg-[#c99b70]" />
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6 text-left">
              <h3 className="font-["Cormorant_Garamond",serif] text-3xl font-semibold text-[#50362a]">The Gurukul Vision</h3>
              <p className="text-sm leading-relaxed text-[#5f4a41]">
                Ishwari Yoga Institute was envisioned not as a modern boutique fitness space, but as a quiet sanctuary where the traditional gurukul model meets modern systematic education.
              </p>
              <p className="text-sm leading-relaxed text-[#5f4a41]">
                Located in Viman Nagar, Pune, the institute preserves standard Sanskrit learning and brings it into practical contemporary living for students, teachers, and families.
              </p>
              <div className="rounded-2xl border border-[#b86d4a]/15 bg-[#f5eadb] p-5">
                <p className="font-serif text-sm italic text-[#50362a]">“Yoga is the journey of the self, through the self, to the self.”</p>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#b86d4a]">— Bhagavad Gita</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-[#b86d4a]/20 bg-[#fff] p-3 shadow-[0_18px_45px_rgba(80,54,42,0.08)]">
              <div className="group relative overflow-hidden rounded-[1.25rem]">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800"
                  alt="Traditional study setting in Pune"
                  referrerPolicy="no-referrer"
                  className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d2019]/45 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-[#fffaf4]">
                  <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-[#f5eadb]">Silent Sanctuary</span>
                  <span className="font-["Cormorant_Garamond",serif] text-base font-semibold">Traditional Gurukul Study Setting</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 pt-6 md:grid-cols-3">
            {[
              { title: 'Timeless & Practical', text: 'Yoga at Ishwari is a highly scientific lifestyle designed in ancient India and perfected over millennia. We study Patanjali and Hatha shastras and translate them into tools for modern living.' },
              { title: 'Stages of Life (Ashrama)', text: 'A teenager’s body, an active householder’s mind, and an elderly seeker’s joints require completely distinct practices. We tailor sadhana to each life stage.' },
              { title: 'Integration Over Escape', text: 'The ultimate goal of yoga is integration—the harmony of body, breath, nervous system, and consciousness—so that life becomes calmer, clearer, and centered.' },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-[#b86d4a]/15 bg-[#fffaf4] p-6 shadow-sm">
                <h4 className="font-["Cormorant_Garamond",serif] text-2xl italic text-[#687454]">{item.title}</h4>
                <p className="mt-3 text-xs leading-relaxed text-[#5f4a41]">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-3xl pt-6">
            <DevanagariScript />
          </div>
        </div>
      </section>

      <section id="programs-section" className="bg-[#f5eadb] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b86d4a]">Sadhana & Sastra Marg</span>
              <h2 className="font-["Cormorant_Garamond",serif] text-4xl font-semibold tracking-wide text-[#50362a] md:text-5xl">Offered Programs</h2>
            </div>
            <button onClick={() => setCurrentPage('programs')} className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#50362a] transition-all hover:text-[#8f5138]">
              <span>View All Programs</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredPrograms.map((prog) => {
              const isEnrolled = currentStudent?.enrolledCourses.some((course) => course.programId === prog.id);

              return (
                <div key={prog.id} onClick={() => onNavigateDetail(['program-detail', prog.id])} className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-[#b86d4a]/15 bg-[#fffaf4] shadow-[0_14px_33px_rgba(80,54,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(80,54,42,0.12)]">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[#b86d4a]/15 bg-[#f5eadb]">
                    <img
                      src={prog.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400'}
                      alt={prog.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full border border-[#b86d4a]/15 bg-[#fffaf4]/95 px-3 py-1">
                      <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-[#50362a]">{prog.category}</span>
                    </div>

                    {isEnrolled && (
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#687454] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fffaf4] shadow-sm">
                        <CheckCircle2 size={12} />
                        <span>Enrolled</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                    <div className="space-y-2">
                      <h3 className="font-["Cormorant_Garamond",serif] text-2xl font-semibold leading-snug text-[#50362a]">{prog.name}</h3>
                      <p className="text-xs leading-relaxed text-[#5f4a41]">{prog.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#b86d4a]/15 pt-3 text-[11px] text-[#5f4a41]">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#687454]" />
                        Starts: {prog.startingDate}
                      </span>
                      <span className="font-mono font-semibold text-[#50362a]">{prog.fees}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why-us-section" className="bg-[#fffaf4] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="space-y-4 text-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b86d4a]">A Sanctuary for Deep Study</span>
            <h2 className="font-["Cormorant_Garamond",serif] text-4xl font-semibold tracking-wide text-[#50362a] md:text-5xl">Why Learn With Us?</h2>
            <div className="mx-auto mt-4 h-[1px] w-12 bg-[#c99b70]" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feat, index) => (
              <div key={index} className="rounded-[1.5rem] border border-[#b86d4a]/15 bg-[#fffaf4] p-7 shadow-[0_10px_24px_rgba(80,54,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(80,54,42,0.08)]">
                <div className="mb-4 inline-flex rounded-full bg-[#f5eadb] p-3 text-[#687454]">{feat.icon}</div>
                <h3 className="font-["Cormorant_Garamond",serif] text-2xl font-semibold text-[#50362a]">{feat.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-[#5f4a41]">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 rounded-[1.75rem] border border-[#b86d4a]/15 bg-[#f5eadb] py-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="px-4">
                <span className="block font-["Cormorant_Garamond",serif] text-xl font-bold uppercase tracking-wide text-[#687454]">{stat.label}</span>
                <span className="mt-1 block text-xs leading-snug text-[#5f4a41]">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials-section" className="relative overflow-hidden border-t border-[#b86d4a]/10 bg-[#fffaf4] px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-10">
          <PeepalLeaf size={180} />
        </div>

        <div className="mx-auto max-w-5xl space-y-16">
          <div className="space-y-4 text-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b86d4a]">Anubhuti • Seekers’ Voice</span>
            <h2 className="font-["Cormorant_Garamond",serif] text-4xl font-semibold tracking-wide text-[#50362a] md:text-5xl">Seeker Testimonials</h2>
            <div className="mx-auto mt-4 h-[1px] w-12 bg-[#c99b70]" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((test) => (
              <div key={test.id} className="rounded-[1.6rem] border border-[#b86d4a]/15 bg-[#fffaf4] p-8 shadow-[0_12px_28px_rgba(80,54,42,0.04)]">
                <div className="flex gap-1 text-[#687454]">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Heart key={i} size={12} className="fill-[#687454]" />
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed italic text-[#5f4a41]">“{test.text}”</p>
                <div className="mt-6 border-t border-[#b86d4a]/15 pt-4">
                  <span className="block font-["Cormorant_Garamond",serif] text-lg font-semibold text-[#50362a]">{test.name}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#5f4a41]">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs-section" className="bg-[#f5eadb] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b86d4a]">Swadhaya • Wisdom Reads</span>
              <h2 className="font-["Cormorant_Garamond",serif] text-4xl font-semibold tracking-wide text-[#50362a] md:text-5xl">Latest Philosophical Insights</h2>
            </div>
            <button onClick={() => setCurrentPage('blogs')} className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#50362a] transition-all hover:text-[#8f5138]">
              <span>Read All Blogs</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {featuredBlogs.map((blog) => (
              <div key={blog.id} onClick={() => onNavigateDetail(['blog-detail', blog.id])} className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-[#b86d4a]/15 bg-[#fffaf4] shadow-[0_12px_28px_rgba(80,54,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(80,54,42,0.10)]">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-[#b86d4a]/10 bg-[#f5eadb]">
                  <img src={blog.image} alt={blog.title} referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full border border-[#b86d4a]/15 bg-[#fffaf4]/95 px-3 py-1">
                    <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-[#50362a]">{blog.category}</span>
                  </div>
                </div>
                <div className="space-y-4 p-6">
                  <div className="space-y-2">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-[#5f4a41]">{blog.date} • {blog.readTime}</span>
                    <h3 className="font-["Cormorant_Garamond",serif] text-2xl font-semibold text-[#50362a]">{blog.title}</h3>
                    <p className="text-xs leading-relaxed text-[#5f4a41]">{blog.summary}</p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#687454]">
                    <span>Read Shastra Study</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta-section" className="relative overflow-hidden bg-[#50362a] px-4 py-20 text-center text-[#fffaf4] sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 flex scale-150 items-center justify-center opacity-5">
          <p className="font-["Cormorant_Garamond",serif] text-7xl">॥ योग ॥</p>
        </div>

        <div className="relative z-10 mx-auto max-w-xl space-y-8">
          <LotusFlower size={56} className="mx-auto text-[#d9a08c]" />
          <h2 className="font-["Cormorant_Garamond",serif] text-4xl font-semibold tracking-[0.04em] text-[#fffaf4] md:text-5xl">Begin Your Sacred Journey</h2>
          <p className="text-sm leading-relaxed text-[#f5eadb]">
            Enter the simplicity of traditional study, align your breath with spiritual silence, and earn credentialed expertise with external AYUSH examiners.
          </p>

          <div className="pt-2">
            <button onClick={() => setCurrentPage('contact')} className="inline-flex items-center gap-2 rounded-full bg-[#fffaf4] px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#50362a] transition-all hover:bg-[#ead8bb]">
              <span>Connect with Founders</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <BotanicalBorder className="mt-16" />
    </div>
  );
};
