import React from 'react';
import { Award, BookOpen, GraduationCap, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { PeepalLeaf, LotusFlower, BananaLeaf, DevanagariScript } from './BotanicalAssets';

export const AboutView: React.FC = () => {
  return (
    <div id="about-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Decorative Botanical Leaf overlays */}
      <div className="absolute top-12 left-2 pointer-events-none opacity-10">
        <PeepalLeaf size={150} />
      </div>
      <div className="absolute bottom-[30%] right-2 pointer-events-none opacity-10 rotate-45">
        <BananaLeaf size={240} />
      </div>

      {/* Hero Header */}
      <section className="max-w-4xl mx-auto pt-16 pb-12 text-center space-y-6">
        <span className="font-mono text-[10px] tracking-[0.25em] text-biscuit font-bold uppercase">The Lineage of Shastra & Sadhana</span>
        <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-espresso tracking-tight">
          About Our Institute
        </h1>
        <p className="font-serif text-lg italic text-olive-green max-w-2xl mx-auto">
          "Preserving classical Indian sciences with rigorous research and absolute devotional sincerity."
        </p>
        <div className="w-16 h-0.5 bg-biscuit mx-auto" />
      </section>

      {/* Our Roots / Vision Section */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-12 items-center">
        <div className="space-y-6">
          <h2 className="font-cinzel text-2xl font-semibold text-espresso">The Gurukul Vision</h2>
          <p className="font-sans text-sm text-espresso/80 leading-relaxed">
            Ishwari Yoga Institute was envisioned not as a modern boutique fitness gym, but as a silent sanctuary where the deep, traditional gurukul model meets modern systematic education. We emphasize study (*Svadhyaya*), physical and energetic purity (*Shatkarma*), and therapeutic integration.
          </p>
          <p className="font-sans text-sm text-espresso/80 leading-relaxed">
            Located in Viman Nagar, Pune, the institute has spent years preserving standard Sanskrit textbooks (like Patanjali Yoga Sutras, Hatha Pradipika, Gheranda Samhita, and Yoga Upanishads), making them practical for corporate professionals, students, and mothers-to-be.
          </p>
        </div>
        <div className="rounded-xl border border-biscuit/40 p-3 bg-primary-white shadow-sm overflow-hidden">
          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-warm-beige/20">
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800" 
              alt="Traditional study setting" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter sepia-[0.12]"
            />
          </div>
        </div>
      </section>

      {/* Devanagari Banner */}
      <section className="py-10 max-w-3xl mx-auto">
        <DevanagariScript />
      </section>

      {/* Detailed Founders Biographies */}
      <section className="max-w-5xl mx-auto py-16 space-y-20 border-t border-b border-biscuit/30">
        
        <div className="text-center space-y-4">
          <h2 className="font-cinzel text-3xl font-semibold text-espresso">The Custodians</h2>
          <div className="w-12 h-[1px] bg-biscuit mx-auto" />
        </div>

        {/* Biography 1: Devika Bhide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-biscuit/30 p-2 bg-primary-white shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500" 
                alt="Devika Bhide" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded filter sepia-[0.1] contrast-[0.98]"
              />
            </div>
            <div className="text-center md:text-left space-y-1">
              <h3 className="font-cinzel text-xl font-bold text-espresso">Devika Bhide</h3>
              <p className="font-sans text-xs text-olive-green tracking-wider uppercase font-semibold">Co-Founder | Yoga Educator | Yoga Master | Researcher</p>
              <p className="font-sans text-[11px] text-espresso/50">M.A. Yogashastra • YCB Level 4 Yoga Master • YCB Level 7 Therapeutic Instructor</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h4 className="font-cinzel text-lg font-bold text-espresso border-b border-biscuit/20 pb-2">Academic, Therapeutic & Research Profile</h4>
            <p className="font-sans text-sm text-espresso/80 leading-relaxed">
              Devika Bhide is a yoga educator, researcher, and practitioner dedicated to preserving and sharing the authentic wisdom of yoga through education, practice, and lifelong learning. With a strong foundation in classical yogic studies, she believes that yoga is far more than a physical discipline—it is a timeless science that can be understood and applied meaningfully in everyday life.
            </p>
            <p className="font-sans text-sm text-espresso/80 leading-relaxed">
              She holds a Master's degree (M.A.) in Yogashastra, is a YCB Level 4 Yoga Master and a YCB Level 7 Therapeutic Yoga Instructor, along with a Diploma in Yoga Therapy. She also holds specialized certifications in Prenatal Yoga, Women's Health Yoga, Office Yoga, and other clinical aspects of yogic sciences.
            </p>
            <p className="font-sans text-sm text-espresso/80 leading-relaxed">
              Over the years, Devika has conducted yoga teacher training programs, workshops, retreats, therapeutic and prenatal yoga sessions, and has mentored numerous students through government-recognised Yoga Certification Board (YCB) courses. Her teaching style blends traditional yogic philosophy with scientific understanding, encouraging students to explore not just how to practise, but why they practise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <GraduationCap className="text-olive-green shrink-0 mt-1" size={18} />
                <div>
                  <h5 className="font-cinzel text-xs font-semibold text-espresso uppercase">M.A. Yogashastra & Diploma</h5>
                  <p className="text-[11px] text-espresso/60 mt-1">Deep scriptural and scholarly studies in classical yoga texts paired with clinical-grade therapeutic diploma systems.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Award className="text-olive-green shrink-0 mt-1" size={18} />
                <div>
                  <h5 className="font-cinzel text-xs font-semibold text-espresso uppercase">YCB Level 4 & 7 Accreditations</h5>
                  <p className="text-[11px] text-espresso/60 mt-1">Certified as both a Yoga Master and a Therapeutic Yoga Instructor under the Ministry of AYUSH, Government of India.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Biography 2: Shweta Vaikunthe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12 border-t border-biscuit/20">
          <div className="lg:col-span-4 lg:order-last space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-biscuit/30 p-2 bg-primary-white shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500" 
                alt="Shweta Vaikunthe" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded filter sepia-[0.1] contrast-[0.98]"
              />
            </div>
            <div className="text-center md:text-left space-y-1">
              <h3 className="font-cinzel text-xl font-bold text-espresso">Shweta Vaikunthe</h3>
              <p className="font-sans text-xs text-olive-green tracking-wider uppercase font-semibold">Co-Founder | Yoga Educator | Yoga Master | Yoga Therapist</p>
              <p className="font-sans text-[11px] text-espresso/50">M.A. Yogashastra • Master's in Yogic Science • YCB Certified Therapist & Evaluator</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h4 className="font-cinzel text-lg font-bold text-espresso border-b border-biscuit/20 pb-2">Academic, Therapeutic & Clinical Expertise</h4>
            <p className="font-sans text-sm text-espresso/80 leading-relaxed">
              Shweta Vaikunthe is a passionate yoga educator and therapist with over 12 years of rich teaching experience, dedicated to making authentic yogic knowledge highly accessible and transformative to people from all walks of life. With a strong academic foundation and extensive clinical expertise, she believes in using yoga as a powerful tool for holistic health, proactive healing, and systemic well-being.
            </p>
            <p className="font-sans text-sm text-espresso/80 leading-relaxed">
              She holds a Master's degree in Yogashastra from Kulguru Kalidas Sanskrit University (KKSU), Nagpur, along with a Master's in Yogic Science. She is certified by the prestigious Yoga Certification Board (YCB), Ministry of AYUSH, Government of India, as a Yoga Instructor, Evaluator, Yoga Master, and Therapeutic Yoga Consultant. She has also completed advanced specialist training in Medical Yoga, Power Yoga, Yogic Detox (Shatkarma), and Yogic Nutrition.
            </p>
            <p className="font-sans text-sm text-espresso/80 leading-relaxed">
              Over her distinguished career of more than a decade, Shweta has trained thousands of students in Hatha, Ashtanga, Iyengar, Vinyasa, Medical, and Therapeutic Yoga, seamlessly combining traditional scriptural principles with a compassionate, student-centric, and practical teaching approach.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <ShieldCheck className="text-olive-green shrink-0 mt-1" size={18} />
                <div>
                  <h5 className="font-cinzel text-xs font-semibold text-espresso uppercase">Dual Masters Degrees</h5>
                  <p className="text-[11px] text-espresso/60 mt-1">M.A. in Yogashastra from KKSU Nagpur and Master's in Yogic Science, anchoring her teaching in deep academic rigor.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <BookOpen className="text-olive-green shrink-0 mt-1" size={18} />
                <div>
                  <h5 className="font-cinzel text-xs font-semibold text-espresso uppercase">AYUSH Ministry Evaluator</h5>
                  <p className="text-[11px] text-espresso/60 mt-1">YCB Certified Yoga Master, Instructor, Evaluator, and Therapeutic Yoga Consultant overseeing national examinations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Recognized Contributions & Awards */}
      <section className="max-w-4xl mx-auto py-16 text-center space-y-8">
        <LotusFlower size={48} className="text-lotus-pink mx-auto" />
        <h3 className="font-cinzel text-2xl font-semibold text-espresso">Awards & Achievements</h3>
        <p className="font-sans text-sm text-espresso/70 max-w-lg mx-auto">
          We remain deeply humble for the recognition bestowed upon the institute by the cultural and academic community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-6">
          <div className="p-6 border border-biscuit/30 bg-primary-white rounded-xl space-y-3">
            <span className="text-xs font-mono text-biscuit uppercase tracking-widest font-semibold block">2026 Honor</span>
            <h4 className="font-cinzel text-sm font-bold text-espresso">Wellness Hero Award 2026</h4>
            <p className="font-sans text-[11px] text-espresso/70">Honoured by Pune Times Mirror for pioneering contributions to classical yogic education, prenatal wellness, and holistic health practices.</p>
          </div>
          <div className="p-6 border border-biscuit/30 bg-primary-white rounded-xl space-y-3">
            <span className="text-xs font-mono text-biscuit uppercase tracking-widest font-semibold block">2026 Service</span>
            <h4 className="font-cinzel text-sm font-bold text-espresso">Exercise PRAGATI Representation</h4>
            <p className="font-sans text-[11px] text-espresso/70">Selected to represent India in the Multi Military Exercise PRAGATI held in Meghalaya, cultivating leadership, discipline, and national integration.</p>
          </div>
          <div className="p-6 border border-biscuit/30 bg-primary-white rounded-xl space-y-3">
            <span className="text-xs font-mono text-biscuit uppercase tracking-widest font-semibold block">2025 Paper</span>
            <h4 className="font-cinzel text-sm font-bold text-espresso">Clinical Research Contribution</h4>
            <p className="font-sans text-[11px] text-espresso/70">Co-published a scientific clinical paper detailing the physiological effects of Nadi Shodhana pranayama on stress markers in Pune hospitals.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
