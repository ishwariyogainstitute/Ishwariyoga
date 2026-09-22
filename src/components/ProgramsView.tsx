import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { Search, Calendar, Clock, ArrowRight, ShieldCheck, UserPlus, CheckCircle2, User, GraduationCap } from 'lucide-react';
import { PeepalLeaf, LotusFlower } from './BotanicalAssets';

interface ProgramsViewProps {
  onNavigateDetail: (view: [string, string]) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({ onNavigateDetail }) => {
  const { programs, currentStudent, startCourseRegistration, openAuthModal } = useYoga();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories extracted from program list
  const categories = ['All', ...Array.from(new Set(programs.map(p => p.category)))];

  const filteredPrograms = programs.filter(prog => {
    const matchesSearch = prog.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || prog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="programs-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Subtle Peepal background */}
      <div className="absolute top-20 right-4 pointer-events-none opacity-10 select-none">
        <PeepalLeaf size={180} />
      </div>

      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto pt-16 pb-10 text-center space-y-5">
        <span className="font-mono text-[10px] tracking-[0.25em] text-biscuit font-bold uppercase">Sadhana & Sastra curriculum</span>
        <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-espresso tracking-tight">
          Our Programs
        </h1>
        <p className="font-sans text-sm text-espresso/70 max-w-2xl mx-auto leading-relaxed">
          From accredited Yoga Certification Board teacher training programs to daily traditional classes, clinical yoga therapy, and silent spiritual retreats.
        </p>
        <div className="w-16 h-0.5 bg-biscuit mx-auto" />
      </section>

      {/* Member Admissions Banner */}
      <section className="max-w-7xl mx-auto mb-8">
        <div className="p-4 sm:p-5 bg-warm-beige/35 border border-biscuit/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-full bg-olive-green/10 text-olive-green shrink-0">
              <LotusFlower size={24} />
            </div>
            <div>
              <h3 className="font-cinzel text-sm font-bold text-espresso">
                Member Admissions & Course Registration
              </h3>
              <p className="font-sans text-xs text-espresso/70 mt-0.5">
                {currentStudent 
                  ? `Signed in as ${currentStudent.name}. You can instantly register for new courses or access enrolled materials.`
                  : "Have a member account or looking to enroll? Sign in or register to purchase courses, submit your sadhaka intake, and access live classes."
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            {!currentStudent ? (
              <>
                <button
                  type="button"
                  id="programs-member-login-cta"
                  onClick={() => openAuthModal({ mode: 'login' })}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-espresso hover:bg-espresso/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <User size={13} />
                  <span>Member Login</span>
                </button>
                <button
                  type="button"
                  id="programs-member-register-cta"
                  onClick={() => openAuthModal({ mode: 'register' })}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <UserPlus size={13} />
                  <span>Register Account</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 text-xs font-sans">
                <span className="text-olive-green font-semibold hidden sm:inline">
                  {currentStudent.enrolledCourses.length} Courses Enrolled
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters & Search Block */}
      <section className="max-w-7xl mx-auto mb-12 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-primary-white border border-biscuit/20 p-4 rounded-xl shadow-sm">
          
          {/* Categories Horizontal scrolling list */}
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-all duration-300 rounded-full border cursor-pointer focus:outline-none ${
                  activeCategory === cat
                    ? 'bg-olive-green text-primary-white border-olive-green font-semibold'
                    : 'border-biscuit/30 text-espresso/75 hover:border-espresso hover:text-espresso'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search curriculum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-primary-white border border-biscuit/30 rounded-full text-xs text-espresso focus:outline-none focus:border-olive-green focus:ring-1 focus:ring-olive-green/20 font-sans"
            />
            <Search className="absolute left-3.5 top-3 text-espresso/40" size={14} />
          </div>

        </div>
      </section>

      {/* Grid of Programs */}
      <section className="max-w-7xl mx-auto">
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog) => {
              const isEnrolled = currentStudent?.enrolledCourses.some(c => c.programId === prog.id);

              return (
                <div
                  key={prog.id}
                  onClick={() => onNavigateDetail(['program-detail', prog.id])}
                  className="artistic-card rounded-xl overflow-hidden cursor-pointer flex flex-col h-full group transition-all duration-300 hover:shadow-lg border border-biscuit/25"
                >
                  {/* Card Header Image */}
                  <div className="aspect-[16/10] bg-warm-beige/15 overflow-hidden relative border-b border-biscuit/10">
                    <img
                      src={prog.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600'}
                      alt={prog.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.98] transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-primary-white/95 px-3 py-1 rounded-full border border-biscuit/30 shadow-sm">
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

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      <h3 className="font-cinzel text-lg font-semibold text-espresso group-hover:text-olive-green transition-colors leading-snug">
                        {prog.name}
                      </h3>
                      <p className="font-sans text-xs text-espresso/75 leading-relaxed line-clamp-3">
                        {prog.description}
                      </p>
                    </div>

                    {/* Metadata line */}
                    <div className="pt-3 border-t border-biscuit/15 space-y-1.5 text-xs text-espresso/60 font-sans">
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-olive-green shrink-0" />
                        <span><strong>Duration:</strong> {prog.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-olive-green shrink-0" />
                        <span><strong>Starting Date:</strong> {prog.startingDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-olive-green font-bold text-xs">₹</span>
                        <span><strong>Course Fee:</strong> <strong className="text-espresso font-mono">{prog.fees}</strong></span>
                      </div>
                    </div>

                    {/* Actions: Register and Details */}
                    <div className="pt-3 border-t border-biscuit/10 space-y-2.5">
                      {isEnrolled ? (
                        <div className="p-2 bg-olive-green/10 border border-olive-green/30 rounded-lg text-center">
                          <span className="text-[11px] font-sans font-bold text-olive-green uppercase tracking-wider flex items-center justify-center gap-1">
                            <CheckCircle2 size={13} />
                            <span>Active Enrolled Student</span>
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          id={`register-program-btn-${prog.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            startCourseRegistration(prog);
                          }}
                          className="w-full py-2.5 px-3 bg-olive-green hover:bg-olive-green/90 text-primary-white text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <UserPlus size={14} />
                          <span>Register for Course</span>
                        </button>
                      )}

                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans tracking-wider uppercase font-semibold text-espresso/70 group-hover:text-olive-green transition-colors inline-flex items-center gap-1">
                          <span>Syllabus & Details</span>
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="font-mono text-[10px] text-biscuit uppercase">
                          Certified TTC
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-primary-white border border-dashed border-biscuit/30 rounded-xl max-w-lg mx-auto">
            <p className="font-serif italic text-espresso/60 text-sm">
              "No shastric pathways found matching your query."
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-xs font-mono uppercase tracking-widest text-olive-green font-bold hover:text-espresso transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
