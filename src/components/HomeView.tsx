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
    { label: 'Government Certified', desc: 'Ministry of Ayush Approved' },
    { label: 'Small Batches', desc: 'Max 15 Seekers for Personalized Diksha' },
    { label: 'Faculty Depth', desc: 'MA Yogashastra & YCB Masters' },
  ];

  const features = [
    {
      title: 'Authentic Education',
      icon: <BookOpen size={20} />,
      desc: 'No yoga gymnastics or neon-brand shortcuts. We teach the original Sanskrit texts, philosophy, and classical Hatha system with depth.',
    },
    {
      title: 'Science with Philosophy',
      icon: <Compass size={20} />,
      desc: 'Every posture, pranayama, and cleansing practice is explained through anatomy, nervous-system awareness, and scriptural logic.',
    },
    {
      title: 'Government Certified',
      icon: <Award size={20} />,
      desc: 'Our courses and evaluators are approved and licensed by the Yoga Certification Board (YCB), Ministry of Ayush, India.',
    },
    {
      title: 'Small Sacred Batches',
      icon: <Users size={20} />,
      desc: 'We deliberately keep batches small to offer individualized fixes, alignment feedback, and a true gurukul feeling.',
    },
  ];

  return (
    <div id="home-view" className="relative overflow-hidden animate-fadeIn pb-16">
      <div className="absolute top-10 right-4 pointer-events-none select-none z-0">
        <PeepalLeaf size={160} className="text-olive-green" />
      </div>
      <div className="absolute top-[45%] -left-10 pointer-events-none select-none z-0">
        <BananaLeaf size={240} className="text-olive-green rotate-12" />
      </div>
      <div className="absolute bottom-[20%] right-4 pointer-events-none select-none z-0">
        <PeepalLeaf size={140} className="text-biscuit rotate-[25deg]" />
      </div>

      <section id="hero-section" className="relative min-h-[85vh] flex items-center bg-[#FAFAF8] py-16 px-4 sm:px-6 lg:px-8 border-b border-biscuit/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
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
                className="px-7 py-3.5 artistic-button-primary rounded-lg text-primary-white font-sans text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 group cursor-pointer"
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

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl border border-biscuit/40 p-3 bg-primary-white shadow-sm overflow-hidden relative group">
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

            <div className="absolute -top-6 -right-6 bg-[#FAFAF8] p-3 rounded-full border border-biscuit/30 shadow-sm animate-bounce duration-[4000ms]">
              <LotusFlower size={36} className="text-lotus-pink" />
            </div>
          </div>
        </div>
      </section>

      <section id="about-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-white border-t border-biscuit/20 relative">
        <div className="max-w-5xl mx-auto space-y-16 relative">
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-biscuit font-bold uppercase">The Lineage of Shastra & Sadhana</span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-semibold tracking-wide text-espresso">About Our Institute & Gurukul Vision</h2>
            <p className="font-serif text-lg italic text-olive-green max-w-2xl mx-auto">“Preserving classical Indian sciences with rigorous research and absolute devotional sincerity.”</p>
            <div className="w-16 h-0.5 bg-biscuit mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <h3 className="font-cinzel text-2xl font-semibold text-espresso">The Gurukul Vision</h3>
              <p className="font-sans text-sm text-espresso/80 leading-relaxed">
                Ishwari Yoga Institute was envisioned not as a modern boutique fitness gym, but as a silent sanctuary where the deep, traditional gurukul model meets modern systematic education.
              </p>
              <p className="font-sans text-sm text-espresso/80 leading-relaxed">
                Located in Viman Nagar, Pune, the institute has spent years preserving standard Sanskrit textbooks and making them practical for contemporary students, teachers, and families.
              </p>
              <div className="p-5 bg-warm-beige/30 border border-biscuit/30 rounded-lg">
                <p className="font-serif italic text-espresso/90 text-sm">“Yoga is the journey of the self, through the self, to the self.”</p>
                <span className="block font-mono text-[10px] tracking-[0.15em] text-biscuit uppercase font-semibold mt-2">— Bhagavad Gita</span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
            <div className="p-6 bg-[#FAFAF8] rounded-xl border border-biscuit/30 space-y-3">
              <h4 className="font-serif text-lg italic text-olive-green">Timeless & Practical</h4>
              <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                Yoga at Ishwari is a highly scientific lifestyle designed in ancient India and perfected over millennia. We study Patanjali and Hatha shastras, translating them into tools for modern living.
              </p>
            </div>
            <div className="p-6 bg-[#FAFAF8] rounded-xl border border-biscuit/30 space-y-3">
              <h4 className="font-serif text-lg italic text-olive-green">Stages of Life (Ashrama)</h4>
              <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                A teenager’s body, an active householder’s mind, and an elderly seeker’s joints require completely distinct practices. We tailor sadhana to fit each life stage.
              </p>
            </div>
            <div className="p-6 bg-[#FAFAF8] rounded-xl border border-biscuit/30 space-y-3">
              <h4 className="font-serif text-lg italic text-olive-green">Integration Over Escape</h4>
              <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                The ultimate goal of yoga is integration—the harmony of body, breath, nervous system, and consciousness—so that life becomes calmer, clearer, and centered.
              </p>
            </div>
          </div>

          <div className="pt-6 max-w-3xl mx-auto">
            <DevanagariScript />
          </div>
        </div>
      </section>

      <section id="programs-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">Sadhana & Sastra Marg</span>
              <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">Offered Programs</h2>
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
              const isEnrolled = currentStudent?.enrolledCourses.some((course) => course.programId === prog.id);

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
                      <span className="text-[9px] font-sans font-semibold tracking-wider text-espresso uppercase">{prog.category}</span>
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
                      <p className="font-sans text-xs text-espresso/70 leading-relaxed line-clamp-3">{prog.description}</p>
                    </div>

                    <div className="pt-3 border-t border-biscuit/20 flex items-center justify-between font-sans text-[11px] text-espresso/60">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-olive-green" />
                        Starts: {prog.startingDate}
                      </span>
                      <span className="font-semibold text-espresso font-mono">{prog.fees}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why-us-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">A Sanctuary for Deep Study</span>
            <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">Why Learn With Us?</h2>
            <div className="w-12 h-[1px] bg-biscuit mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, index) => (
              <div key={index} className="p-8 artistic-card rounded-xl space-y-4">
                <div className="p-3 bg-warm-beige/40 rounded-full text-olive-green inline-block">{feat.icon}</div>
                <h3 className="font-cinzel text-base font-semibold text-espresso">{feat.title}</h3>
                <p className="font-sans text-xs text-espresso/70 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

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

      <section id="testimonials-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-white border-t border-biscuit/15 relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-10">
          <PeepalLeaf size={180} />
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">Anubhuti - Seekers’ Voice</span>
            <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">Seeker Testimonials</h2>
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
                  <p className="font-sans text-xs text-espresso/85 leading-relaxed italic">“{test.text}”</p>
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

      <section id="blogs-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-semibold">Swadhaya - Wisdom Reads</span>
              <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wide text-espresso">Latest Philosophical Insights</h2>
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
                    <h3 className="font-cinzel text-base font-semibold text-espresso group-hover:text-olive-green transition-colors leading-snug">{blog.title}</h3>
                    <p className="font-sans text-xs text-espresso/70 leading-relaxed line-clamp-2">{blog.summary}</p>
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

      <section id="cta-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-espresso text-primary-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 flex items-center justify-center scale-150 pointer-events-none select-none">
          <p className="font-cinzel text-8xl text-primary-white">॥ योग ॥</p>
        </div>

        <div className="max-w-xl mx-auto space-y-8 relative z-10">
          <LotusFlower size={56} className="text-lotus-pink mx-auto animate-pulse" />
          <h2 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-wider">Begin Your Sacred Journey</h2>
          <p className="font-sans text-sm text-primary-white/80 leading-relaxed">
            Enter the simplicity of traditional study, align your breath with spiritual silence, and earn credentialed expertise with external AYUSH examiners.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-4 bg-primary-white text-espresso hover:bg-lotus-pink hover:text-espresso transition-all duration-300 font-sans text-xs tracking-widest uppercase font-semibold shadow-md group cursor-pointer"
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
